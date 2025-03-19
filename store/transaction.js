import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const usetransactionStore = defineStore("transaction", () => {
  const authUser = useCookie("user");

  const fetchTransactions = async (payload) => {
    console.log(payload);
    const from = (payload.page - 1) * payload.perPage;
    const to = from + payload.perPage - 1;

    try {
      let query = supabase
        .from("transactions")
        .select(
          `
            *,
            wallet(
            id,name
            ),
            categories(
            id,name
            )
          `
        )
        .eq("user_id", authUser.value.id);

      if (payload.type) query = query.eq("type", payload.type);

      if (payload.categoryId)
        query = query.eq("category_id", payload.categoryId);

      if (payload.sort) {
        if (payload.sort == "highest" || payload.sort == "lowest") {
          const sorting = payload.sort !== "highest" ? true : false;
          query = query.order("amount", { ascending: sorting });
        } else {
          const sorting = payload.sort !== "newest" ? true : false;
          query = query.order("action_date", { ascending: sorting });
        }
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query.range(from, to);

      if (error) throw new Error(error.message);

      return { success: true, data: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const fetchTransactionsForToday = async (payload) => {
    try {
      let query = supabase
        .from("transactions")
        .select(
          `
            *,
            wallet(
            id,name
            ),
            categories(
            id,name
            )
          `
        )
        .eq("user_id", authUser.value.id)
        .order("created_at", {
          ascending: false,
        });

      if (payload?.today) {
        query = query.eq("action_date", new Date().toISOString().split("T")[0]);
      }

      if (payload?.week) {
        let startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of week (Sunday)
        let endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6); // End of week (Saturday)

        query = query
          .gte("action_date", startOfWeek.toISOString().split("T")[0])
          .lte("action_date", endOfWeek.toISOString().split("T")[0]);
      }

      if (payload?.month) {
        const currentMonth = new Date().getMonth() + 1;
        query = query.filter(
          "action_date",
          "gte",
          `${new Date().getFullYear()}-${currentMonth
            .toString()
            .padStart(2, "0")}-01`
        );
        query = query.filter(
          "action_date",
          "lt",
          `${new Date().getFullYear()}-${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}-01`
        );
      }

      if (payload?.year) {
        const currentYear = new Date().getFullYear();
        query = query
          .gte("action_date", `${currentYear}-01-01`)
          .lte("action_date", `${currentYear}-12-31`);
      }

      const { data, error } = await query;

      if (error) throw new Error(error.message);

      return { success: true, data: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const createTransaction = async (payload) => {
    const { categoryId, walletId, description, amount, type, action_date } =
      payload;
    const userId = authUser.value.id;

    try {
      // Insert transaction
      const { data: transactionData, error: transactionErr } = await supabase
        .from("transactions")
        .insert(
          {
            category_id: categoryId,
            wallet_id: walletId,
            user_id: userId,
            description,
            amount,
            type,
            action_date,
          },
          { returning: "minimal" }
        )
        .select("id")
        .single();

      if (transactionErr) throw new Error(transactionErr.message);

      // Fetch wallet data
      const { data: walletData, error: walletFetchError } = await supabase
        .from("wallet")
        .select("amount")
        .eq("id", walletId)
        .single();

      if (walletFetchError) throw new Error(walletFetchError.message);

      // Calculate new wallet amount
      const transactionAmount =
        type === "income"
          ? parseInt(walletData.amount) + parseInt(amount)
          : parseInt(walletData.amount) - parseInt(amount);

      // Update wallet amount
      const { error: walletErr } = await supabase
        .from("wallet")
        .update({ amount: transactionAmount })
        .eq("id", walletId);

      if (walletErr) throw new Error(walletErr.message);
      const transactionId = transactionData?.id;

      if (!transactionId) throw new Error("Transaction id not found!!");

      // recore wallet transaction
      const { error: transactionLogErr } = await supabase
        .from("wallet_transaction_log")
        .insert({
          action_date,
          user_id: userId,
          wallet_id: walletId,
          transaction_id: transactionId,
          type,
          before_amount: walletData.amount,
          transaction_amount: amount,
          after_amount: transactionAmount,
        });
      if (transactionLogErr) throw new Error(transactionLogErr.message);

      // expense ဆိုမှ budget ကို update လုပ်မယ်
      if (type == "expense") {
        const currentDate = new Date();
        const { data: budgetData, error: budgetError } = await supabase
          .from("budget")
          .select("*, budget_categories!inner(category_id)")
          .eq("budget_categories.category_id", categoryId)
          .eq("user_id", userId)
          .gte("expired_at", currentDate.toISOString())
          .maybeSingle();

        if (budgetError) throw new Error(budgetError.message);
        //
        if (budgetData) {
          const spendAmount =
            parseInt(budgetData.spend_amount ?? 0) + parseInt(amount);
          const usage = parseInt(budgetData.usage) + parseInt(amount);
          const remainingAmount =
            parseInt(budgetData.remaining_amount) - parseInt(amount);

          const { error: budgetUpdateErr } = await supabase
            .from("budget")
            .update({
              spend_amount: spendAmount,
              usage: usage,
              remaining_amount: remainingAmount,
            })
            .eq("id", budgetData.id);

          if (budgetUpdateErr) throw new Error(budgetUpdateErr.message);
        }
      }

      return { success: true, message: "Transaction added successfully." };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const fetchTransactionDetail = async (id) => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*, categories(id, name), wallet(id,name)")
      .eq("id", id)
      .single();

    if (error) return { success: false, error: error.message };

    return { success: true, data: data };
  };

  return {
    createTransaction,
    fetchTransactions,
    fetchTransactionsForToday,
    fetchTransactionDetail,
  };
});

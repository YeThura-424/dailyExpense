import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const usetransactionStore = defineStore("transaction", () => {
  const authUser = useCookie("user");
  const transactions = ref([]);

  const fetchTransactions = async (query) => {
    const from = (query.page - 1) * query.perPage;
    const to = from + query.perPage - 1;

    try {
      const { data, error } = supabase
        .from("transactions")
        .select("*")
        .eq("type", query.type)
        .eq("category_id", query.categoryId)
        .range(from, to);
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

      return { success: true, message: "Transaction added successfully." };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    createTransaction,
    fetchTransactions,
  };
});

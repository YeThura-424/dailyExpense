import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const usetransactionStore = defineStore("transaction", () => {
  const authUser = useCookie("user");

  const createTransaction = async (payload) => {
    const { categoryId, walletId, description, amount, type, action_date } =
      payload;
    const userId = authUser.value.id;

    try {
      // Insert transaction
      const { error: transactionErr } = await supabase
        .from("transactions")
        .insert({
          category_id: categoryId,
          wallet_id: walletId,
          user_id: userId,
          description,
          amount,
          type,
          action_date,
        });

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

      return { success: true, message: "Transaction added successfully." };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    createTransaction,
  };
});

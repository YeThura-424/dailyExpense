import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const usetransactionStore = defineStore("transaction", () => {
  const authUser = useCookie("user");

  const createTransaction = async (payload) => {
    let data = {
      category_id: payload.categoryId,
      wallet_id: payload.walletId,
      user_id: authUser.value.id,
      description: payload.description,
      amount: payload.amount,
      type: payload.type,
      action_date: payload.action_date,
    };

    const { error: transactionErr } = await supabase
      .from("transactions")
      .insert(data);

    if (transactionErr)
      return { success: false, error: transactionErr.message };

    // updating corresponding wallet amount

    const { data: walletData, error: walletFetchError } = await supabase
      .from("wallet")
      .select("amount")
      .eq("id", payload.walletId)
      .single();

    if (walletFetchError) {
      return { success: false, message: walletFetchError.message };
    }

    const transactionAmount =
      payload.type === "income"
        ? walletData.amount + payload.amount
        : walletData.amount - payload.amount;

    const { error: walletErr } = supabase
      .from("wallet")
      .update({
        amount: supabase.raw(`amount + ${transactionAmount}`),
      })
      .eq("id", payload.walletId);

    if (walletErr) {
      return { success: false, error: walletErr.message };
    }

    return {
      success: true,
      message: "Income transaction added successfully.",
    };
  };

  return {
    createTransaction,
  };
});

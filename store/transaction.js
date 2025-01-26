import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const usetransactionStore = defineStore("transaction", () => {
  const authUser = useCookie("auth");

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
      return { success: false, message: transactionErr.message };

    // updating corresponding wallet amount
    const transactionAmount =
      payload.type === "income" ? payload.amount : -payload.amount;

    const { error: walletErr } = supabase
      .from("wallet")
      .update({
        amount: supabase.raw(`amount + ${transactionAmount}`),
      })
      .eq("id", payload.walletId);

    if (walletErr) {
      return { success: false, message: walletErr.message };
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

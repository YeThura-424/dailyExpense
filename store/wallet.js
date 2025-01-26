import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const useWalletStore = defineStore("wallet", () => {
  const walletList = ref([]);
  const wallet = ref(null);

  const storeWallet = async (payload) => {
    const { data, error } = await supabase.from("wallet").insert({
      user_id: payload.userId,
      name: payload.name,
      amount: payload.amount ?? 0,
    });

    if (error) return { success: false, message: error.message };

    return { success: true };
  };

  return {
    storeWallet,
  };
});

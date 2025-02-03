import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const useWalletStore = defineStore("wallet", () => {
  const authUser = useCookie("user");

  const fetchWallets = async () => {
    if (!authUser.value) return { success: false, message: "Login First!!" };

    const { data, error } = await supabase
      .from("wallet")
      .select()
      .eq("user_id", authUser.value.id);

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, data: data };
  };

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
    fetchWallets,
    storeWallet,
  };
});

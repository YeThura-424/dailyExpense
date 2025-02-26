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
    // .order("created_at", { ascending: true });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, data: data };
  };

  const walletDetail = async (id) => {
    const { data, error } = await supabase
      .from("wallet")
      .select("*, transactions(*, wallet(id,name), categories(id,name))")
      .eq("id", id)
      .single();

    if (error) return { success: false, error: error.message };

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

  const updateWallet = async (payload) => {
    const { error } = await supabase
      .from("wallet")
      .update({
        name: payload.name,
      })
      .eq("id", payload.id);

    if (error) return { success: false, error: error.message };

    return { success: true };
  };

  const walletTransferLog = async (payload) => {
    const fromWalletBefore = parseInt(payload.fromWallet.amount);
    const toWalletBefore = parseInt(payload.toWallet.amount);
    const transferAmount = parseInt(payload.amount);
    const fromWalletAfter = fromWalletBefore - transferAmount;
    const toWalletAfter = toWalletBefore + transferAmount;

    try {
      const { error: walletTransferLogError } = await supabase
        .from("wallet_transfer_log")
        .insert({
          user_id: authUser.value.id,
          from_wallet: payload.fromWallet.id,
          to_wallet: payload.toWallet.id,
          from_wallet_before_amount: fromWalletBefore,
          to_wallet_before_amount: toWalletBefore,
          transfer_amount: transferAmount,
          from_wallet_after_amount: fromWalletAfter,
          to_wallet_after_amount: toWalletAfter,
          description: payload.description,
        });

      if (walletTransferLogError)
        throw new Error(walletTransferLogError.message);

      // update from wallet amount
      const { error: fromWalletUpdateError } = await supabase
        .from("wallet")
        .update({
          amount: fromWalletAfter,
        })
        .eq("id", payload.fromWallet.id);

      if (fromWalletUpdateError) throw new Error(fromWalletUpdateError.message);

      const { error: toWalletUpdateError } = await supabase
        .from("wallet")
        .update({
          amount: toWalletAfter,
        })
        .eq("id", payload.toWallet.id);

      if (toWalletUpdateError) throw new Error(toWalletUpdateError.message);

      return {
        success: true,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    fetchWallets,
    storeWallet,
    updateWallet,
    walletDetail,
    walletTransferLog,
  };
});

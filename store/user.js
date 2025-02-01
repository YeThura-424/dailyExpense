import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";

export const useUserStore = defineStore("user", () => {
  const user = useCookie("user");
  const userProfile = useCookie("userProfile");
  const token = useCookie("token");

  const signup = async (form) => {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (data.user) {
      const { error, data: profile } = await supabase.from("profiles").insert({
        id: data.user.id,
        username: form.username,
        currency: form.currency,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      token.value = data.session.access_token; // set token to cookie
      user.value = data.user;
      userProfile.value = profile;

      return { success: true };
    }
    return { success: false, error: "Internal Server Error!!" };
  };

  const login = async (formData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data) {
      user.value = data.user;
      token.value = data.session.access_token;
      return { success: true };
    }

    return { success: false, error: "Unknown error occurred." };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) return { success: false, error: error.message };

    user.value = null;
    token.value = null;
    userProfile.value = null;

    return true;
  };

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      token.value = data.session.access_token;
      user.value = data.session.user;
    } else {
      user.value = null;
      token.value = null;
      userProfile.value = null;
    }
  };

  const trackAuthChange = () => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      setTimeout(async () => {
        if (session) {
          token.value = session.access_token;
          user.value = session.user;
        } else {
          user.value = null;
          token.value = null;
          userProfile.value = null;
        }
      }, 0);
    });
  };

  const getWalletAndTransaction = async (payload) => {
    const query = supabase
      .from("wallet_transaction_log")
      .eq("user_id", user.value.id);
    // logic for filtering wallet amount and transaction(income and expence) with month and year
    const { data, error } = await query;
  };

  return {
    user,
    token,
    signup,
    login,
    logout,
    trackAuthChange,
    getSession,
    getWalletAndTransaction,
  };
});

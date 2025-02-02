import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";

export const useUserStore = defineStore("user", () => {
  const user = useCookie("user");
  const profile = useCookie("profile");
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
      setProfile();

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
      setProfile();
      return { success: true };
    }

    return { success: false, error: "Unknown error occurred." };
  };

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null;
      return;
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.value.id)
        .single();

      profile.value = data;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) return { success: false, error: error.message };

    user.value = null;
    token.value = null;
    profile.value = null;

    return true;
  };

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      token.value = data.session.access_token;
      user.value = data.session.user;
      setProfile();
    } else {
      user.value = null;
      token.value = null;
      profile.value = null;
    }
  };

  const trackAuthChange = () => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      setTimeout(async () => {
        if (session) {
          token.value = session.access_token;
          user.value = session.user;
          setProfile();
        } else {
          user.value = null;
          token.value = null;
          profile.value = null;
        }
      }, 0);
    });
  };

  const getWalletAndTransaction = async (payload) => {
    try {
      const query = supabase
        .from("wallet_transaction_log")
        .select()
        .eq("user_id", user.value.id);

      if (payload?.year) {
        const year = new Date(payload.year).getFullYear();
        query = query
          .gte("action_date", `${year}-01-01`)
          .lte("action_date", `${year}-12-31`);
      }

      if (payload?.month) {
        const month = new Date(payload.year, payload.month).getMonth() + 1;
        query = query.filter(
          "action_date",
          "gte",
          `${new Date().getFullYear()}-${month.toString().padStart(2, "0")}-01`
        );
        query = query.filter(
          "action_date",
          "lt",
          `${new Date().getFullYear()}-${(month + 1)
            .toString()
            .padStart(2, "0")}-01`
        );
      }

      // logic for filtering wallet amount and transaction(income and expence) with month and year
      const { data, error } = await query;

      if (error) throw new Error(error.message);

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
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

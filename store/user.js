import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = useCookie("user");
    const token = useCookie("token");

    const signup = async (form) => {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) {
        console.log("register error", error);
      }

      if (user.data) {
        const { error } = await supabase.from("profiles").insert({
          id: data.user.id,
          username: form.username,
          currency: form.currency,
        });

        if (error) {
          console.log("profile data adding error");
        }
      }
      token.value = data.session; // set token to cookie
      user.value = data.user;
      // user.value = data.user;
      // token.value = data.session;
      return true;
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
        token.value = data.session;
        return { success: true };
      }

      return { success: false, error: "Unknown error occurred." };
    };

    const logout = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) return false;

      user.value = null;
      token.value = null;

      return true;
    };

    return {
      user,
      token,
      signup,
      login,
      logout,
    };
  },
  { persist: true }
);

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
    console.log("d nar mar", data);
    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      console.log(data, "loggin from profile creation");
      const { error, data: profile } = await supabase.from("profiles").insert({
        id: data.user.id,
        username: form.username,
        currency: form.currency,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      token.value = data.session; // set token to cookie
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
      token.value = data.session;
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

  return {
    user,
    token,
    signup,
    login,
    logout,
  };
});

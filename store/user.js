import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";

export const useuserStore = defineStore(
  "user",
  () => {
    const user = ref({});
    const token = ref(null);

    const signup = async (form) => {
      console.log(form, "formdata");
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

      user.value = data.user;
      token.value = data.session;

      return true;
    };

    const login = async (formData) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (data) {
        user.value = data.user;
        token.value = data.session;
        return true;
      }

      return false;
    };

    const logout = async () => {};

    return {
      user,
      token,
      signup,
      login,
    };
  },
  { persist: true }
);

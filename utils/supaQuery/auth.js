import { supabase } from "../lib/supabaseClient";

export const register = async (form) => {
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
  });

  if (error) return console.log(error);

  if (data.user) {
    const { error } = await supabase.from("profiles").insert({
      id: data.user.id,
      username: form.username,
      currency: form.currency,
    });

    if (error) return console.log("Profile err: ", error);
  }

  return data;
};

import { supabase } from "~/lib/supabaseClient";

export const register = async (form) => {
  const { data, error } = await supabase.auth.signup({
    email: form.email,
    password: form.password,
  });

  if (error) return console.log(error);

  if (data.user) {
    const { error } = await supabase.from("profiles").insert({
      id: data.user.id,
      username: formData.username,
      full_name: formData.firstname.concat(" ", formData.lastname),
    });

    if (error) return console.log("Profile err: ", error);
  }

  return true;
};

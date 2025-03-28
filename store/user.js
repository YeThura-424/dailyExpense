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

  const updatePassword = async (payload) => {
    const { data, error } = await supabase.auth.updateUser({
      password: payload.new_password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
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
    console.log("payload herre", payload);
    try {
      let query = supabase
        .from("wallet_transaction_log")
        .select()
        .eq("user_id", user.value.id);

      if (payload?.month && payload?.year) {
        query = query.filter(
          "action_date",
          "gte",
          `${payload?.year}-${payload?.month.toString().padStart(2, "0")}-01`
        );
        query = query.filter(
          "action_date",
          "lt",
          `${payload?.year}-${(payload?.month + 1)
            .toString()
            .padStart(2, "0")}-01`
        );
      }

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

  const updateProfile = async (payload) => {
    const oldProfile = payload.profile;
    const newProfile = payload.newProfile;
    const avatarUrl = ref(null);

    try {
      // update profile photo and delete old one if both present
      if (oldProfile && newProfile) {
        const updateResult = await updateProfilePhoto(newProfile, oldProfile);

        if (!updateResult.success) throw new Error(updateResult.error);

        avatarUrl.value = updateResult.data;
      }
      // only store new profile if old photo does not exist
      if (newProfile && !oldProfile) {
        const updateResult = await storeProfilePhoto(newProfile);

        if (!updateResult.success) throw new Error(updateResult.error);

        avatarUrl.value = updateResult.data;
      }

      const { data, error: updateError } = await supabase
        .from("profiles")
        .update({
          username: payload.name,
          currency: payload.currency,
          avatar_url: avatarUrl.value,
        })
        .eq("id", user.value.id)
        .select()
        .single();

      if (updateError) throw new Error(updateError.message);

      return { success: true, data: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const storeProfilePhoto = async (fileData) => {
    const file = fileData[0];
    const fileName = `${Date.now()}-${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("user_profile")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) return { success: false, error: uploadError.message };

    if (uploadData) return { success: true, data: uploadData.path };
  };

  const updateProfilePhoto = async (newFile, oldFile) => {
    const file = newFile[0];

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("user_profile")
      .update(oldFile, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) return { success: false, error: uploadError.message };

    if (uploadData) return { success: true, data: uploadData.path };
  };

  const getUserProfilePhoto = (id) => {
    const { data } = supabase.storage.from("user_profile").getPublicUrl(id);

    if (data) return data.publicUrl;

    return null;
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
    updateProfile,
    getUserProfilePhoto,
    updatePassword,
  };
});

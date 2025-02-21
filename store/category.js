import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const useCategoryStore = defineStore("category", () => {
  const authUser = useCookie("user");
  const categories = ref([]);
  const typeCategories = ref([]);
  const category = ref(null);
  const budgetCategory = ref(null);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select()
      .or(`is_default.eq.true,user_id.eq.${authUser.value?.id}`)
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    categories.value = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        icon: getCategoryIcon(item.icon),
        type: item.type,
      };
    });
  };

  const fetchCategoryWithType = async (type) => {
    const today = new Date().toISOString();

    const { data, error } = await supabase
      .from("categories")
      .select("id, name, budget_categories(user_id,budget(remaining_amount))")
      .eq("budget_categories.user_id", authUser.value.id)
      .gt("budget_categories.budget.expired_at", today)
      .eq("type", type)
      .or(`is_default.eq.true,user_id.eq.${authUser.value?.id}`);

    if (error) {
      return { success: false, error: error.message };
    }

    typeCategories.value = data;
  };

  const categoryForBudget = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .eq("type", "expense")
      .or(`is_default.eq.true,user_id.eq.${authUser.value?.id}`);

    if (error) {
      return { success: false, error: error.message };
    }

    budgetCategory.value = data;
  };

  const categoryDetail = async (id) => {
    const { data, error } = await supabase
      .from("categories")
      .select()
      .eq("id", id)
      .single();

    if (error) return { success: false, message: error.message };

    return {
      success: true,
      data: {
        id: data.id,
        name: data.name,
        type: data.type,
      },
    };
  };

  const getCategoryIcon = (id) => {
    const { data } = supabase.storage.from("category_icon").getPublicUrl(id);

    if (data) return data.publicUrl;

    return null;
  };

  const storeCategory = async (formData) => {
    const categoryIcon = ref(null);

    // if (formData.icon) {
    //   const uploadResult = await storeIcon(formData.icon);

    //   if (uploadResult.success) {
    //     categoryIcon.value = uploadResult.data;
    //   } else {
    //     return { success: false, message: uploadResult.message };
    //   }
    // }

    const { error: categoryError } = await supabase.from("categories").insert({
      name: formData.name,
      type: formData.type,
      // icon: categoryIcon.value ?? null,
      user_id: authUser.value.id,
    });

    if (categoryError) {
      return { success: false, message: categoryError.message };
    }

    return { success: true };
  };

  const updateCategory = async (formData) => {
    const categoryIcon = ref(null);

    // if (formData.newIcon) {
    //   const oldIcon = formData.oldIcon;
    //   if (oldIcon) {
    //     // update old one with new one
    //     const uploadResult = await updateIcon(
    //       formData.newIcon,
    //       formData.oldIcon
    //     );
    //     if (uploadResult.success) {
    //       categoryIcon.value = uploadResult.data;
    //     } else {
    //       return { success: false, message: uploadResult.message };
    //     }
    //   } else {
    //     // add new one if old does not exist
    //     const uploadResult = await storeIcon(formData.newIcon);

    //     if (uploadResult.success) {
    //       categoryIcon.value = uploadResult.data;
    //     } else {
    //       return { success: false, message: uploadResult.message };
    //     }
    //   }
    // }

    const { error } = supabase
      .from("categories")
      .update({
        name: formData.name,
        type: formData.type,
        // icon: categoryIcon.value ?? null,
      })
      .eq("id", formData.id);

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true };
  };

  const storeIcon = async (fileData) => {
    const file = fileData[0];
    const fileName = `${Date.now()}-${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("category_icon")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) return { success: false, message: uploadError.message };

    if (uploadData) return { success: true, data: uploadData.path };
  };

  const updateIcon = async (newFile, oldFile) => {
    const file = newFile[0];

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("category_icon")
      .update(oldFile, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) return { success: false, message: uploadError.message };

    if (uploadData) return { success: true, data: uploadData.path };
  };

  return {
    category,
    categories,
    typeCategories,
    budgetCategory,
    fetchCategories,
    categoryDetail,
    storeCategory,
    updateCategory,
    fetchCategoryWithType,
    categoryForBudget,
  };
});

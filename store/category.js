import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const category = ref(null);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select();

    if (error) {
      return { success: false, error: error.message };
    }
    console.log(data, "category retrived data");
    categories.value = data.map((item) => {
      return {
        name: item.name,
        icon: getCategoryIcon(item.icon),
        type: item.type,
      };
    });
    // categories.value = data;
  };

  const getCategoryIcon = (id) => {
    const { data } = supabase.storage.from("category_icon").getPublicUrl(id);

    if (data) return data.publicUrl;

    return null;
  };

  const storeCategory = async (formData) => {
    const categoryIcon = ref(null);

    if (formData.icon) {
      const file = formData.icon[0];
      const fileName = `${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("category_icon")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) return { success: false, message: uploadError.message };

      if (uploadData) {
        categoryIcon.value = uploadData.path;
      }
    }

    const { error: categoryError } = await supabase.from("categories").insert({
      name: formData.name,
      type: formData.type,
      icon: categoryIcon.value ?? null,
    });

    if (categoryError) {
      return { success: false, message: categoryError.message };
    }

    return { success: true };
  };

  return {
    category,
    categories,
    fetchCategories,
    storeCategory,
  };
});

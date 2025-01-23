import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const category = ref(null);

  const getCateogry = async () => {
    // logic for getting category
  };

  const storeCategory = async (formData) => {
    const categoryIcon = ref(null);
    console.log("form data", formData);
    if (formData.icon) {
      const fileName = `${Date.now()}-${formData.icon.name}`;
      const { data, error } = await supabase.storage
        .from("category_icon")
        .upload(fileName, formData.icon);

      console.log(data, error);

      // const { data, error } = supabase.from("categories").insert({
      //   name: formData.namem,
      //   category_type: formData.type,
      //   icon: categoryIcon.value ?? null,
      // }); //
    }
  };

  return {
    category,
    categories,
    storeCategory,
  };
});

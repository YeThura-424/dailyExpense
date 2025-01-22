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
    if (formData.icon) {
      // create bucket
      const { data, error } = await supabase.storage.createBucket(
        "categories",
        {
          public: false,
          allowedMimeTypes: ["image/png"],
          fileSizeLimit: 1024,
        }
      );
    }

    const { data, error } = supabase.from("categories").insert({
      name: formData.namem,
      category_type: formData.type,
      icon: categoryIcon.value ?? null,
    }); //
  };

  return {
    category,
    categories,
    storeCategory,
  };
});

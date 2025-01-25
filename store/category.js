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
        id: item.id,
        name: item.name,
        icon: getCategoryIcon(item.icon),
        type: item.type,
      };
    });
  };

  const categoryDetail = async (id) => {
    console.log("d nar mar");
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
        icon: getCategoryIcon(data.icon),
        oldIcon: data.icon,
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

    if (formData.icon) {
      const uploadResult = await storeIcon(formData.icon);

      if (uploadResult.success) {
        categoryIcon.value = uploadResult.data;
      } else {
        return { success: false, message: uploadResult.message };
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

  const updateCategory = async (formData) => {
    const categoryIcon = ref(null);

    if (formData.icon) {
      const oldIcon = formData.oldIcon;
      if (oldIcon) {
        // update old one with new one
        const uploadResult = await updateIcon(formData.icon, formData.oldIcon);
        if (uploadResult.success) {
          categoryIcon.value = uploadResult.data;
        } else {
          return { success: false, message: uploadResult.message };
        }
      } else {
        // add new one if old does not exist
        const uploadResult = await storeIcon(formData.icon);

        if (uploadResult.success) {
          categoryIcon.value = uploadResult.data;
        } else {
          return { success: false, message: uploadResult.message };
        }
      }
    }

    const { error } = supabase
      .from("categories")
      .update({
        name: formData.name,
        type: formData.type,
        icon: categoryIcon.value ?? null,
      })
      .eq("id", formData.id);

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true };
  };

  const storeIcon = async (fileData) => {
    const file = fileData.icon[0];
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
    const file = newFile.icon[0];

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
    fetchCategories,
    categoryDetail,
    storeCategory,
    updateCategory,
  };
});

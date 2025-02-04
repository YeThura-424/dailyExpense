import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const usebudgetStore = defineStore("budget", () => {
  const user = useCookie("user");

  const createBudget = async (payload) => {
    try {
      const categoryId = payload.categoryId;
      const currentDate = new Date();
      const expiredAt = new Date(
        currentDate.getFullYear(),
        date.getMonth() + 1,
        0
      );
      const { data: budgetData, error: budgetError } = supabase
        .from("budget")
        .select()
        .eq("category_id", categoryId)
        .eq("user_id", user.value.id)
        .single();

      if (budgetError) throw new Error(budgetError.message);
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
});

import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const useBudgetStore = defineStore("budget", () => {
  const user = useCookie("user");

  const fetchBudget = async (month) => {
    console.log(month);

    let query = supabase
      .from("budget")
      .select(
        `
          *,
          budget_categories(*)
        `
      )
      .eq("user_id", user.value.id);

    if (month) {
      query = query.gt("expired_at", month);
    }

    const { data, error } = await query;

    if (error) return { success: false, error: error.message };

    return { success: true, data: data };
  };

  const createBudget = async (payload) => {
    try {
      const categoryId = payload.categoryId;
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const expiredAt = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      const { data: budgetData } = await supabase
        .from("budget")
        .select("*")
        .eq("category_id", categoryId)
        .eq("user_id", user.value.id)
        .single();

      if (budgetData) {
        const budgetExpireAt = new Date(budgetData.expired_at).getMonth();
        if (budgetExpireAt == currentMonth) {
          const updateRemaining = payload.total + budgetData.remaining_amount;
          const { budgetUpdateError } = await supabase
            .from("budget")
            .update({
              total: payload.total,
              alert: payload.alert,
              remaining_amount: updateRemaining,
              category_id: categoryId,
            })
            .eq("id", budgetData.id);

          if (budgetUpdateError) throw new Error(budgetUpdateError.message);
        } else {
          const result = await storeBudget(payload, expiredAt);

          if (!result.success) throw new Error(result.error);
        }
      } else {
        const result = await storeBudget(payload, expiredAt);

        if (!result.success) throw new Error(result.error);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const storeBudget = async (payload, expiredAt) => {
    const { data, error } = await supabase.from("budget").insert({
      user_id: user.value.id,
      category_id: payload.categoryId,
      total: payload.total,
      remaining_amount: payload.total,
      alert: payload.alert,
      expired_at: expiredAt,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data };
  };

  const createBudgetV2 = async (payload) => {
    try {
      const categoryId = payload.categoryId;
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const expiredAt = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      let budgetId;
      const { data: budgetData } = await supabase
        .from("budget")
        .select("*, budget_categories(*)")
        .in("budget_categories.category_id", categoryId)
        .eq("user_id", user.value.id)
        .gte("expired_at", currentDate.toISOString())
        .single();

      if (budgetData) {
        const budgetExpireAt = new Date(budgetData.expired_at).getMonth();
        if (budgetExpireAt == currentMonth) {
          const updateRemaining = payload.total + budgetData.remaining_amount;
          const { budgetUpdateError } = await supabase
            .from("budget")
            .update({
              total: payload.total,
              alert: payload.alert,
              remaining_amount: updateRemaining,
            })
            .eq("id", budgetData.id);

          if (budgetUpdateError) throw new Error(budgetUpdateError.message);

          budgetId = budgetData.id;
        } else {
          const result = await storeBudget(payload, expiredAt);

          if (!result.success) throw new Error(result.error);

          budgetId = result.data.id;
        }
      } else {
        const result = await storeBudget(payload, expiredAt);

        if (!result.success) throw new Error(result.error);

        budgetId = result.data.id;
      }

      const result = await storeBudgetCategory();

      if (!result.success) throw new Error(result.error);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const storeBudgetV2 = async (payload, expiredAt) => {
    const { data, error } = await supabase
      .from("budget")
      .insert({
        user_id: user.value.id,
        // category_id: payload.categoryId,
        total: payload.total,
        remaining_amount: payload.total,
        alert: payload.alert,
        expired_at: expiredAt,
      })
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data };
  };

  const storeBudgetCategory = async (expiredAt, budgetId, categoryIds) => {
    if (payload.categoryIds?.length > 0) {
      const categoryEntries = categoryIds.map((categoryId) => ({
        budget_id: budgetId,
        category_id: categoryId,
        user_id: user.value.id,
        expired_at: expiredAt,
      }));

      const { error: categoryInsertError } = await supabase
        .from("budget_categories")
        .insert(categoryEntries);

      if (categoryInsertError) throw new Error(categoryInsertError.message);

      return { success: true };
    }
  };
  return {
    createBudget,
    fetchBudget,
    createBudgetV2,
    storeBudgetV2,
  };
});

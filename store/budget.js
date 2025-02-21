import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const useBudgetStore = defineStore("budget", () => {
  const user = useCookie("user");

  const fetchBudget = async (month) => {
    let query = supabase
      .from("budget")
      .select(
        `
          *,
          budget_categories(*, categories(name))
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
              alert_percent: payload.alertPercent,
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

  const budgetDetail = async (id) => {
    const { data, error } = await supabase
      .from("budget")
      .select(
        `
          *,
          budget_categories(*, categories(name))
        `
      )
      .eq("id", id)
      .eq("user_id", user.value.id)
      .single();

    if (error) return { success: false, error: error.message };

    return { success: true, data: data };
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
      const categoryId =
        payload.category.length > 0
          ? payload.category.map((cate) => cate.id)
          : [];
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const expiredAt = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      const budgetId = ref(null);
      const { data: budgetData } = await supabase
        .from("budget")
        .select("*, budget_categories!inner(category_id)")
        .eq("budget_categories.category_id", categoryId)
        .eq("user_id", user.value.id)
        .gte("expired_at", currentDate.toISOString())
        .maybeSingle();

      if (budgetData) {
        const budgetExpireAt = new Date(budgetData.expired_at).getMonth();
        if (budgetExpireAt == currentMonth) {
          // to make sure budget total is greater than budget spend amount
          if (payload.total < budgetData.spend_amount)
            throw new Error(
              "Updated budget amount can not be less than budget spend amount"
            );
          // calculating budget remaining amount
          const updateRemaining =
            parseInt(payload.total) - parseInt(budgetData.spend_amount);
          const { budgetUpdateError } = await supabase
            .from("budget")
            .update({
              title: payload.title,
              total: payload.total,
              alert: payload.alert,
              alert_percent: payload.alertPercent,
              remaining_amount: updateRemaining,
            })
            .eq("id", budgetData.id);

          if (budgetUpdateError) throw new Error(budgetUpdateError.message);

          budgetId.value = budgetData.id;
        } else {
          const result = await storeBudgetV2(payload, expiredAt);

          if (!result.success) throw new Error(result.error);

          budgetId.value = result.data.id;

          const budgetCategoryResult = await storeBudgetCategory(
            expiredAt,
            budgetId.value,
            payload
          );

          if (!budgetCategoryResult.success) throw new Error(result.error);
        }
      } else {
        const result = await storeBudgetV2(payload, expiredAt);

        if (!result.success) throw new Error(result.error);

        budgetId.value = result.data.id;
        const budgetCategoryResult = await storeBudgetCategory(
          expiredAt,
          budgetId.value,
          payload
        );

        if (!budgetCategoryResult.success) throw new Error(result.error);
      }

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
        title: payload.title,
        total: payload.total,
        remaining_amount: payload.total,
        alert: payload.alert,
        alert_percent: payload.alertPercent,
        expired_at: expiredAt,
      })
      .select("id")
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data };
  };

  const storeBudgetCategory = async (expiredAt, budgetId, payload) => {
    if (payload.category?.length > 0) {
      const categoryEntries = payload.category.map((cate) => ({
        budget_id: budgetId,
        category_id: cate.id,
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
    budgetDetail,
  };
});

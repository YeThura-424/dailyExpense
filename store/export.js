import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const useExportStore = defineStore("export", () => {
  const authUser = useCookie("user");

  const exportTransaction = async (payload) => {
    try {
      const query = supabase
        .from("transactions")
        .select(
          `
          *,
          wallet(
          id,name
          ),
          categories(
          id,name
          )
        `
        )
        .eq("user_id", authUser.value.id)
        .order("created_at", {
          ascending: false,
        });

      if (payload.from_date && payload.to_date) {
        const fromDate = new Date(payload.from_date)
          .toISOString()
          .split("T")[0];

        query = query.filter("action_date", "gte", fromDate);

        const toDate = new Date(payload.to_date).toISOString().split("T")[0];

        query = query.filter("action_date", "lte", toDate);
      }
      if (payload?.month) {
        const currentMonth = new Date().getMonth() + 1;
        query = query.filter(
          "action_date",
          "gte",
          `${new Date().getFullYear()}-${currentMonth
            .toString()
            .padStart(2, "0")}-01`
        );
        query = query.filter(
          "action_date",
          "lt",
          `${new Date().getFullYear()}-${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}-01`
        );
      }

      if (payload?.year) {
        const currentYear = new Date().getFullYear();
        query = query
          .gte("action_date", `${currentYear}-01-01`)
          .lte("action_date", `${currentYear}-12-31`);
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

  return {
    exportTransaction,
  };
});

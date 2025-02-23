import { defineStore } from "pinia";
import { supabase } from "~/lib/supabaseClient";

export const useExportStore = defineStore("export", () => {
  const authUser = useCookie("user");

  const exportTransaction = async (payload) => {
    try {
      let query = supabase.from("transactions").select(
        `
          *,
          wallet(
          id,name
          ),
          categories(
          id,name
          )
        `
      );

      if (payload.range == "day" && payload.from_date && payload.to_date) {
        const fromDate = new Date(payload.from_date)
          .toISOString()
          .split("T")[0];

        query = query.filter("action_date", "gte", fromDate);

        const toDate = new Date(payload.to_date).toISOString().split("T")[0];

        query = query.filter("action_date", "lte", toDate);
      }
      if (payload.range == "month" && payload?.month && payload?.year) {
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

      if (payload.range == "year" && payload?.year) {
        query = query
          .gte("action_date", `${payload?.year}-01-01`)
          .lte("action_date", `${payload?.year}-12-31`);
      }

      const { data, error } = await query
        .eq("user_id", authUser.value.id)
        .order("created_at", {
          ascending: false,
        });

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

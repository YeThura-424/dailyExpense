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

  const exportWallet = async () => {
    try {
      const { data, error } = await supabase
        .from("wallet")
        .select("*")
        .eq("user_id", authUser.value.id);

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

  const exportWalletTransferLog = async (payload) => {
    try {
      let query = supabase.from("wallet_transfer_log").select(
        `
          *,
          from_wallet(
          id,name
          ),
          to_wallet(
          id,name
          )
        `
      );

      if (payload.range == "day" && payload.from_date && payload.to_date) {
        const fromDate = new Date(payload.from_date)
          .toISOString()
          .split("T")[0];

        query = query.filter("created_at", "gte", fromDate);

        const toDate = new Date(payload.to_date).toISOString().split("T")[0];

        query = query.filter("created_at", "lte", toDate);
      }
      if (payload.range == "month" && payload?.month && payload?.year) {
        query = query.filter(
          "created_at",
          "gte",
          `${payload?.year}-${payload?.month.toString().padStart(2, "0")}-01`
        );
        query = query.filter(
          "created_at",
          "lt",
          `${payload?.year}-${(payload?.month + 1)
            .toString()
            .padStart(2, "0")}-01`
        );
      }

      if (payload.range == "year" && payload?.year) {
        query = query
          .gte("created_at", `${payload?.year}-01-01`)
          .lte("created_at", `${payload?.year}-12-31`);
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

  const exportBudget = async (payload) => {
    try {
      let query = supabase.from("budget").select(
        `
          *,
          budget_categories(*, categories(name))
        `
      );

      if (payload.range == "day" && payload.from_date && payload.to_date) {
        const fromDate = new Date(payload.from_date)
          .toISOString()
          .split("T")[0];

        query = query.filter("created_at", "gte", fromDate);

        const toDate = new Date(payload.to_date).toISOString().split("T")[0];

        query = query.filter("created_at", "lte", toDate);
      }
      if (payload.range == "month" && payload?.month && payload?.year) {
        query = query.filter(
          "created_at",
          "gte",
          `${payload?.year}-${payload?.month.toString().padStart(2, "0")}-01`
        );
        query = query.filter(
          "created_at",
          "lt",
          `${payload?.year}-${(payload?.month + 1)
            .toString()
            .padStart(2, "0")}-01`
        );
      }

      if (payload.range == "year" && payload?.year) {
        query = query
          .gte("created_at", `${payload?.year}-01-01`)
          .lte("created_at", `${payload?.year}-12-31`);
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
    exportWallet,
    exportWalletTransferLog,
    exportBudget,
  };
});

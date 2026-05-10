import { defineStore } from "pinia";

export const usewalletTransactionLogStore = defineStore(
  "walletTransactionLog",
  () => {
    const record = async (payload) => {};
    return {
      record,
    };
  }
);

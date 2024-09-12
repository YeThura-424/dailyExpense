import { defineStore } from "pinia";

export const useWalletStore = defineStore("wallet", {
  state: () => {
    return {
      wallet: [],
    };
  },
  actions: {
    async getWallet() {
      try {
        const { data } = await useFetch("/api/wallet-type", {
          method: "GET",
        });
        console.log("data", data);
        this.wallet = data;
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});

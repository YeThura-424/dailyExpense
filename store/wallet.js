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
        const { data } = await useFetch(
          "http://localhost:8000/api/wallet-type",
          {
            method: "get",
          }
        );
        console.log("data", data);
        this.wallet = data;
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});

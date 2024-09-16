import { defineStore } from "pinia";

export const useWalletStore = defineStore("wallet", {
  state: () => {
    return {
      walletType: [],
    };
  },
  actions: {
    async getWalletType() {
      try {
        const { data } = await useFetch("/api/wallet-type", {
          method: "get",
        });
        this.walletType = data.value;
        return data;
      } catch (error) {
        console.error(error);
      }
    },

    async saveWallet(form) {
      try {
        const { data } = await useFetch("/api/wallet/create", {
          method: "POST",
          body: form,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});

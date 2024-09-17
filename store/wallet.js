import { defineStore } from "pinia";

export const useWalletStore = defineStore("wallet", {
  state: () => {
    return {
      walletType: [],
      walletList: {},
    };
  },
  actions: {
    async getWalletType() {
      try {
        const { data } = await useFetch("/api/wallet-type", {
          method: "get",
          transform: (response) => {
            this.walletType = response.data.data;
          },
        });
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

    async getWalletList() {
      const user = useCookie("user");
      try {
        await useFetch("/api/wallet/user-wallet", {
          method: "GET",
          params: {
            auth_user: user?.value?.id,
          },
          transform: (response) => {
            this.walletList = response.data;
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});

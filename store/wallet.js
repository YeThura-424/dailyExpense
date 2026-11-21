import { defineStore } from 'pinia';
import { apiResult } from '~/utils/apiPayload';

export const useWalletStore = defineStore('wallet', {
  actions: {
    async fetchWallets() {
      try {
        const { data, error } = await useFetch('/api/wallets', {
          method: 'GET',
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async walletDetail(id) {
      try {
        const { data, error } = await useFetch(`/api/wallets/${encodeURIComponent(id)}`, {
          method: 'GET',
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async storeWallet(payload) {
      try {
        const { data, error } = await useFetch('/api/wallets', {
          method: 'POST',
          body: { name: payload.name, amount: Number(payload.amount || 0) },
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async updateWallet(payload) {
      try {
        const { data, error } = await useFetch(`/api/wallets/${encodeURIComponent(payload.id)}`, {
          method: 'PATCH',
          body: { name: payload.name },
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async walletTransferLog(payload) {
      try {
        const { data, error } = await useFetch('/api/wallet-transfers', {
          method: 'POST',
          body: {
            fromWalletId: String(payload.fromWallet.id),
            toWalletId: String(payload.toWallet.id),
            amount: Number(payload.amount),
            ...(payload.description ? { description: payload.description } : {}),
          },
          watch: false,
          retry: 0,
        });
        return apiResult(data, error);
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
  },
});

import { defineStore } from 'pinia';
import { apiResult, exportQuery } from '~/utils/apiPayload';

export const useExportStore = defineStore('export', {
  actions: {
    async exportTransaction(payload) {
      try {
        const { data, error } = await useFetch('/api/exports/transactions', {
          method: 'GET',
          query: exportQuery(payload),
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async exportWallet() {
      try {
        const { data, error } = await useFetch('/api/exports/wallets', {
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
    async exportWalletTransferLog(payload) {
      try {
        const { data, error } = await useFetch('/api/exports/wallet-transfers', {
          method: 'GET',
          query: exportQuery(payload),
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async exportBudget(payload) {
      try {
        const { data, error } = await useFetch('/api/exports/budgets', {
          method: 'GET',
          query: exportQuery(payload),
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
  },
});

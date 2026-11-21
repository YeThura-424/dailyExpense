import { defineStore } from 'pinia';
import { apiResult, compactQuery, transactionPayload } from '~/utils/apiPayload';

export const usetransactionStore = defineStore('transaction', {
  actions: {
    async fetchTransactions(payload = {}) {
      try {
        const { data, error } = await useFetch('/api/transactions', {
          method: 'GET',
          query: compactQuery({ page: payload.page, perPage: payload.perPage, type: payload.type, categoryId: payload.categoryId, sort: payload.sort }),
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async fetchTransactionsForToday(payload = {}) {
      try {
        const { data, error } = await useFetch('/api/transactions/recent', {
          method: 'GET',
          query: compactQuery({ period: ['today', 'week', 'month', 'year'].find(period => payload[period]) }),
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async fetchTransactionDetail(id) {
      try {
        const { data, error } = await useFetch(`/api/transactions/${encodeURIComponent(id)}`, {
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
    async createTransaction(payload) {
      try {
        const { data, error } = await useFetch('/api/transactions', {
          method: 'POST',
          body: transactionPayload(payload),
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async updateTransaction(payload, id) {
      try {
        const { data, error } = await useFetch(`/api/transactions/${encodeURIComponent(id)}`, {
          method: 'PUT',
          body: transactionPayload(payload),
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

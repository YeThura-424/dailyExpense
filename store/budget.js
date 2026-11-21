import { defineStore } from 'pinia';
import { apiResult, budgetPayload } from '~/utils/apiPayload';

export const useBudgetStore = defineStore('budget', {
  actions: {
    async fetchBudget(month) {
      try {
        const { data, error } = await useFetch('/api/budgets', {
          method: 'GET',
          query: month ? { expiresAfter: new Date(month).toISOString() } : {},
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async createBudgetV2(payload) {
      try {
        const { data, error } = await useFetch('/api/budgets', {
          method: 'POST',
          body: budgetPayload(payload),
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async budgetDetail(id) {
      try {
        const { data, error } = await useFetch(`/api/budgets/${encodeURIComponent(id)}`, {
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
    async budgetDelete(id) {
      try {
        const { data, error } = await useFetch(`/api/budgets/${encodeURIComponent(id)}`, {
          method: 'DELETE',
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

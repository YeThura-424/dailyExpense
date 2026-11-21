import { defineStore } from 'pinia';
import { apiResult } from '~/utils/apiPayload';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    typeCategories: [],
    category: null,
    budgetCategory: [],
  }),
  actions: {
    async fetchCategories() {
      try {
        const { data, error } = await useFetch('/api/categories', {
          method: 'GET',
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        if (result.success) this.categories = result.data;
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async fetchCategoryWithType(type) {
      try {
        const { data, error } = await useFetch('/api/categories/options', {
          method: 'GET',
          query: type ? { type } : {},
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        if (result.success) this.typeCategories = result.data;
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async categoryForBudget() {
      try {
        const { data, error } = await useFetch('/api/categories/budget-options', {
          method: 'GET',
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        if (result.success) this.budgetCategory = result.data;
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async categoryDetail(id) {
      try {
        const { data, error } = await useFetch(`/api/categories/${encodeURIComponent(id)}`, {
          method: 'GET',
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        if (result.success) this.category = result.data;
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async storeCategory(form) {
      try {
        const { data, error } = await useFetch('/api/categories', {
          method: 'POST',
          body: { name: form.name, type: form.type },
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async updateCategory(form) {
      try {
        const { data, error } = await useFetch(`/api/categories/${encodeURIComponent(form.id)}`, {
          method: 'PATCH',
          body: { name: form.name, type: form.type },
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

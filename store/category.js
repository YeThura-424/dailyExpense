export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categories: [],
      message: "",
    }
  },
  actions: {
    async getCategories() {
      try {
        await useFetch("/api/category", {
          method: "GET",
          transform: (response) => {
            this.categories = response.data.data
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async createCategories(form) {
      try {
        const data  = useFetch("/api/file-upload/category/store", {
          method: "POST",
          body: form,
        });
        console.log('category created in store', data)
      } catch (error) {
        console.log(error);
      }
    },
    async updateCategory(form) {
      try {
        const data = useFetch(`/api/file-upload/category/${form.id}`, {
          method: "POST",
          body: form
        })
        return data;
      } catch (error) {
        console.error(error);
      }
    }
  }
})

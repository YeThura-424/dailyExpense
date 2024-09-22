export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categories: []
    }
  },
  actions: {
    async getCategories() {
      try {
        await useFetch("/api/category", {
          method: "GET",
          transform: (response) => {
            this.categories = response.data
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async createCategories(form) {
      try {
        useFetch("/api/file-upload/category/store", {
          method: "POST",
          body: form,
          transform: (response) => {
            console.log(response, "category create");
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  }
})

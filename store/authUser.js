export const useauthUserStore = defineStore("authUser", {
  state: () => ({
    user: {},
    token: "123456",
  }),
  getters: {},
  actions: {
    setUser() {
      this.user = "Logged in user";
    },
  },
});

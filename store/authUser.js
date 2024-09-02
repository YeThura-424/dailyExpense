export const useauthUserStore = defineStore("authUser", {
  state: () => ({
    user: {},
    token: "1234565",
  }),
  getters: {},
  actions: {
    setUser() {
      this.user = "Logged in user";
    },
  },
});

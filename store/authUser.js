export const useauthUserStore = defineStore("authUser", {
  state: () => ({
    user: {},
    token: "",
  }),
  getters: {},
  actions: {
    login(req) {
      let userinfo = {
        username: "test112",
        password: "secret",
      };
      console.log(req);
      if (
        req.username == userinfo.username &&
        req.password == userinfo.password
      ) {
        this.user = "Logged in user";
        this.token = req.password;
      }

      console.log("token", this.token);
    },
    setUser() {},
  },
});

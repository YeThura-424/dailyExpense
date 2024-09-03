export const useauthUserStore = defineStore("authUser", {
  state: () => ({
    user: {},
    token: null,
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
        if (process.client) {
          // Ensure this runs only on the client side
          localStorage.setItem("token", req.password);
          this.token = req.password; // Store the token in the state
        }
      }

      console.log("token", this.token);
    },
    setUser() {
      if (process.client) {
        // Ensure this runs only on the client side
        this.token = localStorage.getItem("token");
      }
    },
  },
});

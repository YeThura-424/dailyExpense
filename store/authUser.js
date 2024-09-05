import { defineStore } from "pinia";

export const useauthUserStore = defineStore("authUser", {
  state: () => ({
    user: {},
    token: useCookie("token"),
  }),
  getters: {},
  actions: {
    async login(req) {
      try {
        let payload = {
          email: req.email,
          password: req.password,
        };
        const { data } = await useFetch("/api/login", {
          body: {
            payload,
          },
        });
        console.log("login", data);
        this.user = data.user;
        const authToken = useCookie("token");
        authToken.value = data.token;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    setUser() {
      if (process.client) {
        // Ensure this runs only on the client side
        this.token = localStorage.getItem("token");
      }
    },
  },
});

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }) {
      const config = useRuntimeConfig();
      // useFetch from nuxt 3
      const { data, pending } = await useFetch(
      `${config.public.url}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: {
            email,
            password,
          },
        }
      );
      if (data.value) {
        const token = useCookie("token"); // useCookie new hook in nuxt 3
        const user = useCookie("user");
        token.value = data?.value?.token; // set token to cookie
        user.value = data?.value?.user;
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    async logUserOut() {
      const config = useRuntimeConfig();
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      const user = useCookie("user");

      const { data, pending, error } = await useFetch(
        `${config.public.url}/api/logout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`,
            "x-api-token": "4fGh9Kj7Lm1Nq2RzXw8T", //San Chin Loe Use Htar Tar
          },
        }
      );

      if (error.value) {
        console.error("Logout error:", error.value);
      } else {
        console.log("Logout successful:", data.value);
        this.authenticated = false; // set authenticated  state value to false
        token.value = null; // clear the token cookie
        user.value = null;
        navigateTo("/");
      }
    },
  },
});

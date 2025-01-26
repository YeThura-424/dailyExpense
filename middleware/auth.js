import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token"); // get token from cookies
  const { trackAuthChange, getSession } = useUserStore();

  trackAuthChange();
  getSession();
  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === "login") {
    return navigateTo("/");
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== "login" && to.name !== "signup") {
    abortNavigation();
    if (to?.name == "signup") return navigateTo("signup");
    return navigateTo("/login");
  }
});

import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware(async (to) => {
  const { getSession } = useUserStore();
  await getSession();
  const token = useCookie("token"); // get token from cookies
  // const user = useCookie("user");
  // console.log(token.value, "auth token");
  // console.log(user.value, "auth user");
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

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuthUser();

  // If the user is not logged in
  if (!user.value) {
    if (to.name !== "login" && to.name !== "register") {
      return navigateTo("/login");
    }
  } else {
    // If the user is logged in and tries to access login or register
    if (to.name === "login" || to.name === "register") {
      return navigateTo("/");
    }
  }
});

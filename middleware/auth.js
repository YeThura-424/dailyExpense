export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuth();
  console.log(user, "auth middleware");
  // If the user is not logged in
  if (!user.token) {
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

import { useUserStore } from '~/store/user';

export default defineNuxtRouteMiddleware(async (to) => {
  const users = useUserStore();
  const result = await users.getSession();
  if (result.success && ['login', 'signup'].includes(to.name)) return navigateTo('/');
  if (!result.success && result.statusCode === 401 && !['login', 'signup'].includes(to.name)) return navigateTo('/login');
  if (!result.success && result.statusCode !== 401) {
    throw createError({ statusCode: result.statusCode || 503, statusMessage: result.error });
  }
});

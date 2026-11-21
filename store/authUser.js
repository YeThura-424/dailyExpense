import { defineStore } from 'pinia';
import { useUserStore } from './user';

export const useAuthStore = defineStore('auth', () => {
  const users = useUserStore();
  const authenticated = computed(() => !!users.user);
  const loading = ref(false);
  const authenticateUser = async (form) => {
    loading.value = true;
    try { return await users.login(form); } finally { loading.value = false; }
  };
  const logUserOut = async () => {
    const result = await users.logout();
    if (result === true) await navigateTo('/login');
    return result;
  };
  return { authenticated, loading, authenticateUser, logUserOut };
});

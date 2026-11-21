import { defineStore } from 'pinia';
import { appendResponseHeader } from 'h3';
import { apiResult, compactQuery } from '~/utils/apiPayload';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: useCookie('user'),
    profile: useCookie('profile'),
  }),
  actions: {
    async getSession() {
      try {
        const event = import.meta.server ? useRequestEvent() : undefined;
        const { data, error } = await useFetch('/api/auth/session', {
          method: 'GET',
          watch: false,
          retry: 0,
          onResponse({ response }) {
            if (event) {
              for (const cookie of response.headers.getSetCookie()) {
                appendResponseHeader(event, 'set-cookie', cookie);
              }
            }
          },
        });
        const result = apiResult(data, error);
        if (result.success) {
          this.user = result.data.user;
          this.profile = result.data.profile;
        } else if (result.statusCode === 401) {
          this.user = null;
          this.profile = null;
        }
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async signup(form) {
      try {
        const { data, error } = await useFetch('/api/auth/signup', {
          method: 'POST',
          body: { email: form.email, password: form.password, username: form.username, currency: form.currency },
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        if (!result.success) return result;
        if (!result.data.authenticated) return { success: false, error: 'Your account was created. Please log in.' };
        return this.getSession();
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async login(form) {
      try {
        const { data, error } = await useFetch('/api/auth/login', {
          method: 'POST',
          body: { email: form.email, password: form.password },
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        if (!result.success) return result;
        return this.getSession();
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async logout() {
      try {
        const { data, error } = await useFetch('/api/auth/logout', {
          method: 'POST',
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        if (result.success || result.statusCode === 401) {
          this.user = null;
          this.profile = null;
          return true;
        }
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async forgotPassword(email) {
      try {
        const { data, error } = await useFetch('/api/auth/forgot-password', {
          method: 'POST',
          body: { email },
          watch: false,
          retry: 0,
        });
        return apiResult(data, error);
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async updatePassword(payload) {
      try {
        const { data, error } = await useFetch('/api/auth/password', {
          method: 'PATCH',
          body: {
            new_password: payload.new_password,
            ...(payload.recoveryToken ? { recoveryToken: payload.recoveryToken } : {}),
          },
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        if (result.success) {
          this.user = null;
          this.profile = null;
        }
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async getDashboardSummary(payload) {
      try {
        const { data, error } = await useFetch('/api/dashboard/summary', {
          method: 'GET',
          query: compactQuery(payload),
          watch: false,
          retry: 0,
        });
        return apiResult(data, error);
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    async updateProfile(payload) {
      try {
        const file = payload.newProfile?.[0];
        if (file) {
          const form = new FormData();
          form.append('file', file);
          const { data, error } = await useFetch('/api/users/me/avatar', {
            method: 'PUT',
            body: form,
            watch: false,
            retry: 0,
          });
          const upload = apiResult(data, error);
          if (!upload.success) return upload;
          this.profile = upload.data.profile;
        }
        const { data, error } = await useFetch('/api/users/me/profile', {
          method: 'PATCH',
          body: { name: payload.name, currency: payload.currency },
          watch: false,
          retry: 0,
        });
        const result = apiResult(data, error);
        if (result.success) this.profile = result.data;
        return result;
      } catch (error) {
        return apiResult(null, { value: error });
      }
    },
    getUserProfilePhoto(path) {
      return path ? `/api/avatars/${path.split('/').map(encodeURIComponent).join('/')}` : null;
    },
  },
});

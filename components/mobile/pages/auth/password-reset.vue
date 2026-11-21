<template>
  <MobileLoadingDots v-if="loading" />
  <div class="password-reset-wrapper px-6 py-4">
    <MobilePageHeader title="Reset Your Password" :show-back="false" text-color="text-black" />
    <div class="password-reset-form-wrapper pt-16">

      <div class="password py-3">
        <CoreInputBox placeholder="New Password" type="password" v-model="form.password" />
      </div>

      <div class="login py-3">
        <button @click="resetPassword" type="button"
          class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer">
          <Icon name="lucide:refresh-ccw" class="text-white text-2xl cursor-pointer" />
          Reset Now
        </button>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useUserStore } from "~/store/user";

const { updatePassword } = useUserStore();
const loading = ref(false);
const form = reactive({ password: "" });
const recoveryToken = ref(null);
onMounted(() => {
  recoveryToken.value = new URLSearchParams(window.location.hash.slice(1)).get('access_token');
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
});

const resetPassword = async () => {
  if (!recoveryToken.value) {
    useNuxtApp().$toast.error('Open the password reset link from your email.');
    return;
  }
  loading.value = true;
  const result = await updatePassword({ new_password: form.password, recoveryToken: recoveryToken.value });
  loading.value = false;
  if (result.success) {
    recoveryToken.value = null;
    useNuxtApp().$toast.success('Password updated. Please log in.');
    return navigateTo('/login');
  }
  useNuxtApp().$toast.error(result.error);
};
</script>

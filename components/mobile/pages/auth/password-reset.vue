<template>
  <MobileLoadingDots v-if="loading" />
  <div class="password-reset-wrapper px-6 py-4">
    <MobilePageHeader title="Login" :show-back="false" text-color="text-black" />
    <div class="password-reset-form-wrapper pt-16">

      <div class="password py-3">
        <CoreInputBox placeholder="password" type="password" v-model="form.password" />
      </div>

      <div class="login py-3">
        <button @click="loginUser" type="button"
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

const { login } = useUserStore();
const loading = ref(false);
const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const loginUser = async () => {
  if (!form.email || !form.password) {
    useNuxtApp().$toast.error("Please enter both email and password.");
    return;
  }

  loading.value = true;

  const result = await login(form);

  if (result.success) {
    useNuxtApp().$toast.success("Login Successful");
    router.push("/");
  } else {
    useNuxtApp().$toast.error(
      result.error || "Login failed. Please try again."
    );
  }

  loading.value = false;
};
</script>

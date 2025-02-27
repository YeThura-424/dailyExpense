<template>
  <MobileLoadingDots v-if="loading" />
  <div class="login-wrapper px-6 py-4">
    <MobilePageHeader
      title="Login"
      :show-back="false"
      text-color="text-black"
    />
    <div class="login-form-wrapper pt-16">
      <div class="username py-3">
        <CoreInputBox placeholder="Email" type="email" v-model="form.email" />
      </div>

      <div class="password py-3">
        <CoreInputBox
          placeholder="password"
          type="password"
          v-model="form.password"
        />
      </div>

      <div class="login py-3">
        <button
          @click="loginUser"
          type="button"
          class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          <Icon
            name="ion:ios-log-in"
            class="text-white text-2xl cursor-pointer"
          />
          Login
        </button>
      </div>

      <p class="text-center text-xl p-4">or</p>

      <!-- social login button -->
      <!-- <div class="flex flex-col gap-4">
        <CoreGithubLogin />
        <CoreGoogleLogin />
      </div> -->

      <div class="forget-password text-center py-3">
        <p class="text-lg font-medium text-[#7F3DFF]">Forget Password ?</p>
      </div>

      <div class="sign-up-link text-center">
        <p class="text-base text-[#91919F]">
          Don't have an account yet?
          <NuxtLink to="/signup">
            <span class="text-lg text-[#7F3DFF] font-medium">Sign Up</span>
          </NuxtLink>
        </p>
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

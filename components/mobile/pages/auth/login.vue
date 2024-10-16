<template>
  <MobileLoadingDots v-if="loading" />
  <div class="login-wrapper px-6 py-4">
    <MobilePageHeader title="Login" :show-back="false" text-color="text-black" />
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
          @click="login"
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

      <div class="forget-password text-center py-3">
        <p class="text-lg font-medium text-[#7F3DFF]">Forget Password ?</p>
      </div>

      <div class="sign-up-link text-center">
        <p class="text-base text-[#91919F]">
          Don't have an account yet?
          <span class="text-lg text-[#7F3DFF] font-medium">Sign Up</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/authUser";

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const loading = ref(false);
const router = useRouter();
const loginError = ref(false);

const form = reactive({
  email: "test@email.com",
  password: "secret",
});

const login = async () => {
  loading.value = true;
  try {
    await authenticateUser(form); // call authenticateUser and pass the user object
    if (authenticated.value) {
      useNuxtApp().$toast.success('Login Successful');
      router.push("/");
    } else {
      loading.value = false
      loginError.value = true;
      useNuxtApp().$toast.error('Error logging in');
    }
  } catch (error) {
    console.log(error)
  }
};
</script>

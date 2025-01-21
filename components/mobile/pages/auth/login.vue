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
      <div class="flex flex-col gap-4">
        <CoreGithubLogin />
        <CoreGoogleLogin />
      </div>

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
  email: "testuser@gmail.com",
  password: "123456",
});

const loginUser = async () => {
  loading.value = true;
  const data = await login(form);

  if (data) {
    useNuxtApp().$toast.success("Login Successful");
    router.push("/");
  }
};

// const login = async () => {
//   loading.value = true;
//   const { data, error } = await useFetch("/api/login", {
//     method: "POST",
//     body: form,
//     transform: (response) => {
//       return response;
//     },
//   });

//   if (data?.value) {
//     console.log(data.value.data);
//     const token = useCookie("token"); // useCookie new hook in nuxt 3
//     const user = useCookie("user");
//     token.value = data?.value?.data?.token; // set token to cookie
//     user.value = data?.value?.data?.user;
//     loading.value = false;
//     useNuxtApp().$toast.success("Login Successful");
//     router.push("/");
//   }

//   if (error?.value) {
//     loading.value = false;
//     useNuxtApp().$toast.error(error.value?.data?.data?.message);
//   }
// };

// const sendTokenToBackend = async () => {
//   let token = data.value?.access_token;

//   let provider = data.value?.provider;
//   console.log("nanda", provider);

//   if (token) {
//     const { data, error } = await useFetch(`/api/${provider}/login`, {
//       method: "POST",
//       body: {
//         access_token: token,
//       },
//       transform: (response) => {
//         console.log(response);
//         return response;
//       },
//     });

//     if (data?.value) {
//       console.log(data.value.data);
//       const token = useCookie("token");
//       const user = useCookie("user");
//       token.value = data?.value?.data?.token; // set token to cookie
//       user.value = data?.value?.data?.user;
//       loading.value = false;
//       useNuxtApp().$toast.success("Login Successful");
//       router.push("/");
//     }

//     if (error?.value) {
//       loading.value = false;
//       useNuxtApp().$toast.error(error.value?.data?.data?.message);
//     }
//   }
// };

// if (status.value === "authenticated") {
//   sendTokenToBackend();
// }
</script>

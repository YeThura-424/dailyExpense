<template>
  <div class="login-wrapper px-6 py-4">
    <MobilePageHeader
      title="Sign Up"
      text-color="text-black"
      :show-back="false"
    />
    <div class="login-form-wrapper pt-10">
      <div class="name py-3">
        <CoreInputBox v-model="form.name" placeholder="Name" type="text" />
        <p
          v-if="validationError?.name"
          class="text-sm text-red-600 font-normal"
        >
          {{ validationError.name[0] }}
        </p>
      </div>

      <div class="currency py-3">
        <CoreSelectBox
          placeholder="Select Default Currency"
          :options="currency"
          show-icon
        />
      </div>

      <div class="email py-3">
        <CoreInputBox v-model="form.email" placeholder="Email" type="email" />
        <p
          v-if="validationError?.email"
          class="text-sm text-red-600 font-normal"
        >
          {{ validationError.email[0] }}
        </p>
      </div>

      <div class="password py-3">
        <CoreInputBox
          v-model="form.password"
          placeholder="Password"
          type="password"
        />
        <p
          v-if="validationError?.password"
          class="text-sm text-red-600 font-normal"
        >
          {{ validationError.password[0] }}
        </p>
      </div>

      <div class="password py-3">
        <CoreInputBox
          v-model="form.password_confirmation"
          placeholder="Confirm Password"
          type="password"
        />
      </div>

      <div class="checkbox flex gap-x-2">
        <input
          id="termsandcondition"
          type="checkbox"
          class="h-8 w-8 border-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label for="termsandcondition" class="text-lg"
          >By signing up, you agree to the
          <span class="text-[#7F3DFF]"
            >Terms of Service and Privacy Policy</span
          >
        </label>
      </div>
      <div class="sign-up py-3">
        <button
          type="button"
          @click="registerUser"
          class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          <Icon
            name="ion:ios-log-in"
            class="text-white text-2xl cursor-pointer"
          />
          Sign Up
        </button>
      </div>

      <div class="sign-up-link text-center">
        <p class="text-base text-[#91919F]">
          Already have an account?
          <NuxtLink to="/login">
            <span class="text-lg text-[#7F3DFF] font-medium">Login</span>
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";

const currency = ref([
  { name: "Ks", value: "ks", icon: "/images/ks.png" },
  { name: "USD", value: "usd", icon: "/images/dollar.png" },
  { name: "Baht", value: "bhat", icon: "/images/baht.png" },
]);

const router = useRouter();
const form = reactive({
  name: "test_user",
  email: "testuser@gmail.com",
  password: "123456",
  password_confirmation: "123456",
  currency: "ks",
});

const validationError = ref(null);
const token = useCookie("token");
const user = useCookie("user");

const { signup } = useUserStore();

// const signup = async () => {
//   const { data, status, error } = await useFetch("/api/register", {
//     method: 'POST',
//     body: form,
//   });
//   if (status.value == 'success') {
//     token.value = data?.value?.data?.token; // set token to cookie
//     user.value = data?.value?.data?.user;
//     navigateTo('/');
//   }

//   if (error.value) {
//     validationError.value = error.value?.data?.data?.errors;
//   }
// }

const registerUser = async (e) => {
  if (e.isTrusted) {
    const data = await signup(form);

    if (data) {
      router.push("/");
    }
  }
};
</script>

<template>
  <div class="loading-wrapper" v-if="loading">
    <MobileLoadingDots />
  </div>
  <div class="bg-[#7F3DFF] flex flex-col justify-between h-screen">
    <div
      class="expense_main_content px-6 py-4 flex flex-col justify-between h-full"
    >
      <div class="account_header">
        <MobilePageHeader
          title="Add new account"
          icon-color="text-white"
          @back="backAction"
        />
      </div>
      <div class="expense_amount text-white">
        <span class="text-lg">Balance</span>
        <div class="flex items-center">
          <span class="font-extrabold text-5xl"> {{ getCurrency() }} </span>
          <input
            v-model="form.amount"
            type="text"
            class="bg-transparent focus:outline-none font-extrabold text-5xl px-2 w-2/3"
          />
        </div>
      </div>
    </div>
    <div class="expense_form bg-white rounded-t-[40px] shadow px-6 py-4">
      <div class="account_name">
        <CoreInputBox placeholder="Name" v-model="form.name" />
      </div>
      <div class="category_select py-3"></div>

      <div class="save-button gap-x-5 py-3">
        <button
          @click="saveWallet"
          type="button"
          class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          <Icon
            name="ion:save-outline"
            class="text-white text-2xl cursor-pointer"
          />
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWalletStore } from "~/store/wallet";

const authUser = useCookie("user");
const loading = ref(false);
const form = reactive({
  amount: 0,
  name: "",
});
const router = useRouter();

const { storeWallet } = useWalletStore();

const backAction = () => {
  navigateTo("/account");
};

const saveWallet = async () => {
  loading.value = true;
  if (!authUser.value) {
    loading.value = false;
    useNuxtApp().$toast.error("Please Login First!!");
    return false;
  }

  const result = await storeWallet({
    userId: authUser.value.id,
    name: form.name,
    amount: form.amount,
  });

  if (result.success) {
    useNuxtApp().$toast.success("Account Created Successfully");
    router.push("/account");
  } else {
    loading.value = false;
    useNuxtApp().$toast.error(result.message);
  }
};
</script>

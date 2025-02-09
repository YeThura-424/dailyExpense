<template>
  <div class="min-h-screen bg-white">
    <div class="account_content">
      <div class="account_header">
        <MobilePageHeader
          title="Wallets List"
          text-color="text-black"
          @back="backAction"
        />
      </div>
      <div
        class="account_info text-center px-6 py-16"
        v-if="userAccountBalance"
      >
        <h1 class="text-sm text-p[#91919F] font-medium">Wallets Balance</h1>
        <p class="text-3xl font-bold text-[#161719]">
          {{ formatAmount(userAccountBalance) }}
        </p>
      </div>
      <div v-if="walletLoading">
        <div v-for="data in 5" :key="data">
          <MobileLoadingAccountListCard />
        </div>
      </div>
      <div v-else>
        <div v-if="walletLists?.length == 0" class="empty_account_state py-12">
          <div class="text-center">
            <!-- <IconAccount /> -->
            <p class="text-base font-medium">You don't any account</p>
            <p class="text-base font-medium">
              Let's make one so you in control
            </p>
          </div>
        </div>
        <div v-else class="account-modules-wrapper bg-white overflow-auto">
          <!-- wallet account  -->
          <div
            v-for="wallet in walletLists"
            :key="wallet"
            class="account-section flex items-center justify-between border-b border-[#eee] px-4 py-4"
          >
            <div class="flex items-center gap-x-3">
              <div
                class="account-logo w-14 h-14 bg-[#EEE5FF] rounded-2xl flex justify-center items-center"
              >
                <Icon name="ion:md-wallet" class="text-4xl text-[#7F3DFF]" />
              </div>
              <div>
                <h1 class="text-[#292B2D] text-xl font-medium">
                  {{ wallet.name }}
                </h1>
                <p class="text-base text-[#91919F]">
                  {{ formatAmount(wallet.amount) }}
                </p>
              </div>
            </div>
            <div class="amount flex gap-x-2">
              <nuxt-link :to="`/account/${wallet.id}`">
                <Icon
                  name="ion:ios-information-circle"
                  class="text-2xl text-[#7F3DFF]"
                />
              </nuxt-link>
              <Icon
                @click="openWalletEditModel(wallet)"
                name="ion:ios-settings"
                class="text-2xl text-[#FCAC12]"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- create button for account  -->
      <div
        class="account-create fixed bottom-3 w-[95%] left-1/2 -translate-x-1/2"
      >
        <nuxt-link to="/account/add">
          <button
            type="button"
            class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
          >
            <Icon
              name="ion:ios-create"
              class="text-white text-2xl cursor-pointer"
            />
            Create new Account
          </button>
        </nuxt-link>
      </div>
    </div>

    <CoreModelBox
      :visible="isOpenWalletEditModel"
      @dismiss="closeWalletEditModel"
      @apply="updateEditWallet"
    >
      <div class="wallet-edit-form">
        <div class="wallet_name_input py-2">
          <label class="text-base text-[#91919F]">Name</label>
          <CoreInputBox placeholder="Name" v-model="form.name" />
        </div>
        <div class="wallet_amount_input py-2 relative">
          <label class="text-base text-[#91919F]">Amount</label>
          <CoreInputBox placeholder="Amount" v-model="form.amount" disabled />
          <span
            class="text-xl text-[#323236] absolute left-[78px] top-[46px]"
            >{{ getCurrency() }}</span
          >
        </div>
      </div>
    </CoreModelBox>
  </div>
</template>

<script setup>
import { useWalletStore } from "~/store/wallet";

const isOpenWalletEditModel = ref(false);
const walletLists = ref(null);
const userAccountBalance = ref(null);
const walletLoading = ref(true);
const walletUpdateLoading = ref(false);
const { fetchWallets, updateWallet } = useWalletStore();
const backAction = () => {
  navigateTo("/profile");
};

const form = reactive({
  name: "",
  amount: 0,
  id: "",
});

const pullWallet = async () => {
  walletLoading.value = true;
  const result = await fetchWallets();
  walletLoading.value = false;
  if (result.success) {
    walletLists.value = result.data;
    userAccountBalance.value = walletLists.value.reduce(
      (total, item) => total + item.amount,
      0
    );
  } else {
    useNuxtApp().$toast.error(result.message);
  }
};

const openWalletEditModel = (wallet) => {
  form.name = wallet.name;
  form.amount = wallet.amount;
  form.id = wallet.id;

  isOpenWalletEditModel.value = true;
};

const closeWalletEditModel = (updateVal) => {
  isOpenWalletEditModel.value = updateVal;
};

const updateEditWallet = async (updateVal) => {
  walletUpdateLoading.value = true;
  const result = await updateWallet(form);

  if (result.success) {
    walletUpdateLoading.value = false;
    useNuxtApp().$toast.success("Wallet Updated Sucessfully!");
    pullWallet();
  } else {
    walletUpdateLoading.value = false;
    useNuxtApp().$toast.error(result.error);
    resetForm();
    isOpenWalletEditModel.value = updateVal;
  }
};

const resetForm = () => {
  form.name = "";
  form.amount = 0;
  form.id = "";
};

pullWallet();
</script>

<style scoped>
.account_info {
  background-image: url("/images/account_bg.png");
}

.account-modules-wrapper {
  height: calc(100vh - 320px);
}
</style>

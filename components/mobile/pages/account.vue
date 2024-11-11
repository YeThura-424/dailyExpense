<template>
  <div class="min-h-screen bg-white">
    <div class="account_content">
      <div class="account_header">
        <MobilePageHeader title="Account" text-color="text-black" @back="backAction" />
      </div>
      <div class="account_info text-center px-6 py-16">
        <h1 class="text-sm text-p[#91919F] font-medium">Account Balance</h1>
        <p class="text-3xl font-bold text-[#161719]">
          ${{ walletLists.total_amount }}
        </p>
      </div>
      <div v-if="walletLoading">
        <div v-for="data in 5" :key="data">
          <MobileLoadingAccountListCard />
        </div>
      </div>
      <div v-else>
        <div v-if="walletLists?.user_wallet?.length == 0" class="empty_account_state py-12">
          <div class="text-center">
            <!-- <IconAccount /> -->
            <p class="text-base font-medium">You don't any account</p>
            <p class="text-base font-medium">Let's make one so you in control</p>
          </div>
        </div>
        <div v-else class="account-modules-wrapper bg-white overflow-auto">
          <!-- wallet account  -->
          <div v-for="wallet in walletLists.user_wallet" :key="wallet"
            class="account-section flex items-center justify-between border-b border-[#eee] px-4 py-4">
            <div class="flex items-center gap-x-3">
              <div class="account-logo w-14 h-14 bg-[#EEE5FF] rounded-2xl flex justify-center items-center">
                <Icon name="ion:md-wallet" class="text-4xl text-[#7F3DFF]" />
              </div>
              <div>
                <h1 class="text-[#292B2D] text-xl font-medium">
                  {{ wallet.name }}
                </h1>
                <p class="capitalize">{{ wallet.wallet_type.name }}</p>
              </div>
            </div>
            <div class="amount">
              <p class="text-xl text-[#212325]">${{ wallet.amount }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- create button for account  -->
      <div class="account-create fixed bottom-3 w-[95%] left-1/2 -translate-x-1/2">
        <nuxt-link to="/account/add">
          <button type="button"
            class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer">
            <Icon name="ion:ios-create" class="text-white text-2xl cursor-pointer" />
            Create new Account
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const wallet = useWalletType();
const walletLists = ref([]);
const walletLoading = ref(true);
const backAction = () => {
  navigateTo('/profile');
}

const pullWallet = async () => {
  walletLoading.value = true;
  await wallet.getWalletList();
  walletLoading.value = false;
  walletLists.value = wallet.walletList;
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

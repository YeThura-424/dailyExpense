<template>
  <div>
    <div class="px-4 pt-3 pb-3">
      <!-- see report section  -->
      <div class="account_detail_header pb-3">
        <MobilePageHeader
          title="Account Detail"
          icon-color="text-[#7F3DFF]"
          text-color="text-black"
          @back="backAction"
        />
      </div>

      <div class="account_detail_in text-center flex flex-col items-center">
        <div
          class="account-logo w-14 h-14 bg-[#EEE5FF] rounded-2xl flex justify-center items-center"
        >
          <Icon name="ion:md-wallet" class="text-4xl text-[#7F3DFF]" />
        </div>
        <h1 class="text-xl font-semibold">{{ wallet.name }}</h1>
        <p class="text-2xl font-bold py-2">
          {{ formatAmount(wallet.amount) }}
        </p>
      </div>
      <div v-if="!loading" class="transaction_list_warpper">
        <div v-if="wallet.transactions.length > 0">
          <div
            v-for="(transactions, key) in transactions"
            :key="key"
            class="py-2"
          >
            <h1 class="font-semibold text-lg">{{ dayToName(key) }}</h1>
            <div class="transaction_list pt-2">
              <CoreTransactionListCard :transactions="transactions" />
            </div>
          </div>
        </div>
        <div class="empty-transaction text-center py-12">
          <h1>No Recent Transaction for current Wallet!</h1>
        </div>
      </div>
      <div v-else class="transaction-loading-list">
        <MobileLoadingIncomeExpenseCard :cards="6" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWalletStore } from "~/store/wallet";

const route = useRoute();
const accountId = route.params.id;
const wallet = ref([]);
const transactions = ref([]);
const loading = ref(false);

const { walletDetail } = useWalletStore();

const backAction = () => {
  navigateTo("/account");
};

const fetchWallet = async () => {
  loading.value = true;
  const result = await walletDetail(accountId);

  if (result.success) {
    loading.value = false;
    useNuxtApp().$toast.success("Wallet data retrived successfully");
    wallet.value = result.data;
    transactions.value = groupTransaction(wallet?.value?.transactions);
  } else {
    useNuxtApp().$toast.error(result.error);
  }
};

// to group transactions with date
const groupTransaction = (transactions) => {
  const groupedData = transactions.reduce((acc, item) => {
    const date = item.action_date.split(" ")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
  return groupedData;
};

fetchWallet();
</script>

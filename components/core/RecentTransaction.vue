<template>
  <div class="transaction-wrapper">
    <div class="section-heading"><div><p class="eyebrow">YOUR EVERYDAY ACTIVITY</p><h3>Recent transactions</h3></div><NuxtLink to="/transaction" class="text-link">View all <Icon name="ion:arrow-forward" /></NuxtLink></div>
    <div class="transaction-tabs" aria-label="Transaction period"><button v-for="tab in tabs" :key="tab.key" type="button" :class="{ 'is-active': activeTab === tab.key }" :aria-pressed="activeTab === tab.key" @click="changeTab(tab.key)">{{ tab.name }}</button></div>
    <div v-if="transactionLoading"><LazyMobileLoadingIncomeExpenseCard :cards="4" /></div>
    <div v-else-if="transactions.length" class="transaction-list"><CoreTransactionListCard :transactions="transactions" /></div>
    <div v-else class="activity-empty"><span><Icon name="ion:receipt-outline" /></span><h4>A little quiet here.</h4><p>No transactions for this period.<br />Your next entry will appear right here.</p><NuxtLink to="/expense" class="text-link"><Icon name="ion:add" /> Add a transaction</NuxtLink></div>
  </div>
</template>

<script setup>
import { usetransactionStore } from "~/store/transaction";

const tabs = [
  { name: "Today", key: "today" },
  { name: "Week", key: "week" },
  { name: "Month", key: "month" },
  { name: "Year", key: "year" },
];
const transactions = ref([]);
const activeTab = ref(tabs[0].key);
const transactionLoading = ref(true);
const transactionStore = usetransactionStore();
const changeTab = (tab) => {
  activeTab.value = tab;
  fetchTransaction();
};

const fetchTransaction = async () => {
  if (!isOnline()) {
    transactionLoading.value = false;
    return false;
  }

  const filterParams = {
    today: activeTab.value === "today",
    week: activeTab.value === "week",
    month: activeTab.value === "month",
    year: activeTab.value === "year",
  };

  transactionLoading.value = true;

  const result = await transactionStore.fetchTransactionsForToday(filterParams);

  if (result.success) {
    transactions.value = result.data;
  } else {
    transactionLoading.value = false;
    useNuxtApp().$toast.error(result.error);
  }
  transactionLoading.value = false;
};

onNuxtReady(fetchTransaction);
</script>

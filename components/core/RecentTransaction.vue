<template>
  <div class="transaction-wrapper">
    <div class="transaction-tab-wrapper">
      <div class="tabs-content flex justify-between space-x-1 rounded-xl p-1">
        <button v-for="tab in tabs" :key="tab.key" @click="changeTab(tab.key)" :class="[
          'px-3 rounded-2xl py-2 text-base font-medium leading-5 ',
          'ring-white/60 ring-offset-2 ring-offset-none focus:outline-none',
          activeTab == tab.key
            ? 'bg-[#FCEED4] text-[#FCAC12] shadow'
            : 'text-[#91919F] hover:bg-white/[0.12] hover:text-white',
        ]">
          {{ tab.name }}
        </button>
      </div>
    </div>
    <div class="transaction-title-section">
      <div class="filter-head flex justify-between items-center pt-2">
        <h1 class="text-xl font-semibold text-[#292B2D]">Filter Transaction</h1>
        <NuxtLink to="/transaction">
          <button class="text-[#7F3DFF] bg-[#ddd2f1] px-4 py-1.5 rounded-[22px]">
            See All
          </button>
        </NuxtLink>
      </div>
    </div>
    <div class="transaction-tab-content">
      <div v-if="transactionLoading">
        <LazyMobileLoadingIncomeExpenseCard :cards="4" />
      </div>
      <div v-else>
        <div v-if="transactions.length > 0" class="transaction_list pt-2">
          <CoreTransactionListCard :transactions="transactions" />
        </div>
        <div v-else class="empty-transactions">
          <h1 class="text-center py-8">No Transaction for selected criteria!</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tabs = [
  { name: "Today", key: "today" },
  { name: "Week", key: "week" },
  { name: "Month", key: "month" },
  { name: "Year", key: "year" },
];
const transactions = ref([]);
const activeTab = ref(tabs[0].key);
const transactionLoading = ref(true);
const changeTab = (tab) => {
  activeTab.value = tab;
  fetchTransaction();
};

const fetchTransaction = async () => {
  const filterParams = {
    today: activeTab.value === "today",
    week: activeTab.value === "week",
    month: activeTab.value === "month",
    year: activeTab.value === "year",
  };
  try {
    transactionLoading.value = true;
    await useFetch("/api/income/list", {
      method: "GET",
      params: filterParams,
      transform: (response) => {
        transactions.value = response?.data?.data;
      },
    });
  } catch (error) {
    console.log(error)
  } finally {
    transactionLoading.value = false;
  }

};

fetchTransaction();
</script>

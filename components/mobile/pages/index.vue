<template>
  <div class="dashboard-page">
    <section class="dashboard-welcome">
      <div><p class="eyebrow">YOUR MONEY, AT A GLANCE</p><h2>Welcome back<span v-if="profile?.username">, {{ profile.username }}</span><span class="text-[#7F3DFF]">.</span></h2><p class="page-description">A little clarity for your everyday.</p></div>
      <NuxtLink :to="`/profile/${user?.id}`" class="dashboard-avatar"><img :src="profile?.avatar_url ? getUserProfilePhoto(profile.avatar_url) : '/images/userprofile.png'" alt="Edit your profile" /></NuxtLink>
    </section>
    <div class="dashboard-period"><div class="period-caption"><Icon name="ion:calendar-outline" /><span>Your monthly overview</span></div><div class="period-selects"><CoreYearSelect v-model="selectedDate.year" :min-year="2023" /><CoreMonthSelect v-model="selectedDate.month" :current-year="yearForMonth" /></div></div>
    <MobileLoadingAccountBalanceAndIncomeExpend v-if="loading.incomeExpend" />
    <section v-else class="summary-grid" aria-label="Account summary">
      <div class="summary-card balance-card"><div class="summary-label"><span>Total wallet balance</span><Icon name="ion:wallet-outline" /></div><p class="summary-value">{{ formatAmount(walletTotal) }}</p><NuxtLink to="/account" class="summary-link">View your wallets <Icon name="ion:arrow-forward" /></NuxtLink></div>
      <div class="summary-card income-card"><div class="summary-label"><span>Income</span><span class="summary-icon"><Icon name="ion:arrow-down-outline" /></span></div><p class="summary-value">{{ formatAmount(incomeTotal) }}</p><p class="summary-footnote">Money coming in this month</p></div>
      <div class="summary-card expense-card"><div class="summary-label"><span>Expense</span><span class="summary-icon"><Icon name="ion:arrow-up-outline" /></span></div><p class="summary-value">{{ formatAmount(expendTotal) }}</p><p class="summary-footnote">Money going out this month</p></div>
    </section>
    <div class="dashboard-lower">
      <section class="surface-card activity-card"><CoreRecentTransaction /></section>
      <aside class="dashboard-aside">
        <section class="surface-card quick-actions"><p class="eyebrow">KEEP THINGS UP TO DATE</p><h3>Quick actions</h3><div class="quick-action-links"><NuxtLink to="/income"><span class="action-icon text-[#00A86B] bg-[#E0F5EB]"><Icon name="ion:arrow-down-outline" /></span><span>Add income<small>Record money coming in</small></span><Icon name="ion:chevron-forward" /></NuxtLink><NuxtLink to="/expense"><span class="action-icon text-[#FD3C4A] bg-[#FDD5D7]"><Icon name="ion:arrow-up-outline" /></span><span>Add expense<small>Keep track of spending</small></span><Icon name="ion:chevron-forward" /></NuxtLink><NuxtLink to="/transfer"><span class="action-icon text-[#0077FF] bg-[#E5F0FF]"><Icon name="ion:swap-horizontal-outline" /></span><span>Transfer<small>Move between wallets</small></span><Icon name="ion:chevron-forward" /></NuxtLink></div></section>
        <section class="budget-prompt"><span class="prompt-icon"><Icon name="ion:pie-chart-outline" /></span><h3>A plan for what’s next.</h3><p>Give your spending a little direction with a monthly budget.</p><NuxtLink to="/budget" class="button-secondary">Explore your budgets <Icon name="ion:arrow-forward" /></NuxtLink></section>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";

const selectedDate = reactive({
  year: null,
  month: null,
});

const yearForMonth = ref(selectedDate.year);
const user = useCookie("user");
const profile = useCookie("profile");

const { getDashboardSummary, getUserProfilePhoto } = useUserStore();
const loading = reactive({
  incomeExpend: false,
});

const incomeTotal = ref(0);
const expendTotal = ref(0);
const walletTotal = ref(0);

const getIncomeExpense = async (year, month) => {
  loading.incomeExpend = true;
  if (!isOnline()) {
    useNuxtApp().$toast.warning("No Internet Connection, try again later!");
    loading.incomeExpend = false;
    return false;
  }

  const result = await getDashboardSummary({ year: year, month: month });

  if (result.success) {
    incomeTotal.value = result.data.incomeTotal;
    expendTotal.value = result.data.expenseTotal;
    walletTotal.value = result.data.walletTotal;
  } else {
    loading.incomeExpend = false;
    useNuxtApp().$toast.error(result.error);
  }
  loading.incomeExpend = false;
};

watch(
  () => selectedDate,
  (updateDate) => {
    if (updateDate.year && updateDate.month) {
      console.log(updateDate);
      getIncomeExpense(updateDate?.year, updateDate?.month);
    }
  },
  { deep: true }
);

watch(
  () => selectedDate.year,
  (newYear) => {
    yearForMonth.value = newYear;
  }
);
</script>

<template>
  <div>
    <div class="relative pb-[78px]">
      <!-- header section starts here  -->
      <div class="py-4 px-4 bg-[#FFF6E5] rounded-b-3xl">
        <div class="flex justify-between items-center">
          <div class="profile">
            <NuxtLink :to="`/profile/${user?.id}`">
              <img
                :src="user?.image ?? '/images/user.jpg'"
                class="w-8 h-8 rounded-full border-2 border-[#7F3DFF] p-1"
                alt=""
              />
            </NuxtLink>
          </div>
          <div class="year_select">
            <CoreMonthSelect v-model="selectedDate.year" :months="rawYear" />
          </div>
          <div class="month_select">
            <CoreMonthSelect v-model="selectedDate.month" :months="rawMonth" />
          </div>
          <div class="notification">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 21.5C25.8608 22.2171 25.472 22.8616 24.9026 23.3193C24.3333 23.777 23.6203 24.0181 22.89 24H9.11001C8.37977 24.0181 7.66671 23.777 7.09738 23.3193C6.52805 22.8616 6.13927 22.2171 6.00001 21.5C5.89663 20.885 5.98746 20.2531 6.25988 19.6921C6.5323 19.1312 6.97276 18.669 7.52001 18.37C7.66786 18.2883 7.79065 18.1679 7.87522 18.0216C7.95979 17.8754 8.00293 17.7089 8.00001 17.54V14C7.99726 12.4041 8.4719 10.8438 9.3629 9.51978C10.2539 8.19575 11.5206 7.16847 13 6.57C13.004 5.77435 13.3239 5.01287 13.8893 4.45307C14.4547 3.89328 15.2194 3.58102 16.015 3.585C16.8107 3.58898 17.5721 3.90886 18.1319 4.47428C18.6917 5.03971 19.004 5.80435 19 6.6C20.4923 7.25496 21.7605 8.33179 22.6489 9.69803C23.5372 11.0643 24.0068 12.6604 24 14.29V17.54C23.9931 17.7049 24.0302 17.8688 24.1075 18.0146C24.1848 18.1605 24.2996 18.2832 24.44 18.37C24.9946 18.6631 25.4434 19.1227 25.7233 19.6842C26.0031 20.2456 26.0999 20.8807 26 21.5Z"
                fill="#7F3DFF"
              />
              <path
                d="M16.0001 28C16.6981 27.9958 17.3829 27.809 17.9864 27.4581C18.5899 27.1072 19.091 26.6046 19.4401 26H12.5601C12.9091 26.6046 13.4102 27.1072 14.0137 27.4581C14.6172 27.809 15.302 27.9958 16.0001 28Z"
                fill="#7F3DFF"
              />
            </svg>
          </div>
        </div>
        <div v-if="loading.incomeExpend" class="loading-section">
          <MobileLoadingAccountBalanceAndIncomeExpend />
        </div>
        <div v-else class="account-balance-and-income-expend-section">
          <div class="account_balance text-center py-8">
            <h1 class="text-[#91919F] text-base font-bold pb-2">
              Account Balance
            </h1>
            <!-- <span class="text-2xl font-semibold text-[#161719]">{{ accountData.walletBalance }} Ks </span> -->
            <span class="text-2xl font-semibold text-[#161719]">
              <!-- {{ formatAmount(accountData?.walletBalance ?? 0) }} -->
              {{ formatAmount(walletTotal) }}
            </span>
          </div>
          <div class="income_expense flex justify-between gap-x-4">
            <div
              class="income flex items-center gap-x-1 bg-[#00A86B] p-3 rounded-2xl w-full"
            >
              <div class="income_icon">
                <IconHomeIncome />
              </div>
              <div class="income_text text-white">
                <span class="text-lg">Income</span>
                <h1 class="text-lg">
                  <!-- {{ formatAmount(accountData?.income?.amount ?? 0) }} -->
                  {{ formatAmount(incomeTotal) }}
                </h1>
              </div>
            </div>
            <div
              class="expense flex items-center gap-x-1 bg-[#FD3C4A] p-3 rounded-2xl w-full"
            >
              <div class="expense_icon">
                <IconHomeExpense />
              </div>
              <div class="expense_text text-white">
                <span class="text-lg">Expense</span>
                <h1 class="text-lg">
                  <!-- {{ formatAmount(accountData?.expend?.amount ?? 0) }} -->
                  {{ formatAmount(expendTotal) }}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- header section ends here  -->

      <!-- recent transaction section starts here  -->
      <div class="py-3 px-4">
        <CoreRecentTransaction />
      </div>
      <!-- recent transaction section ends here  -->
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";
import { useWalletStore } from "~/store/wallet";

const rawYear = ref([
  { id: 1, name: 2025, value: 2025 },
  { id: 2, name: 2024, value: 2024 },
]);
const selectedDate = reactive({
  year: null,
  month: null,
});
const rawMonth = computed(() => getPreviousMonth(selectedDate.year?.value));
const user = useCookie("user");

const userStore = useUserStore();
const walletStore = useWalletStore();
const loading = reactive({
  incomeExpend: false,
});

const accountData = ref([]);
const incomeTotal = ref(0);
const expendTotal = ref(0);
const walletTotal = ref(0);

const getIncomeExpense = async (year, month) => {
  loading.incomeExpend = true;
  const result = await userStore.getWalletAndTransaction();

  if (result.success) {
    incomeTotal.value = result.data
      .filter((item) => item.type === "income")
      .reduce((total, income) => total + income.transaction_amount, 0);

    expendTotal.value = result.data
      .filter((item) => item.type === "expense")
      .reduce((total, expense) => total + expense.transaction_amount, 0);

    getWallet();
  } else {
    loading.incomeExpend = false;
    useNuxtApp().$toast.error(result.error);
  }
  loading.incomeExpend = false;
};

const getWallet = async () => {
  const result = await walletStore.fetchWallets();

  if (result.success) {
    walletTotal.value = result.data.reduce(
      (total, wallet) => total + wallet.amount,
      0
    );
  }
};

watch(
  () => selectedDate,
  (updateDate) => {
    getIncomeExpense(updateDate.year.value, updateDate.month.id);
  },
  { deep: true }
);
</script>

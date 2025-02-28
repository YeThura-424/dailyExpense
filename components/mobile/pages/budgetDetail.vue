<template>
  <div class="main-wrapper">
    <div class="p-3 relative">
      <div class="main-header">
        <MobilePageHeader
          title="Budget Detail"
          icon-color="text-[#7F3DFF]"
          text-color="text-black"
          showDelete="true"
          @back="backAction"
          @delete="deleteAction"
        />
      </div>
    </div>

    <div v-if="budgetDetail" class="main-info px-4">
      <div class="budget-info flex flex-col items-center">
        <div class="category-wrapper py-4 flex flex-wrap">
          <button
            v-for="categoryBudget in budgetDetail.budget_categories"
            :key="categoryBudget"
            class="flex w-fit items-center gap-x-3 py-3 px-3 rounded-3xl shadow-md border border-[#E3E5E5] text-base font-medium"
          >
            <IconHomeExpense fill="#FDD5D7" width="24" height="24" />
            {{ categoryBudget.categories.name }}
          </button>
        </div>
        <div class="remaining-wrapper text-center py-4">
          <h1 class="text-xl font-semibold">Remaining</h1>
          <span class="text-6xl font-bold">{{
            formatAmount(budgetDetail.remaining_amount)
          }}</span>
        </div>
        <div class="budget-progress-bar w-full py-4">
          <div class="budget-bar-wrapper rounded-lg w-full bg-slate-300 flex">
            <div
              :class="['budget-bar p-2 rounded-lg', alertBg()]"
              :style="{ width: spentPercent() }"
            ></div>
          </div>
        </div>
        <div class="remaining-amount-in-total pb-2">
          <p class="text-xl font-semibold">
            {{ formatAmount(budgetDetail.spend_amount ?? 0) }} of
            {{ formatAmount(budgetDetail.total) }}
          </p>
        </div>
        <div class="limit-status">
          <button
            v-if="isExceed(budgetDetail)"
            class="bg-[#FD3C4A] px-4 py-2 rounded-full flex items-center gap-x-2 text-white font-medium"
          >
            <Icon name="ion:information-circled" class="text-2xl" />
            You have exceed the limit!
          </button>
        </div>
      </div>
      <!-- edit button ခန ပိတ်ထားတာ  -->
      <!-- <div class="pb-4 pt-[180px]">
        <button
          type="button"
          class="w-full flex items-center gap-x-2 justify-center rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          <Icon
            name="ion:arrow-up-left-box-outline"
            class="text-white text-2xl cursor-pointer"
          />
          Edit
        </button>
      </div> -->
    </div>
    <MobileLoadingDots v-if="loading" />
  </div>
</template>
<script setup>
import { useBudgetStore } from "~/store/budget";

const router = useRouter();
const route = useRoute();
const budgetId = route.params.id;
const budgetDetail = ref(null);
const budgetStore = useBudgetStore();
const loading = ref(false);

const backAction = () => {
  navigateTo("/budget");
};

const deleteAction = async () => {
  loading.value = true;
  const result = await budgetStore.deleteBudget(budgetId);

  if (result.success) {
    navigateTo("/budget");
  } else {
    loading.value = false;
    useNuxtApp().$toast.error(result.error);
  }
};

const fetchBudget = async () => {
  const result = await budgetStore.budgetDetail(budgetId);

  if (!result.success) {
    useNuxtApp().$toast.error(result.error);
    router.back();
  }

  budgetDetail.value = result.data;
  console.log(budgetDetail.value);
};

const alertBg = () => {
  const percent =
    (budgetDetail.value.spend_amount / budgetDetail.value.total) * 100;
  if (percent < 51) return "bg-blue-500";
  if (percent > 100) return "bg-red-500";

  return "bg-yellow-500";
};

const spentPercent = () => {
  const percent = Math.floor(
    (budgetDetail.value.spend_amount / budgetDetail.value.total) * 100
  );

  return `${percent}%`;
};

const isExceed = (budget) => {
  let amount = budget.spend_amount ?? 0;
  return amount >= budget.total;
};

fetchBudget();
</script>

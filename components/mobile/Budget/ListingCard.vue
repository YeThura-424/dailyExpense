<template>
  <div>
    <div
      class="listing-card-wrapper p-4 bg-[#ffffff] rounded-2xl mb-3"
      v-for="budget in budgets"
      :key="budget"
    >
      <div class="card-header flex justify-between items-center">
        <div class="header-type py-2 flex gap-x-2">
          <button
            v-for="(budgetCategory, index) in budget.budget_categories"
            v-show="index == 0"
            class="flex items-center text-lg gap-x-1 bg-[#F1F1FA] rounded-full px-3 py-1.5"
          >
            <Icon name="ion:ios-radio-button-on" :class="alertTheme(budget)" />
            {{ budgetCategory.categories.name }}
          </button>
          <button
            v-if="budget.budget_categories.length > 1"
            class="flex items-center text-lg gap-x-1 bg-[#F1F1FA] rounded-full px-3 py-1.5"
          >
            + {{ budget.budget_categories.length - 1 }}
          </button>
        </div>
        <div class="header-alert" @click="budgetDetail(budget.id)">
          <Icon
            name="ion:information-circled"
            :class="['text-3xl', alertTheme(budget)]"
          />
        </div>
      </div>
      <div class="card-info">
        <h1 class="text-xl font-bold pb-2">
          Remaining {{ formatAmount(remaining(budget)) }}
        </h1>
        <div class="budget-bar-wrapper rounded-lg w-full bg-slate-300 flex">
          <div
            :class="['budget-bar p-2 rounded-lg', alertBg(budget)]"
            :style="{ width: spentPercent(budget) }"
          ></div>
        </div>
        <p class="text-[#6f6f74] text-lg">
          {{ formatAmount(budget.spend_amount ?? 0) }} of
          {{ formatAmount(budget.total) }}
        </p>
        <span v-if="isExceed(budget)" :class="['text-xl', alertTheme(budget)]"
          >You've exceed the limit!</span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  budgets: {
    type: Array,
    required: true,
  },
});

const remaining = (budget) => {
  return budget.remaining_amount;
};

const isExceed = (budget) => {
  let amount = budget.spend_amount ?? 0;
  return amount >= budget.total;
};

const alertTheme = (budget) => {
  const spentPercent = (budget.spend_amount / budget.total) * 100;

  if (spentPercent < 51) return "text-blue-500";
  if (spentPercent > 100) return "text-red-500";

  return "text-yellow-500";
};

const alertBg = (budget) => {
  const percent = (budget.spend_amount / budget.total) * 100;

  if (percent < 51) return "bg-blue-500";
  if (percent > 100) return "bg-red-500";

  return "bg-yellow-500";
};

const spentPercent = (budget) => {
  const percent = Math.floor((budget.spend_amount / budget.total) * 100);

  return `${percent}%`;
};

const budgetDetail = (id) => {
  navigateTo(`/budget/${id}`);
};
</script>

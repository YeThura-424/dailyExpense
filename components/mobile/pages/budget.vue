<template>
  <div class="bg-[#7F3DFF]">
    <div class="budget-month-carousel bg-[#7F3DFF] text-white px-3 pt-8 pb-12">
      <Carousel
        ref="budgetCarousel"
        @slide-start="handleSlideStart"
        @slide-registered=""
      >
        <Slide v-for="month in months" :key="month">
          <div class="carousel__item text-lg">{{ month }}</div>
        </Slide>

        <template #addons>
          <Navigation class="budget-carousel" />
        </template>
      </Carousel>
    </div>
    <div
      class="px-4 pt-4 budget-list pb-[58px] rounded-t-[40px] bg-[#eee] relative overflow-auto"
    >
      {{ budgets.value }}
      <MobileBudgetEmptyState v-if="false" />
      <!-- budget listing  -->
      <div class="budget-listing" v-if="budgets.length">
        <ClientOnly>
          <MobileBudgetListingCard :budgets="budgets" />
        </ClientOnly>
      </div>
      <div
        v-else
        class="flex flex-col gap-5 justify-center items-center w-full h-full overflow-hidden"
      >
        <div
          class="w-[300px] h-[300px] overflow-hidden"
          style="border-radius: 37% 52% 0% 38%; border: 2px solid transparent"
        >
          <IconNoBudget />
        </div>
        <h1 class="font-500 text-gray-600 text-xl capitalize">
          no budget for this month
        </h1>
      </div>
      <div
        class="budget-create fixed bottom-[70px] w-[95%] left-1/2 -translate-x-1/2"
      >
        <nuxt-link to="/budget/create">
          <button
            type="button"
            class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
          >
            <Icon
              name="ion:ios-create"
              class="text-white text-2xl cursor-pointer"
            />
            Create a budget
          </button>
        </nuxt-link>
      </div>
    </div>
    <!-- <MobileMainNav /> -->
  </div>
</template>
<script setup>
import { useBudgetStore } from "~/store/budget";

const months = [
  "January",
  "Febuary",
  "March",
  "Apirl",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "October",
  "November",
  "December",
];

const budgets = ref([]);
const currentSlideMonth = ref(null);

const budgetCarousel = ref(null);
const budgetStore = useBudgetStore();

const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getUTCFullYear();
onMounted(() => {
  if (budgetCarousel.value && budgetCarousel.value.slideTo) {
    budgetCarousel.value.slideTo(currentMonth);
  } else {
    console.error("slideTo method not found on the carousel instance.");
  }
});

const handleSlideStart = (month) => {
  currentSlideMonth.value = month.slidingToIndex;
  const currentMonthDate = getDateByMonth(currentSlideMonth.value);
  getBudgets(currentMonthDate);
};

const getBudgets = async (month) => {
  const result = await budgetStore.fetchBudget(month);

  if (result.success) {
    budgets.value = result.data;
  } else {
    useNuxtApp().$toast.error(result.error);
  }
};

getBudgets(currentMonth);
</script>

<style>
button.carousel__next.budget-carousel,
button.carousel__prev.budget-carousel {
  color: white !important;
}

.budget-list {
  height: calc(100vh - 204px);
}
</style>

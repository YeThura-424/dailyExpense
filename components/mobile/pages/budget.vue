<template>
  <div class="bg-[#7F3DFF]">
    <div class="budget-month-carousel bg-[#7F3DFF] text-white px-3 pt-8 pb-12">
      <Carousel ref="budgetCarousel">
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
      <MobileBudgetEmptyState v-if="false" />
      <!-- budget listing  -->
      <div class="budget-listing">
        <MobileBudgetListingCard :budgets="budgets" />
      </div>
      <div
        class="budget-create fixed bottom-[92px] w-[95%] left-1/2 -translate-x-1/2"
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

const budgets = [
  {
    category: "Shopping",
    limit: 1200,
    spent: 550,
  },
  {
    category: "Food",
    limit: 800,
    spent: 750,
  },
  {
    category: "Cosmetic",
    limit: 1500,
    spent: 1800,
  },
];

const budgetCarousel = ref(null);
onMounted(() => {
  const date = new Date();
  const currentMonth = date.getMonth();

  if (budgetCarousel.value && budgetCarousel.value.slideTo) {
    budgetCarousel.value.slideTo(currentMonth);
  } else {
    console.error("slideTo method not found on the carousel instance.");
  }
});
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

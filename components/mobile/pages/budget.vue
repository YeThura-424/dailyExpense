<template>
  <div class="bg-[#7F3DFF]">
    <div class="budget-month-carousel bg-[#7F3DFF] text-white px-3 pt-8 pb-12">
      <Carousel>
        <Slide v-for="month in months" :key="slide">
          <div class="carousel__item text-lg">{{ month }}</div>
        </Slide>

        <template #addons>
          <Navigation class="budget-carousel" />
        </template>
      </Carousel>
    </div>
    <div class="budget-list rounded-t-[40px] bg-[#eee] relative">
      <MobileBudgetEmptyState v-if="true" />
      <div
        class="budget-create absolute bottom-10 w-[95%] left-1/2 -translate-x-1/2"
      >
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
      </div>
    </div>
    <MobileMainNav />
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
</script>

<style>
button.carousel__next.budget-carousel,
button.carousel__prev.budget-carousel {
  color: white !important;
}

.budget-list {
  height: calc(100vh - 164px);
}
</style>

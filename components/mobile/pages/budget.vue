<template>
  <div class="min-h-screen">
    <div class="budget-month-carousel bg-[#7F3DFF] text-white px-3 pt-8 pb-12">
      <Carousel>
        <Slide v-for="month in months" :key="slide">
          <div class="carousel__item">{{ month }}</div>
        </Slide>

        <template #addons>
          <Navigation class="budget-carousel" />
        </template>
      </Carousel>
    </div>
    <div class="budget-list"></div>
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
</style>

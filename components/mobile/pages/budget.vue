<template>
  <div>
    <div class="budget-month-carousel bg-[#7F3DFF] text-white px-3 py-4">
      <Carousel>
        <Slide v-for="month in months" :key="slide">
          <div class="carousel__item">{{ month }}</div>
        </Slide>

        <template #addons>
          <Navigation class="budget-carousel" />
        </template>
      </Carousel>
    </div>
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

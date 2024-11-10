<template>
  <div v-for="data in cards" :key="data"
    class="flex justify-between items-center gap-x-6 bg-[#FCFCFC] p-4 rounded-lg mt-2">
    <div class="transaction_type w-3/4 flex gap-x-4">
      <div :class="[
        'transaction_list_icon w-1/3 h-14 hide-text rounded-md',
      ]">

      </div>
      <div class="transaction_list_desctiption w-3/4">
        <h1 class="h-7 hide-text rounded mb-2">

        </h1>
        <p class="h-5 hide-text rounded"></p>
      </div>
    </div>
    <div class="transaction_list_amount w-1/4 text-right">
      <h1 class="h-7 hide-text rounded mb-2">

      </h1>
      <p class="h-5 hide-text rounded"></p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cards: {
    type: Number,
    default: 3
  }
})
</script>
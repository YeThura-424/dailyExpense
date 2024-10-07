<template>
  <div>
        <VueDatePicker v-model="date" />
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref(null);
</script>
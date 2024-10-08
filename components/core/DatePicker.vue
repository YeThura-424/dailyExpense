<template>
  <div class="date-picker-wrapper">
        <VueDatePicker v-model="date" />
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref(null);
</script>

<style>
.dp__input{
  height: 56px;
  padding: 0;
  margin: 0;
  border: 1px solid #91919f;
  border-radius: 0.75rem;
}

.dp__input_icons{
  font-size: 34px;
  width: 25px;
  height: 25px;
}
</style>
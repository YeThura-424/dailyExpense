<template>
  <div class="date-picker-wrapper">
        <VueDatePicker 
          ref="datepicker"
          v-model="date" 
          :enable-time-picker="false" 
          :max-date="new Date()"
          @date-update="dateClicked"
        />
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['update:modelValue']);
const date = ref(new Date());
const datepicker = ref(null);
const dateClicked = (date) => {
  console.log('clicked', date)
  // datepicker.value.closeMenu();
}

watch(() => date.value, (newDate) => {
  emit('update:modelValue', newDate);
})

emit('update:modelValue', date.value);
</script>

<style>
.dp__input{
  height: 56px;
  font-size: 20px;
  color: #9ca3b7;
  border: 1px solid #91919f;
  border-radius: 0.75rem;
}

.dp__input_icons{
  font-size: 34px;
  width: 25px;
  height: 25px;
}
</style>
<template>
  <div class="date-picker-wrapper">
        <VueDatePicker 
          ref="datepicker"
          v-model="date" 
          auto-apply
          :enable-time-picker="false" 
          :format="format"
          :max-date="new Date()"
          @date-update="dateClicked"
           placeholder="Select Date"
        />
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['update:modelValue']);
const date = ref();
const datepicker = ref(null);

const dateClicked = (date) => {
  console.log('clicked', date)
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formatDate = `${day}-${month}-${year}`;
  emit('update:modelValue', formatDate);

}

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

</script>

<style>
.dp__input{
  height: 56px;
  font-size: 20px;
  /* margin-left: 15px; */
  color: #9ca3b7;
  border: 1px solid #91919f;
  border-radius: 0.75rem;
}

.dp__input_icon_pad {
  padding-inline-start: 45px;
}

.dp__input_icons{
  font-size: 34px;
  width: 25px;
  height: 25px;
}
</style>
<template>
  <div class="input-box-wrapper">
    <div class="input_label" v-if="showLabel">
      <label>{{ label }}</label>
    </div>
    <div class="input-box">
      <input type="text" :placeholder="placeholder" :class="inputClass" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "Label",
  },
  showLabel: {
    type: Boolean,
    default: false,
  },
  labelClass: {
    type: String,
    default: "",
  },
  inputClass: {
    type: String,
    default:
      "text-xl px-4 py-2 rounded-lg h-14 w-full focus:outline-none border border-[#91919F]",
  },
  placeholder: {
    type: String,
    default: "Please Type Something...",
  },
});
</script>

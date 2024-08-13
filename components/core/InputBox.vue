<template>
  <div class="input-box-wrapper py-4">
    <div class="input_label py-2" v-if="showLabel">
      <label class="text-xl font-medium">{{ label }}</label>
    </div>
    <div class="input-box">
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :class="inputClass"
        @input="updateValue"
      />
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
  type: {
    type: String,
    default: "text",
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
const emit = defineEmits("update:v-model");
const inputValue = ref(null);

const updateValue = () => {
  emit("update:v-model", inputValue.value);
};
</script>

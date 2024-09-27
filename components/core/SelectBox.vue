<template>
  <div class="select-wrapper">
    <select
      @input="updateValue"
      :value="modelValue"
      :name="name"
      :id="name"
      class="text-xl px-4 py-2 rounded-xl h-14 w-full focus:outline-none border border-[#91919F]"
    >
      <option selected="selected" disabled >{{ placeholder }}</option>
      <option
        v-for="list in option"
        :key="list.id"
        :value="list.id"
        class="w-full"
      >
        {{ toTitleCase(list.name) }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Please Select....",
  },
  option: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

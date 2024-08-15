<template>
  <div class="select-wrapper py-4">
    <select
      v-model="selectValue"
      :name="name"
      :id="name"
      class="text-xl px-4 py-2 rounded-xl h-14 w-full focus:outline-none border border-[#91919F]"
    >
      <option selected disabled>{{ placeholder }}</option>
      <option
        v-for="list in option"
        :key="list.value"
        :value="list.value"
        class="w-full"
      >
        {{ list.name }}
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
});

const selectValue = ref(props.placeholder);
</script>

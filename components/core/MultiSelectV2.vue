<template>
  <CoreSelectBox :options="options" :multiple="multiple" :model-value="modelValue" placeholder="Search and select categories" name="Categories" @update:model-value="$emit('update:modelValue', $event)" />
</template>
<script setup>
defineProps({ options: { type: Array, default: () => [] }, multiple: { type: Boolean, default: false }, modelValue: { type: [Array, Object, String, Number], default: () => [] } });
defineEmits(['update:modelValue']);
</script>

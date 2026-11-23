<template>
  <header :class="['page-heading', textColor, bgColor, { 'page-heading-shadow': boxShadow }]">
    <button v-if="showBack" type="button" :class="['page-back', iconColor]" aria-label="Go back" @click="$emit('back')"><Icon name="ion:arrow-back-outline" /></button>
    <h1>{{ title }}</h1>
    <button v-if="showDelete" type="button" :class="['page-delete', iconColor]" aria-label="Delete" @click="$emit('delete')"><Icon name="ion:trash-outline" /></button>
  </header>
</template>
<script setup>
defineProps({
  title: { type: String, required: true },
  textColor: { type: String, default: 'text-white' },
  iconColor: { type: String, default: 'text-[#7F3DFF]' },
  showDelete: { type: [Boolean, String], default: false },
  showBack: { type: Boolean, default: true },
  boxShadow: { type: Boolean, default: false },
  bgColor: { type: String, default: '' },
});
defineEmits(['back', 'delete']);
</script>

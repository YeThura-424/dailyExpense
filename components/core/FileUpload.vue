<template>
  <div
    class="attachment_inpu border border-dashed border-[#91919F] flex items-center justify-center py-3 rounded-xl"
  >
    <Icon
      name="ion:ios-attach"
      size="30"
      class="text-[#91919F] -rotate-[135deg]"
    />
    <span class="text-[#91919F] text-lg">Add attachment</span>
    <input id="file-upload" type="file" class=" absolute opacity-0"
  </div>
</template>

<script setup>
const props = defineProps({
  showPreview: {
    type: Boolean,
    default: true,
  },
});
const files = ref(null);
</script>

<style scoped>
input#file-upload button {
  display: none;
}
</style>

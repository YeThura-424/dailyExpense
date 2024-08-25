<template>
  <div class="upload-wrapper border border-[#91919F]">
    <div
      class="attachment_inpu border border-dashed border-[#91919F] flex flex-col items-center justify-center py-3 rounded-xl"
    >
      <Icon
        name="ion:ios-attach"
        size="30"
        class="text-[#91919F] -rotate-[135deg]"
      />
      <span class="text-[#91919F] text-lg">Add attachment</span>
      <input
        id="file-upload"
        type="file"
        class="absolute opacity-0"
        @change="handleUpload"
      />
    </div>
    <div class="preview-wrapper">
      <div class="preview">
        <img :src="previewUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showPreview: {
    type: Boolean,
    default: true,
  },
});
const uploadFiles = ref(null);
const previewUrl = ref(null);
const handleUpload = (e) => {
  console.log("uploaded", e.target.files);
  uploadFiles.value = e.target.files;
  previewUrl.value = URL.createObjectURL(uploadFiles.value[0]);
};
</script>

<style scoped>
input#file-upload button {
  display: none;
}
</style>

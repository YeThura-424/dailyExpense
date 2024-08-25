<template>
  <div
    :class="[
      'upload-wrapper border border-[#91919F] h-40 rounded-xl p-3 flex',
      previewUrl ? 'justify-start gap-3' : 'justify-center items-center',
    ]"
  >
    <div class="preview-wrapper" v-if="previewUrl">
      <div
        class="preview relative w-24 h-24 border border-dashed border-[#91919F] rounded-xl"
      >
        <img :src="previewUrl" alt="" class="w-24 h-24 rounded-xl p-1" />
        <Icon
          name="ion:ios-close-circle"
          class="text-[#666666] absolute top-0 right-0 cursor-pointer"
          size="24"
        />
      </div>
    </div>
    <div
      class="attachment_input w-24 h-24 border border-dashed border-[#91919F] flex flex-col items-center justify-center rounded-xl"
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

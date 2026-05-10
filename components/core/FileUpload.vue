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
          v-if="multiple"
          name="ion:ios-close-circle"
          class="text-[#666666] absolute top-0 right-0 cursor-pointer"
          size="24"
          @click="handleRemove"
        />
      </div>
    </div>
    <div
      v-if="previewUrl"
      class="attachment_input relative w-24 h-24 border border-dashed border-[#91919F] flex flex-col items-center justify-center rounded-xl"
    >
      <Icon name="ion:ios-plus-outline" size="50" class="text-[#91919F]" />
      <input
        id="file-upload"
        type="file"
        class="absolute opacity-0 w-full h-full"
        @change="handleUpload"
      />
    </div>

    <div
      v-if="!previewUrl"
      class="attachment_input relative w-32 h-32 border border-dashed border-[#91919F] flex flex-col items-center justify-center rounded-xl"
    >
      <Icon
        name="ion:ios-attach"
        size="30"
        class="text-[#91919F] -rotate-[135deg]"
      />
      <span class="text-[#91919F] text-lg text-center">Add Attachment</span>
      <input
        id="file-upload"
        type="file"
        class="absolute opacity-0 w-full h-full"
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
  modelValue: {
    type: String || Object,
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

const uploadFiles = ref([]);
const previewUrl = ref(props.modelValue);
const handleUpload = (e) => {
  console.log("uploaded", e.target.files);
  uploadFiles.value = e.target.files;
  emit("update:modelValue", uploadFiles.value);
  previewUrl.value = URL.createObjectURL(uploadFiles.value[0]);
};

const handleRemove = () => {
  previewUrl.value = null;
  uploadFiles.value = null;
  emit("update:modelValue", uploadFiles.value);
};
</script>

<style scoped>
input#file-upload button {
  display: none;
}
</style>

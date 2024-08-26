<template>
  <div :class="['expense_header flex pt-3 relative', textColor]">
    <div class="back_icon absolute" @click="backAction">
      <Icon
        name="ion:arrow-back-circle-sharp"
        class="text-3xl cursor-pointer"
      />
    </div>
    <div class="expense w-full">
      <p class="text-center text-xl font-bold">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    default: "text-white",
  },
});
const router = useRouter();

const backAction = () => {
  router.back();
};
</script>

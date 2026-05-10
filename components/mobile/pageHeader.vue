<template>
  <div
    :class="[
      'expense_header flex p-3 relative ',
      boxShadow ? 'shadow-md' : '',
      bgColor,
    ]"
  >
    <div v-if="showBack" class="back_icon absolute" @click="backAction">
      <Icon
        name="ion:arrow-back-circle-sharp"
        :class="['text-3xl cursor-pointer', iconColor]"
      />
    </div>
    <div :class="['expense w-full', textColor]">
      <p class="text-center text-xl font-bold">{{ title }}</p>
    </div>

    <div
      class="back_icon absolute right-0"
      v-if="showDelete"
      @click="deleteAction"
    >
      <Icon
        name="ion:trash-sharp"
        :class="['text-3xl cursor-pointer', iconColor]"
      />
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
  iconColor: {
    type: String,
    default: "text-[#7F3DFF]",
  },
  showDelete: {
    type: Boolean,
    default: false,
  },
  showBack: {
    type: Boolean,
    default: true,
  },
  boxShadow: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["back", "delete"]);

const backAction = () => {
  emit("back");
};

const deleteAction = () => {
  emit("delete");
};
</script>

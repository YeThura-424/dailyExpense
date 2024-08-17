<template>
  <div class="main-wrapper">
    <div class="bg-[#FD3C4A] p-3">
      <div class="header flex justify-between items-center">
        <div class="back_icon" @click="backAction">
          <Icon
            name="ion:arrow-back-circle-sharp"
            class="text-white text-3xl cursor-pointer"
          />
        </div>
        <div class="expense w-full">
          <p class="text-center text-white text-xl font-bold">Expense Detail</p>
        </div>
        <div class="back_icon" @click="deleteAction">
          <Icon
            name="ion:trash-sharp"
            class="text-white text-3xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const router = useRouter();
const route = useRoute();

const backAction = () => {
  router.back();
};

const deleteAction = () => {
  console.log("delete action");
};
</script>

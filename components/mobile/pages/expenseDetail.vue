<template>
  <div class="main-wrapper">
    <div class="bg-[#FD3C4A] p-3 rounded-b-[40px]">
      <div class="main-header flex justify-between items-center">
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
      <div class="main-body text-center text-white pt-20 pb-4">
        <h1 class="amount font-extrabold text-5xl py-2">$120</h1>
        <p class="text-base py-2">Sunday 4 June 2024 16:20</p>
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

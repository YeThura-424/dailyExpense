<template>
  <div class="main-wrapper">
    <div class="bg-[#FD3C4A] p-3 rounded-b-[40px] relative">
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
      <div class="main-body text-center text-white pt-20 pb-8">
        <h1 class="amount font-extrabold text-5xl py-2">$120</h1>
        <p class="text-base py-2">Sunday 4 June 2024 16:20</p>
      </div>
      <div
        class="expense-type-wrapper flex justify-between shadow-md bg-white rounded-lg py-4 px-6 absolute left-1/2 -translate-x-1/2 w-[90%] -bottom-12"
      >
        <div class="type text-center">
          <p class="text-lg text-[#91919F]">Type</p>
          <h1 class="text-xl text-[#0D0E0F] font-semibold">Expense</h1>
        </div>
        <div class="category text-center">
          <p class="text-lg text-[#91919F]">Category</p>
          <h1 class="text-xl text-[#0D0E0F] font-semibold">Shopping</h1>
        </div>
        <div class="wallet text-center">
          <p class="text-lg text-[#91919F]">Wallet</p>
          <h1 class="text-xl text-[#0D0E0F] font-semibold">Bank</h1>
        </div>
      </div>
    </div>

    <div class="mx-3 pt-16 border-b-2 border-dashed border-slate-300"></div>

    <div class="main-info px-4">
      <div class="description py-3">
        <h1 class="text-lg text-[#91919F] pb-2">Description</h1>
        <p class="text-xl text-[#0D0E0F] font-semibold text-justify">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
      </div>
      <div class="receipt py-3">
        <h1 class="text-lg text-[#91919F] pb-2">Receipt</h1>

        <img src="/images/receipt.png" alt="" />
      </div>
      <!-- <div class="fixed w-[92%] bottom-3 left-1/2 -translate-x-1/2"> -->
      <div class="pb-4">
        <button
          type="button"
          class="w-full flex items-center gap-x-2 justify-center rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          <Icon
            name="ion:arrow-up-left-box-outline"
            class="text-white text-2xl cursor-pointer"
          />
          Edit
        </button>
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

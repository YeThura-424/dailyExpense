<template>
  <div class="bg-[#FD3C4A]">
    <div class="expense_main_content px-6 py-4">
      <div class="expense_header flex pt-3">
        <div class="back_icon" @click="backAction">
          <Icon
            name="ion:arrow-back-circle-sharp"
            class="text-white text-3xl cursor-pointer"
          />
        </div>
        <div class="expense w-full">
          <p class="text-center text-white text-xl font-bold">Expense</p>
        </div>
      </div>
      <div class="expense_amount text-white pt-40">
        <span class="text-base">How Much ?</span>
        <div class="flex items-center">
          <span class="font-extrabold text-5xl">$</span>
          <input
            v-model="form.amount"
            type="text"
            class="bg-transparent focus:outline-none font-extrabold text-5xl px-2 w-2/3"
          />
        </div>
      </div>
    </div>
    <div class="expense_form bg-white rounded-t-[40px] shadow px-6 py-4">
      <CoreInputBox
        placeholder="Description"
        @update:v-model="setDescription"
      />
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const form = reactive({
  amount: 0,
  description: "",
});
const setDescription = (val) => {
  form.description = val;
};

const backAction = () => {
  router.back();
};
</script>

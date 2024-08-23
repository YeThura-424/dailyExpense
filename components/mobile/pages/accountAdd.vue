<template>
  <div class="bg-[#7F3DFF] flex flex-col justify-between h-screen">
    <div
      class="expense_main_content px-6 py-4 flex flex-col justify-between h-full"
    >
      <div class="expense_header flex pt-3">
        <div class="back_icon" @click="backAction">
          <Icon
            name="ion:arrow-back-circle-sharp"
            class="text-white text-3xl cursor-pointer"
          />
        </div>
        <div class="expense w-full">
          <p class="text-center text-white text-xl font-bold">
            Add new account
          </p>
        </div>
      </div>
      <div class="expense_amount text-white">
        <span class="text-lg">Balance</span>
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
      <div class="account_name">
        <CoreInputBox placeholder="Name" v-model="form.name" />
      </div>
      <div class="category_select py-3">
        <CoreSelectBox
          :option="category"
          name="Category"
          v-model="form.category"
        />
      </div>

      <div class="save-button gap-x-5 py-3">
        <button
          type="button"
          class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          <Icon
            name="ion:save-outline"
            class="text-white text-2xl cursor-pointer"
          />
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const form = reactive({
  amount: 0,
  category: "",
  name: "",
});

const backAction = () => {
  router.back();
};

const category = [
  { name: "Bank", value: 1 },
  { name: "Cash In Hand", value: 2 },
];
</script>

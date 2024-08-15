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
        <span class="text-lg">How Much ?</span>
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
      <div class="time-input-box">
        <CoreInputBox
          placeholder="Date"
          @update:v-model="setDescription"
          type="date"
        />
      </div>
      <div class="category_select py-2">
        <CoreSelectBox
          :option="category"
          name="Category"
          v-model="form.category"
        />
      </div>
      <div class="description_input py-2">
        <CoreInputBox
          placeholder="Description"
          @update:v-model="setDescription"
        />
      </div>
      <div class="wallet_select py-2">
        <CoreSelectBox :option="wallet" name="Wallet" v-model="form.wallet" />
      </div>
      <div class="save-button">
        <button
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-3.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const form = reactive({
  amount: 0,
  description: "",
  category: "",
  wallet: "",
});
const setDescription = (val) => {
  form.description = val;
};

const backAction = () => {
  router.back();
};

const category = [
  { name: "Category1", value: 1 },
  { name: "Category2", value: 2 },
  { name: "Category3", value: 3 },
  { name: "Category4", value: 4 },
  { name: "Category5", value: 5 },
  { name: "Category6", value: 6 },
];

const wallet = [
  { name: "Wallet 1", value: 1 },
  { name: "Wallet 2", value: 2 },
  { name: "Wallet 3", value: 3 },
  { name: "Wallet 4", value: 4 },
  { name: "Wallet 5", value: 5 },
  { name: "Wallet 6", value: 6 },
];
</script>

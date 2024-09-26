<template>
  <div class="bg-[#FD3C4A]">
    <div class="expense_main_content px-6 py-4">
      <div class="expense_header">
        <MobilePageHeader title="Expense" icon-color="text-white" @back="backAction" />
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

      <div class="repeat-transaction flex justify-between items-center py-3">
        <div class="text">
          <h1 class="text-xl font-semibold text-[#292B2D]">Repeat</h1>
          <p class="text-sm text-[#91919F]">Repeat transaction</p>
        </div>
        <div class="toggle">
          <Switch v-model="form.repeat" as="template" v-slot="{ checked }">
            <button
              class="relative inline-flex h-6 w-11 items-center rounded-full"
              :class="checked ? 'bg-[#7F3DFF]' : 'bg-gray-200'"
            >
              <span class="sr-only">Enable notifications</span>
              <span
                :class="checked ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              />
            </button>
          </Switch>
        </div>
      </div>
      <div class="save-button flex justify-end gap-x-5">
        <button
          type="button"
          class="w-fit flex items-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          <Icon
            name="ion:save-outline"
            class="text-white text-2xl cursor-pointer"
          />
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Switch } from "@headlessui/vue";

const router = useRouter();
const form = reactive({
  amount: 0,
  description: "",
  category: "",
  wallet: "",
  repeat: false,
});
const setDescription = (val) => {
  form.description = val;
};

const backAction = () => {
  // router.back();
  navigateTo('/#add')
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

<template>
  <div class="bg-[#0077FF] flex flex-col justify-between h-screen">
    <div
      class="budget_main_content px-6 py-4 flex flex-col justify-between h-full"
    >
      <div class="budget_header">
        <MobilePageHeader
          title="Transfer"
          icon-color="text-white"
          @back="backAction"
        />
      </div>
      <div class="budget_amount text-white">
        <span class="text-lg">How much do you want to transfer ?</span>
        <div class="flex items-center">
          <span class="font-extrabold text-5xl">{{ getCurrency() }}</span>
          <input
            v-model="form.total"
            type="text"
            class="bg-transparent focus:outline-none font-extrabold text-5xl px-2 w-2/3"
          />
        </div>
      </div>
    </div>
    <div class="transfer_form bg-white rounded-t-[40px] shadow px-6 py-4">
      <div class="from-wallet py-3">
        <CoreSelectBox
          :options="typeCategories"
          option-key="id"
          name="Category"
          placeholder="From Wallet"
          v-model="form.categoryId"
        />
      </div>

      <div class="to-wallet py-3">
        <CoreSelectBox
          :options="typeCategories"
          option-key="id"
          name="Category"
          placeholder="To Wallet"
          v-model="form.categoryId"
        />
      </div>

      <div class="description_input py-2">
        <CoreInputBox placeholder="Description" v-model="form.description" />
      </div>

      <div class="save-button flex justify-end gap-x-5 py-3">
        <button
          type="button"
          @click="submit"
          class="w-full flex items-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
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
import { Switch } from "@headlessui/vue";
import { useBudgetStore } from "~/store/budget";
import { useCategoryStore } from "~/store/category";

const form = reactive({
  total: 0,
  categoryId: "",
  alert: false,
});
const budgetLoading = ref(false);
const budgetStore = useBudgetStore();
const categoryStore = useCategoryStore();
const { typeCategories } = storeToRefs(categoryStore);

const backAction = () => {
  navigateTo("/budget");
};

const fetchCategory = async () => {
  await categoryStore.fetchCategoryWithType("expense");
};

const submit = async () => {
  console.log("d nar mar");
  budgetLoading.value = true;
  const result = await budgetStore.createBudget(form);
  console.log("result herer", result);
  if (result.success) {
    useNuxtApp().$toast.success("Budget Created Successfully!!");
    navigateTo("/budget");
  } else {
    budgetLoading.value = false;
    useNuxtApp().$toast.error(result.error);
  }
};
fetchCategory();
</script>

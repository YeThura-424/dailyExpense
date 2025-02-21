<template>
  <div class="bg-[#7F3DFF] flex flex-col justify-between h-screen">
    <div
      class="budget_main_content px-6 py-4 flex flex-col justify-between h-full"
    >
      <div class="budget_header">
        <MobilePageHeader
          title="Create Budget"
          icon-color="text-white"
          @back="backAction"
        />
      </div>
      <div class="budget_amount text-white">
        <span class="text-lg">How much do you want to spend ?</span>
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
    <div class="budget_form bg-white rounded-t-[40px] shadow px-6 py-4">
      <div class="budget_title">
        <CoreInputBox placeholder="Title" v-model="form.title" />
      </div>
      <div class="category_select py-3">
        <CoreMultiSelectV2
          v-model="form.category"
          :options="budgetCategory"
          multiple
        />
      </div>

      <div class="budget-alert flex justify-between items-center py-3">
        <div class="text">
          <h1 class="text-xl font-semibold text-[#292B2D]">Receive Alert</h1>
          <p class="text-sm text-[#91919F]">
            Receive alert when it reaches some point
          </p>
        </div>
        <div class="toggle">
          <Switch v-model="form.alert" as="template" v-slot="{ checked }">
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
      <div v-if="form.alert" class="budget-alert-percentage-bar">
        <CoreRangeSlider v-model="form.alertPercent" />
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
  title: "",
  total: 0,
  category: "",
  alert: false,
  alertPercent: 0,
});
const budgetLoading = ref(false);
const budgetStore = useBudgetStore();
const categoryStore = useCategoryStore();
const { budgetCategory } = storeToRefs(categoryStore);

const backAction = () => {
  navigateTo("/budget");
};

const fetchCategory = async () => {
  await categoryStore.categoryForBudget();
};

const submit = async () => {
  budgetLoading.value = true;
  if (form.category.length <= 0) {
    useNuxtApp().$toast.error("Please choose at least one category");
    return false;
  }

  if (form.alert && form.alertPercent < 0) {
    useNuxtApp().$toast.error("Please set alert percent!!");
    return false;
  }
  const result = await budgetStore.createBudgetV2(form);
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

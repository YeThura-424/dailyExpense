<template>
  <div class="loading-wrapper" v-if="loading">
    <MobileLoadingDots />
  </div>
  <div class="bg-[#7F3DFF] flex flex-col justify-between h-screen">
    <div
      class="expense_main_content px-6 py-4 flex flex-col justify-between h-full"
    >
      <MobilePageHeader
        title="Add New Category"
        icon-color="text-white"
        @back="backAction"
      />
    </div>
    <div
      v-if="!categoryDetailLoading"
      class="expense_form bg-white rounded-t-[40px] shadow px-6 py-4"
    >
      <div class="account_name">
        <CoreInputBox placeholder="Name" v-model="form.name" />
      </div>
      <div class="category-type py-4">
        <CoreSelectBox
          :options="categoryTypes"
          name="Category"
          option-key="value"
          v-model="form.type"
        />
        <!-- <CoreMultiSelectV2/> -->
      </div>

      <div class="save-button gap-x-5 py-3">
        <button
          type="button"
          @click="updateCategory"
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
import { useCategoryStore } from "~/store/category";

const categoryTypes = ref([
  {
    name: "Income",
    value: "income",
  },
  {
    name: "Expense",
    value: "expense",
  },
]);
const categoryDetailLoading = ref(true);
const { categoryDetail, updateCategory: saveCategory } = useCategoryStore();

const form = reactive({
  id: "",
  type: "",
  name: "",
});
const route = useRoute();
const categoryId = route.params.id;

const loading = ref(false);

const backAction = () => {
  navigateTo("/category");
};

const getCategoryDetail = async () => {
  categoryDetailLoading.value = true;

  const result = await categoryDetail(categoryId);

  if (result.success) {
    form.name = result.data.name;
    form.type = result.data.type;
    form.id = result.data.id;

    categoryDetailLoading.value = false;
  } else {
    categoryDetailLoading.value = false;
    useNuxtApp().$toast.error(
      result.message || "Error Fetching Category Detial..."
    );
  }
};

const updateCategory = async () => {
  loading.value = true;
  const result = await saveCategory(form);
  loading.value = false;
  if (result.success) {
    return navigateTo('/category');
  }
  useNuxtApp().$toast.error(result.error);
};

getCategoryDetail();
</script>

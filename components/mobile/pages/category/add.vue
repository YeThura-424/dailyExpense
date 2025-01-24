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
    <div class="expense_form bg-white rounded-t-[40px] shadow px-6 py-4">
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
      <div class="category_attachment py-3">
        <CoreFileUpload v-model="form.icon" />
      </div>

      <div class="save-button gap-x-5 py-3">
        <button
          type="button"
          @click="saveCategory"
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
    name: "Expend",
    value: "expend",
  },
]);

const { storeCategory } = useCategoryStore();
const router = useRouter();

const form = reactive({
  type: "",
  icon: null,
  name: "",
});

const loading = ref(false);

const backAction = () => {
  navigateTo("/category");
};

const saveCategory = async () => {
  const result = await storeCategory(form);
  console.log(result);
  if (result.success) {
    useNuxtApp().$toast.success("Category Created Successfully");
    router.push("/category");
  } else {
    useNuxtApp().$toast.error(result.error);
  }
};

const transform = (form) => {
  let formData = new FormData();
  formData.append("name", form.name);
  formData.append("type", form.type);
  formData.append("icon", form.categoryImage[0]);

  return formData;
};
</script>

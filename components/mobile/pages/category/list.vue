<template>
  <div class="">
    <div class="category_content pb-4">
      <div class="category_header px-4">
        <MobilePageHeader
          title="Category List"
          text-color="text-black"
          @back="backAction"
        />
      </div>
      <div v-if="loading" class="category-loading px-2">
        <div v-for="data in 6" :key="data" class="bg-white my-2">
          <MobileLoadingCategoryListing />
        </div>
      </div>
      <div v-else class="category-list-wrapper bg-white">
        <!-- category listing  -->
        <div v-if="categories.length > 0">
          <div
            v-for="category in categories"
            :key="category.id"
            class="category-section flex items-center justify-between border-b border-[#eee] px-4 py-4"
          >
            <div class="flex items-center gap-x-3">
              <div
                class="category-logo w-14 h-14 rounded-2xl flex justify-center items-center"
              >
                <IconHomeExpense
                  v-if="category.type == 'expense'"
                  fill="#FDD5D7"
                />
                <IconHomeIncome v-else fill="#CFFAEA" />
              </div>
              <div>
                <h1 class="text-[#292B2D] text-xl font-medium">
                  {{ category.name }}
                </h1>
                <p class="capitalize font-normal text-sm text-[#464545]">
                  {{ category.type }}
                </p>
              </div>
            </div>
            <div class="profile-info-edit">
              <NuxtLink :to="`/category/${category.id}`">
                <Icon
                  name="ion:edit"
                  class="text-3xl text-[#212325] cursor-pointer"
                />
              </NuxtLink>
            </div>
          </div>
        </div>

        <div
          v-else
          class="empty_account_state flex items-center"
          style="height: calc(100vh - 150px)"
        >
          <div class="text-center">
            <p class="text-base font-medium">You don't any category</p>
            <p class="text-base font-medium">
              Let's make one so you can group transactions well !!
            </p>
          </div>
        </div>

        <div
          class="category-create fixed bottom-3 w-[95%] left-1/2 -translate-x-1/2"
        >
          <nuxt-link to="/category/add">
            <button
              type="button"
              class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
            >
              <Icon
                name="ion:ios-create"
                class="text-white text-2xl cursor-pointer"
              />
              Create new Category
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from "~/store/category";

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);
const loading = ref(true);

const backAction = () => {
  navigateTo("/profile");
};
const getCategory = async () => {
  loading.value = true;
  await categoryStore.fetchCategories();
  loading.value = false;
};
getCategory();
</script>

<style>
.category-list-wrapper.bg-white {
  max-height: calc(100vh - 130px);
  overflow-x: auto;
}
</style>

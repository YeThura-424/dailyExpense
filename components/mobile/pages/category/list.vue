<template>
  <div class="">
    <div class="category_content py-4">
      <div class="category_header px-4 pb-6">
        <MobilePageHeader title="Category List" text-color="text-black" />
      </div>
      <div class="category-list-wrapper bg-white">
        <!-- category listing  -->
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-section flex items-center justify-between border-b border-[#eee] px-4 py-4"
        >
          <div class="flex items-center gap-x-3">
            <div
              class="category-logo w-14 h-14 bg-[#EEE5FF] rounded-2xl flex justify-center items-center"
            >
              <img
                class="w-12 h-12 object-cover"
                :src="category.image"
                alt=""
              />
            </div>
            <h1 class="text-[#292B2D] text-xl font-medium">
              {{ category.name }}
            </h1>
          </div>
          <div class="profile-info-edit">
            <Icon
              name="ion:edit"
              class="text-3xl text-[#212325] cursor-pointer"
            />
          </div>
        </div>

        <div v-if="false" class="empty_account_state">
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

const category = useCategory();
const loading = ref(true);
const getCategory = async () => {
  loading.value = true;
  try {
    await category.getCategories();
    loading.value = false;
  } catch (error) {
    console.log(error)
  }
}
getCategory();

const categories = [
  { id: 1, name: "Food", image: "/images/food.png" },
  { id: 2, name: "Grocery", image: "/images/grocery.png" },
  { id: 3, name: "Medical", image: "/images/medical.png" },
  { id: 4, name: "Salary", image: "/images/salary.png" },
  { id: 5, name: "Transprotation", image: "/images/transportation.png" },
];
</script>

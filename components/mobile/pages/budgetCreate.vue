<template>
  <div class="bg-[#7F3DFF] flex flex-col justify-between h-screen">
    <div class="budget_main_content px-6 py-4 flex flex-col justify-between h-full">
      <div class="budget_header pt-3">
        <MobilePageHeader title="Create Budget" icon-color="text-white" @back="backAction" />
      </div>
      <div class="budget_amount text-white">
        <span class="text-lg">How much do you want to spend ?</span>
        <div class="flex items-center">
          <span class="font-extrabold text-5xl">$</span>
          <input v-model="form.total" type="text"
            class="bg-transparent focus:outline-none font-extrabold text-5xl px-2 w-2/3" />
        </div>
      </div>
    </div>
    <div class="budget_form bg-white rounded-t-[40px] shadow px-6 py-4">
      <div class="category_select py-3">
        <CoreSelectBox :options="categories" option-key="id" name="Category" placeholder="Select Category"
          v-model="form.category_id" />
      </div>

      <div class="repeat-transaction flex justify-between items-center py-3">
        <div class="text">
          <h1 class="text-xl font-semibold text-[#292B2D]">Receive Alert</h1>
          <p class="text-sm text-[#91919F]">
            Receive alert when it reaches some point
          </p>
        </div>
        <div class="toggle">
          <Switch v-model="form.alert" as="template" v-slot="{ checked }">
            <button class="relative inline-flex h-6 w-11 items-center rounded-full"
              :class="checked ? 'bg-[#7F3DFF]' : 'bg-gray-200'">
              <span class="sr-only">Enable notifications</span>
              <span :class="checked ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
            </button>
          </Switch>
        </div>
      </div>
      <div class="save-button flex justify-end gap-x-5 py-3">
        <button type="button" @click="submit"
          class="w-full flex items-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer">
          <Icon name="ion:save-outline" class="text-white text-2xl cursor-pointer" />
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Switch } from "@headlessui/vue";

const form = reactive({
  total: 0,
  category_id: "",
  alert: false,
});
const budgetLoading = ref(false);
const errors = ref(null);

const backAction = () => {
  navigateTo('/budget');
}

const categories = ref([]);

const fetchCategory = async () => {
  try {
    await useFetch("/api/category", {
      method: "GET",
      params: {
        type: 'expend'
      },
      transform: (response) => {
        // console.log(response, 'budget category');
        categories.value = response.data?.data;
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const submit = async () => {
  try {
    const { data, error } = await $fetch('/api/budget/store', {
      method: "POST",
      body: form,
    });
    
    useNuxtApp().$toast.success('Budget Created Successful.');

    setTimeout(() => {
      navigateTo("/budget");
    }, 2000);

  } catch (error) {

    if (error.data && error.data.data && error.data.data.errors) {
      errors.value = error.data.data.errors;
      const errorMessages = Object.values(errors.value).flat();

      if (Array.isArray(errorMessages) && errorMessages.length > 0) {
        errorMessages.forEach((msg) => {
          useNuxtApp().$toast.error(msg);
        });
      } else {
        useNuxtApp().$toast.error('An unknown error occurred.');
      }

    }else if(error?.data?.data?.message){
      useNuxtApp().$toast.error(error?.data?.data?.message);
    } else {
      useNuxtApp().$toast.error('An unexpected error occurred.');
    }

  }
};


fetchCategory();

</script>

<template>
  <div class="bg-[#00A86B]">
    <div class="income_main_content px-6 py-4">
      <div class="income_header">
        <MobilePageHeader title="Income" icon-color="text-white" @back="backAction" />
      </div>
      <div class="income_amount text-white pt-36">
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
    <div class="income_form bg-white rounded-t-[40px] shadow px-6 py-4">
      <div class="time-input-box">
        <CoreInputBox
          placeholder="Date"
          @update:v-model="setDescription"
          type="date"
        />
      </div>
      <div class="category_select py-2">
        <CoreSelectBox
          :options="category"
          option-key="id"
          name="Category"
          placeholder="Select Category..."
          v-model="form.category_id"
        />
      </div>
      <div class="description_input py-2">
        <CoreInputBox
          placeholder="Description"
          v-model="form.description"
        />
      </div>
      <div class="wallet_select py-2">
        <CoreSelectBox :options="wallet" option-key="id" name="Wallet" v-model="form.wallet_id" placeholder="Select Category" />
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
      <div v-if="!incomeLoading" class="save-button flex justify-end gap-x-5">
        <button
          type="button"
          @click="saveIncome"
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
    <MobileLoadingDots v-if="incomeLoading"/>
  </div>
</template>

<script setup>
import { Switch } from "@headlessui/vue";

const form = reactive({
  amount: 0,
  description: "",
  category_id: "",
  wallet_id: "",
  repeat: false,
  type: "income"
});

const category = ref([]);
const wallet = ref([]);
const incomeLoading = ref(false);
onMounted( async() => {
  await fetchCategory();
  await fetchWallet();
})

const backAction = () => {
  navigateTo('/#add')
};

const fetchCategory = async() => {
  try {
    await useFetch("/api/category", {
      method: "GET",
      transform: (response) => {
        console.log(response, 'budget category');
        category.value = response.data?.data;
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const fetchWallet = async () => {
  try {
    await useFetch("/api/wallet/user-wallet", {
      method: "GET",
      transform: (response) => {
        wallet.value = response.data?.user_wallet
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const saveIncome = async () => {
  incomeLoading.value = true;
  try {
    useFetch("/api/income/create", {
      method: "POST",
      body: form
    })
    if (form.repeat) {
      resetForm();
      // push notification 
    } else {
      navigateTo('/transaction')
    }
  } catch (error) {
    console.log(error)
  } finally {
    incomeLoading.value = false;
  }
}
</script>

<template>
  <div class="bg-[#00A86B]"">
    <div class=" income_main_content px-6 py-4">
    <div class="income_header">
      <MobilePageHeader title="Income" icon-color="text-white" @back="backAction" />
    </div>
    <div class="income_amount text-white pt-40">
      <span class="text-lg">How Much ?</span>
      <div class="flex items-center">
        <span class="font-extrabold text-5xl"> {{ getCurrency() }} </span>
        <input v-model="form.amount" type="text"
          class="bg-transparent focus:outline-none font-extrabold text-5xl px-2 w-2/3" />
      </div>
    </div>
  </div>
  <div class="income_form bg-white rounded-t-[40px] shadow px-6 py-4">
    <div class="time-input-box py-2">
      <CoreDatePicker v-model="form.action_date" />
    </div>
    <div class="category_select py-2">
      <CoreSelectBox :options="typeCategories" show-budget option-key="id" name="Category" placeholder="Select Category"
        v-model="form.categoryId" />
    </div>
    <div class="description_input py-2">
      <CoreInputBox placeholder="Description" v-model="form.description" />
    </div>
    <div class="wallet_select py-2">
      <CoreSelectBox placeholder="Select Wallet" :options="wallet" show-amount name="Wallet" v-model="selectedWallet" />
    </div>

    <div class="repeat-transaction flex justify-between items-center py-3">
      <div class="text">
        <h1 class="text-xl font-semibold text-[#292B2D]">Repeat</h1>
        <p class="text-sm text-[#91919F]">Repeat transaction</p>
      </div>
      <div class="toggle">
        <Switch v-model="form.repeat" as="template" v-slot="{ checked }">
          <button class="relative inline-flex h-6 w-11 items-center rounded-full"
            :class="checked ? 'bg-[#7F3DFF]' : 'bg-gray-200'">
            <span class="sr-only">Enable notifications</span>
            <span :class="checked ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
          </button>
        </Switch>
      </div>
    </div>
    <div class="save-button flex justify-end gap-x-5">
      <button type="button" @click="updateIncome"
        class="w-fit flex items-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer">
        <Icon name="ion:save-outline" class="text-white text-2xl cursor-pointer" />
        Update
      </button>
    </div>
  </div>
  <MobileLoadingDots v-if="incomeLoading || initialLoading" />
  </div>
</template>

<script setup>
import { Switch } from "@headlessui/vue";
import { useCategoryStore } from "~/store/category";
import { usetransactionStore } from "~/store/transaction";
import { useWalletStore } from "~/store/wallet";

const router = useRouter();
const route = useRoute();
// not using directly as form.walletId because in save income method will need amount of wallet
const selectedWallet = ref([]);
const form = reactive({
  action_date: "",
  amount: 0,
  description: "",
  categoryId: "",
  walletId: "",
  repeat: false,
  type: "income",
});
const categoryStore = useCategoryStore();
const { typeCategories } = storeToRefs(categoryStore);
const { fetchWallets } = useWalletStore();
const { fetchTransactionDetail, updateTransaction } = usetransactionStore();
const incomeLoading = ref(false);
const initialLoading = ref(true);
const wallet = ref([]);
const incomeId = ref(route.params.id);

onMounted(async () => {
  await fetchCategory();
  await fetchWallet();
});

watch(
  () => selectedWallet.value,
  (newWallet) => {
    form.walletId = newWallet.id;
  }
);

const backAction = () => {
  router.back();
};

const resetForm = () => {
  form.action_date = "";
  form.amount = 0;
  form.description = "";
  form.repeat = false;
};

const fetchCategory = async () => {
  await categoryStore.fetchCategoryWithType("income");
};

const fetchWallet = async () => {
  const result = await fetchWallets();
  wallet.value = result.data;
};

const fetchIncome = async () => {
  initialLoading.value = true;
  const result = await fetchTransactionDetail(incomeId.value);
  initialLoading.value = false;
  if (result.success) {
    form.action_date = result?.data.action_date;
    form.amount = result?.data.amount;
    form.description = result?.data.description;
    form.categoryId = result?.data.categories.id;
    selectedWallet.value = result?.data.wallet;

  } else {
    useNuxtApp().$toast.error(result.error);
  }
}

const updateIncome = async () => {
  if (form.amount > selectedWallet.value.amount) {
    useNuxtApp().$toast.error(
      "Income amount cannot be greater than wallet amount!",
      {
        pauseOnFocusLoss: false,
      }
    );
  } else {
    if (isNaN(new Date(form.action_date))) {
      useNuxtApp().$toast.error("Invalid date format");
      return false;
    }

    if (form.amount <= 0) {
      useNuxtApp().$toast.error("Income Amount Must be greater than 0");
      return false;
    }

    const formattedDate = new Date(form.action_date)
      .toISOString()
      .split("T")[0];
    form.action_date = formattedDate;

    incomeLoading.value = true;
    const result = await updateTransaction(form, incomeId.value);

    console.log('logging the result', result)

    if (result.success) {
      incomeLoading.value = false;
      useNuxtApp().$toast.success(result.message);
      if (form.repeat) {
        resetForm();
      } else {
        router.push("/transaction");
      }
    } else {
      incomeLoading.value = false;
      resetForm();
      useNuxtApp().$toast.error(result.error);
    }
  }
};
fetchIncome();
fetchWallet();
fetchCategory();
</script>

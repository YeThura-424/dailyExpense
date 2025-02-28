<template>
  <div class="main-wrapper" v-if="expenseData">
    <div class="bg-[#FD3C4A] p-3 rounded-b-[40px] relative">
      <div class="main-header">
        <MobilePageHeader
          title="Expense Detail"
          icon-color="text-white"
          @back="backAction"
        />
      </div>
      <div class="main-body text-center text-white pt-20 pb-8">
        <h1 class="amount font-extrabold text-5xl py-2">
          {{ formatAmount(expenseData.amount) }}
        </h1>
        <p class="text-base py-2">
          {{ dateLocalString(expenseData.action_date) }}
        </p>
      </div>
      <div
        class="expense-type-wrapper shadow-md bg-white flex items-center gap-x-4 rounded-lg py-4 px-6 absolute left-1/2 -translate-x-1/2 w-[90%] -bottom-[73px]"
      >
        <div class="type text-end w-1/3">
          <p class="text-lg text-[#91919F]">Type :</p>
          <p class="text-lg text-[#91919F]">Category :</p>
          <p class="text-lg text-[#91919F]">Wallet :</p>
        </div>
        <div class="category text-start w-1/2">
          <h1 class="text-xl text-[#0D0E0F] font-semibold capitalize">
            {{ expenseData.type }}
          </h1>
          <h1 class="text-xl text-[#0D0E0F] font-semibold">
            {{ expenseData.categories.name }}
          </h1>
          <h1 class="text-xl text-[#0D0E0F] font-semibold">
            {{ expenseData.wallet.name }}
          </h1>
        </div>
      </div>
    </div>

    <div class="mx-3 pt-[85px] border-b-2 border-dashed border-slate-300"></div>

    <div class="main-info px-4">
      <div class="description py-3">
        <h1 class="text-lg text-[#91919F] pb-2">Description</h1>
        <p class="text-xl text-[#0D0E0F] font-semibold text-justify">
          {{ expenseData.description }}
        </p>
      </div>
      <div class="receipt py-3">
        <h1 class="text-lg text-[#91919F] pb-2">Receipt</h1>

        <img src="/images/receipt.png" alt="" />
      </div>

      <!-- <div class="pb-4">
        <button
          type="button"
          class="w-full flex items-center gap-x-2 justify-center rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          <Icon
            name="ion:arrow-up-left-box-outline"
            class="text-white text-2xl cursor-pointer"
          />
          Edit
        </button>
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { usetransactionStore } from "~/store/transaction";

const router = useRouter();
const route = useRoute();
const expenseId = route.params.id;
const expenseData = ref(null);
const transactionStore = usetransactionStore();
const backAction = () => {
  router.back();
};

const deleteAction = () => {
  console.log("delete action");
};

const fetchExpense = async () => {
  const result = await transactionStore.fetchTransactionDetail(expenseId);

  if (result.success) {
    expenseData.value = result?.data;
  } else {
    useNuxtApp().$toast.error(result.error);
    router.back();
  }
};

fetchExpense();
</script>

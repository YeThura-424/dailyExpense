<template>
  <div>
    <div class="px-4">
      <div class="flex justify-between items-center py-2">
        <!-- <CoreMonthSelect :months="transaction_type" /> -->
        <h1 class="text-[#212325] text-base font-medium">Filter</h1>
        <div class="filter-icon" @click="openFilterDialog">
          <IconFilter />
        </div>
      </div>
      <!-- see report section  -->
      <div
        class="transaction-section"
        style="height: calc(100vh - 120px); overflow: auto"
      >
        <div
          class="flex justify-between bg-[#ddd2f1] text-[#7F3DFF] p-3 mt-2 rounded-lg"
        >
          <h1 class="text-base font-normal">See your financial report</h1>
          <IconArrowRight />
        </div>

        <!-- transaction list  -->
        <div v-if="!transactionLoading" class="transaction_list_warpper">
          <div
            v-for="(transactions, key) in transactions"
            :key="key"
            class="py-2"
          >
            <h1 class="font-semibold text-lg">{{ dayToName(key) }}</h1>
            <div class="transaction_list pt-2">
              <CoreTransactionListCard :transactions="transactions" />
            </div>
          </div>
        </div>
        <div v-else class="transaction-loading-list">
          <MobileLoadingIncomeExpenseCard :cards="6" />
        </div>
      </div>
    </div>
    <CoreModelBox
      verticalAlign="items-end"
      :visible="openFilter"
      @dismiss="closeFilterDialog"
      @apply="applyFilter"
    >
      <div class="filter_content">
        <div class="filter-head flex justify-between items-center py-4">
          <h1>Filter Transaction</h1>
          <button
            @click="resetFilter"
            class="text-[#7F3DFF] bg-[#ddd2f1] px-4 py-2 rounded-[22px]"
          >
            Reset
          </button>
        </div>
        <div class="filter-body">
          <!-- filter by section  -->
          <RadioGroup v-model="form.filterBy">
            <RadioGroupLabel class="font-semibold">Filter By</RadioGroupLabel>
            <div class="grid grid-cols-3 gap-4 pt-3">
              <RadioGroupOption
                as="template"
                v-for="value in ['income', 'expend', 'transfer']"
                :value="value"
                v-slot="{ active, checked }"
              >
                <div
                  :class="[
                    active ? 'bg-[#EEE5FF] text-[#7F3DFF]' : '',
                    checked
                      ? 'bg-[#EEE5FF] text-[#7F3DFF] border border-[#7F3DFF]'
                      : 'bg-white border border-[#E3E5E5]',
                  ]"
                  class="cursor-pointer rounded-3xl px-3 py-2"
                >
                  <span class="capitalize">{{ value }}</span>
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>

          <!-- sort by section  -->
          <RadioGroup v-model="form.sortBy">
            <RadioGroupLabel class="font-semibold">Sort By</RadioGroupLabel>
            <div class="grid grid-cols-3 gap-4 pt-3">
              <RadioGroupOption
                as="template"
                v-for="value in ['highest', 'lowest', 'newest', 'oldest']"
                :value="value"
                v-slot="{ active, checked }"
              >
                <div
                  :class="[
                    active ? 'bg-[#EEE5FF] text-[#7F3DFF]' : '',
                    checked
                      ? 'bg-[#EEE5FF] text-[#7F3DFF] border border-[#7F3DFF]'
                      : 'bg-white border border-[#E3E5E5]',
                  ]"
                  class="cursor-pointer rounded-3xl px-3 py-2"
                >
                  <span class="capitalize">{{ value }}</span>
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>

          <!-- category selection here  -->
          <div>
            <h1>Category</h1>
            <CoreSelectBox
              v-model="form.category"
              :options="category"
              optionKey="id"
            />
          </div>
        </div>
      </div>
    </CoreModelBox>
  </div>
</template>

<script setup>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { useCategoryStore } from "~/store/category";
import { usetransactionStore } from "~/store/transaction";

const form = reactive({
  filterBy: "income",
  sortBy: "highest",
  category: "",
});
const category = ref([]);
const transactions = ref([]);
const openFilter = ref(false);
const transactionLoading = ref(true);
const transactionStore = usetransactionStore();
const categoryStore = useCategoryStore();

const openFilterDialog = () => {
  openFilter.value = true;
};

const closeFilterDialog = (value) => {
  openFilter.value = value;
};

const applyFilter = (value) => {
  openFilter.value = value;
  let page = 1;
  fetchTransaction(page, form);
};

const resetFilter = () => {
  (form.filterBy = "income"), (form.sortBy = "highest"), (form.category = "");
  fetchTransaction();
};

// fetch transaction (income expend)
const fetchTransaction = async (page = 1, form = {}) => {
  transactionLoading.value = true;
  const result = await transactionStore.fetchTransactions({
    page: page,
    type: form?.filterBy ?? null,
    sort: form?.sortBy ?? null,
    categoryId: form?.category ?? null,
    perPage: 15,
  });

  if (result.success) {
    transactionLoading.value = false;
    transactions.value = groupTransaction(result?.data);
  } else {
    transactionLoading.value = false;
    useNuxtApp().$toast.error(result.error);
  }
};

// to group transactions with date
const groupTransaction = (transactions) => {
  const groupedData = transactions.reduce((acc, item) => {
    const date = item.action_date.split(" ")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
  return groupedData;
};

const fetchCategory = async (type = []) => {
  try {
    await useFetch("/api/category", {
      method: "GET",
      params: {
        type: type,
      },
      transform: (response) => {
        category.value = response.data?.data;
      },
    });
  } catch (error) {
    console.log(error);
  }
};

fetchTransaction();
</script>

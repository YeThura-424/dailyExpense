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
      <div class="transaction-section" style="height:calc(100vh - 120px); overflow: auto;">
        <div class="flex justify-between bg-[#ddd2f1] text-[#7F3DFF] p-3 mt-2 rounded-lg">
          <h1 class="text-base font-normal">See your financial report</h1>
          <IconArrowRight />
        </div>

        <!-- transaction list  -->
        <div v-if="!transactionLoading" class="transaction_list_warpper">
          <div v-for="(transactions, key) in transactions" :key="key" class="py-2">
            <h1 class="font-semibold text-lg">{{ dayToName(key) }}</h1>
            <div class="transaction_list pt-2">
              <div v-for="transaction in transactions" :key="transaction.id"
                class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2">
                <div class="transaction_type flex gap-x-4">
                  <div :class="[
                    'transaction_list_icon w-14 h-14 flex justify-center items-center rounded-xl',
                    transaction.type == 'expend'
                      ? 'bg-[#FDD5D7]'
                      : 'bg-[#CFFAEA] ',
                  ]">
                    <img v-if="transaction.category.icon" :src="transaction.category.icon"
                      class="w-full h-full rounded-xl" />
                    <div v-else class="default-icon">
                      <IconHomeExpense v-if="transaction.type == 'expend'" fill="#FDD5D7" />
                      <IconHomeIncome v-else fill="#CFFAEA" />
                    </div>
                  </div>
                  <div class="transaction_list_desctiption">
                    <h1 class="font-semibold text-lg text-[#292B2D]">
                      {{ transaction.category.name }}
                    </h1>
                    <span class="text-sm text-[#91919F]">{{
                      transaction.description
                    }}</span>
                  </div>
                </div>
                <div class="transaction_list_amount text-right">
                  <h1 v-if="transaction.type == 'expend'" class="font-semibold text-lg text-[#FD3C4A]">
                    $-{{ transaction.amount }}
                  </h1>
                  <h1 v-else class="font-semibold text-lg text-[#00A86B]">
                    $+{{ transaction.amount }}
                  </h1>
                  <span class="text-sm text-[#91919F]">{{
                    transaction.time
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CoreModelBox verticalAlign="items-end" :visible="openFilter" @dismiss="closeFilterDialog">
      <div class="filter_content">
        <div class="filter-head flex justify-between items-center py-4">
          <h1>Filter Transaction</h1>
          <button class="text-[#7F3DFF] bg-[#ddd2f1] px-4 py-2 rounded-[22px]">
            Reset
          </button>
        </div>
        <div class="filter-body">
          <!-- filter by section  -->
          <RadioGroup v-model="filterBy">
            <RadioGroupLabel class="font-semibold">Filter By</RadioGroupLabel>
            <div class="grid grid-cols-3 gap-4 pt-3">
              <RadioGroupOption as="template" v-for="value in ['income', 'expense', 'transfer']" :value="value"
                v-slot="{ active, checked }">
                <div :class="[
                  active ? 'bg-[#EEE5FF] text-[#7F3DFF]' : '',
                  checked
                    ? 'bg-[#EEE5FF] text-[#7F3DFF] border border-[#7F3DFF]'
                    : 'bg-white border border-[#E3E5E5]',
                ]" class="cursor-pointer rounded-3xl px-3 py-2">
                  <span class="capitalize">{{ value }}</span>
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>

          <!-- sort by section  -->
          <RadioGroup v-model="sortBy">
            <RadioGroupLabel class="font-semibold">Sort By</RadioGroupLabel>
            <div class="grid grid-cols-3 gap-4 pt-3">
              <RadioGroupOption as="template" v-for="value in ['highest', 'lowest', 'newest', 'oldest']" :value="value"
                v-slot="{ active, checked }">
                <div :class="[
                  active ? 'bg-[#EEE5FF] text-[#7F3DFF]' : '',
                  checked
                    ? 'bg-[#EEE5FF] text-[#7F3DFF] border border-[#7F3DFF]'
                    : 'bg-white border border-[#E3E5E5]',
                ]" class="cursor-pointer rounded-3xl px-3 py-2">
                  <span class="capitalize">{{ value }}</span>
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>

          <!-- category selection here  -->
          <div>
            <h1>Category</h1>
            <CoreMultiSelect />
          </div>
        </div>
      </div>
    </CoreModelBox>
  </div>
</template>

<script setup>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
const transaction_type = [
  { name: "Month", value: "month" },
  { name: "Year", value: "year" },
];

const filterBy = ref("income");
const sortBy = ref("highest");
const transactions = ref([]);
const openFilter = ref(false);
const transactionLoading = ref(true);
const openFilterDialog = () => {
  openFilter.value = true;
};

const closeFilterDialog = (value) => {
  openFilter.value = value;
};

// fetch transaction (income expend)
const fetchTransaction = async (page = 1) => {
  transactionLoading.value = true;
  try {
    await useFetch("/api/income/list", {
      method: "GET",
      params: {
        page: page,
        perpage: 15,
      },
      transform: (response) => {
        transactions.value = groupTransaction(response?.data?.data);
      },
    });
    transactionLoading.value = false;
  } catch (error) {
    console.log(error);
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

fetchTransaction();
</script>

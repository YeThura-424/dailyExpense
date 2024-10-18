<template>
  <div class="w-full max-w-md">
    <TabGroup>
      <TabList class="flex justify-between space-x-1 rounded-xl p-1">
        <Tab
          v-for="(data, index) in title"
          :key="index"
          as="template"
          v-slot="{ selected }"
          @click="changeTab(data)"
        >
          <button
            :class="[
              'px-3 rounded-2xl py-2 text-base font-medium leading-5 ',
              'ring-white/60 ring-offset-2 ring-offset-none focus:outline-none',
              selected
                ? 'bg-[#FCEED4] text-[#FCAC12] shadow'
                : 'text-[#91919F] hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ data }}
          </button>
        </Tab>
      </TabList>
      <div class="filter-head flex justify-between items-center pt-2">
        <h1 class="text-xl font-semibold text-[#292B2D]">Filter Transaction</h1>
        <NuxtLink to="/transaction">
          <button
            class="text-[#7F3DFF] bg-[#ddd2f1] px-4 py-1.5 rounded-[22px]"
          >
            See All
          </button>
        </NuxtLink>
      </div>
      <TabPanels class="mt-2">
        <TabPanel
          :class="[
            'rounded-xl',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          <div v-if="transactions.length > 0" class="transaction_list pt-2">
            <div v-for="transaction in transactions" :key="transaction.id"
              class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2"
            >
              <div class="transaction_type flex gap-x-4">
                <div :class="['transaction_list_icon w-14 h-14 flex justify-center items-center rounded-xl',
                  transaction.type == 'expend' ? 'bg-[#FDD5D7]' : 'bg-[#CFFAEA] '
                ]">
                  <img v-if="transaction.category.icon"  :src="transaction.category.icon" class="w-full h-full rounded-xl"/>
                   <div v-else class="default-icon">
                    <IconHomeExpense v-if="transaction.type == 'expend'" fill="#FDD5D7" />
                    <IconHomeIncome v-else fill="#CFFAEA" />
                   </div>
                </div>
                <div class="transaction_list_desctiption">
                  <h1 class="font-semibold text-lg text-[#292B2D]">{{transaction.category.name}}</h1>
                  <span class="text-sm text-[#91919F]">{{transaction.description}}</span>
                </div>
              </div>
              <div class="transaction_list_amount text-right">
                <h1 v-if="transaction.type == 'expend'" class="font-semibold text-lg text-[#FD3C4A]">$-{{transaction.amount}}</h1>
                <h1 v-else class="font-semibold text-lg text-[#00A86B]">$+{{transaction.amount}}</h1>
                <span class="text-sm text-[#91919F]">{{ transaction.time }}</span>
              </div>
            </div>
          </div>
          <div v-else class="empty-transactions">
            <h1 class="text-center py-8">No Transaction for selected criteria!</h1>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const title = ["Today", "Week", "Month", "Year"];

const transactions = ref([]);

const changeTab = (tab) => {
  transactions.value = []
  fetchTransaction({tab})
}

const fetchTransaction = async (filters = {} ) => {
  const { today, week, month, year } = filters;

  await useFetch('/api/income/list', {
    method: 'GET',
    params: {
      today: today || [],
      week: week || [],
      month: month || [],
      year: year || [],
    },
    transform: (response) => {
      transactions.value = response?.data?.data;
    }
  })
}

fetchTransaction({today: 'today'});
</script>

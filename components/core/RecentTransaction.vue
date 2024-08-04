<template>
  <div class="w-full max-w-md">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl p-1">
        <Tab
          v-for="(data, index) in title"
          :key="index"
          as="template"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'px-3 rounded-2xl py-2 text-sm font-medium leading-5 ',
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

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(data, index) in title"
          :key="index"
          :class="[
            'rounded-xl',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          {{ data }}
          <div class="transaction_list pt-2">
            <div
              class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2"
            >
              <div class="transaction_type flex gap-x-4">
                <div class="transaction_list_icon">
                  <img src="/images/transaction_list.svg" />
                </div>
                <div class="transaction_list_desctiption">
                  <h1 class="font-semibold text-lg text-[#292B2D]">Shopping</h1>
                  <span class="text-sm text-[#91919F]">Buy Some grocery</span>
                </div>
              </div>
              <div class="transaction_list_amount text-right">
                <h1 class="font-semibold text-lg text-[#FD3C4A]">$-120</h1>
                <span class="text-sm text-[#91919F]">10:00AM</span>
              </div>
            </div>
            <div
              class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2"
            >
              <div class="transaction_type flex gap-x-4">
                <div class="transaction_list_icon">
                  <img src="/images/transaction_list.svg" />
                </div>
                <div class="transaction_list_desctiption">
                  <h1 class="font-semibold text-lg text-[#292B2D]">Shopping</h1>
                  <span class="text-sm text-[#91919F]">Buy Some grocery</span>
                </div>
              </div>
              <div class="transaction_list_amount text-right">
                <h1 class="font-semibold text-lg text-[#FD3C4A]">$-120</h1>
                <span class="text-sm text-[#91919F]">10:00AM</span>
              </div>
            </div>
            <div
              class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2"
            >
              <div class="transaction_type flex gap-x-4">
                <div class="transaction_list_icon">
                  <img src="/images/transaction_list.svg" />
                </div>
                <div class="transaction_list_desctiption">
                  <h1 class="font-semibold text-lg text-[#292B2D]">Shopping</h1>
                  <span class="text-sm text-[#91919F]">Buy Some grocery</span>
                </div>
              </div>
              <div class="transaction_list_amount text-right">
                <h1 class="font-semibold text-lg text-[#FD3C4A]">$-120</h1>
                <span class="text-sm text-[#91919F]">10:00AM</span>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import {
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/vue/20/solid";

const title = ["Today", "Week", "Month", "Year"];
// const props = defineProps({
//   transactions: {
//     type: Object,
//     required: true,
//   },
// });
</script>

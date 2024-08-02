<template>
  <div class="w-full max-w-md px-2 py-16 sm:px-0">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl p-1">
        <Tab as="template" v-slot="{ selected }">
          <button
            :class="[
              'px-3 rounded-2xl py-2 text-sm font-medium leading-5 ',
              'ring-white/60 ring-offset-2 ring-offset-none focus:outline-none',
              selected
                ? 'bg-[#FCEED4] text-[#FCAC12] shadow'
                : 'text-[#91919F] hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            Day
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          :class="[
            'rounded-xl bg-white p-3',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          <ul>
            <li class="relative rounded-md p-3 hover:bg-gray-100"></li>
          </ul>
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
</script>

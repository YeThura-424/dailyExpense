<template>
  <div class="w-full">
    <Listbox v-model="selectedMonth">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-xl bg-white py-2 pl-3 text-left pr-10 h-14 shadow-md focus:outline-none border border-[#91919F]"
        >
          <div class="truncate">{{ selectedMonth?.name }}</div>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="month in monthOptions"
              :key="month.name"
              :value="month"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-2 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ month.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  currentYear: {
    type: Number,
    default: () => {
      return new Date().getFullYear();
    },
  },
});
const emit = defineEmits(["update:modelValue"]);

const monthOptions = ref(getPreviousMonth(props.currentYear));

const today = new Date();

const currentMonth = today.getMonth() + 1;

const selectedMonth = ref(null);

onMounted(() => {
  selectedMonth.value = monthOptions.value.find(
    (month) => month.value == currentMonth
  );
});

watch(
  () => props.currentYear,
  (newYear) => {
    monthOptions.value = getPreviousMonth(newYear);
    selectedMonth.value = monthOptions.value.find(
      (month) => month.value == currentMonth
    );
  }
);

watch(
  () => selectedMonth.value,
  (updateValue) => {
    emit("update:modelValue", updateValue.value);
  }
);

emit("update:modelValue", selectedMonth.value?.value);
</script>

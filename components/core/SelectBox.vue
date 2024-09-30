<template>
  <div
    :class="[
      'select-box-wrapper w-fit relative',
      isSelectOptionOpen ? 'active' : '',
    ]"
  >
    <div class="input-wrapper" @click="openSelectOption">
      <input
        v-model="selectedOption.value"
        id="select-box"
        type="text"
        readonly="readonly"
        class="relative w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 inline-flex items-center text-left cursor-default rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 pe-9 text-gray-400 dark:text-gray-500"
        placeholder="Select something..."
      />
    </div>
    <div
      v-if="isSelectOptionOpen"
      class="z-20 group w-full"
      data-popper-placement="bottom-end"
      style="
        position: absolute;
        inset: 0px 0px auto auto;
        margin: 0px;
        transform: translate(0px, 40px);
      "
    >
      <div class="">
        <ul
          class="select-option-wrapper relative focus:outline-none overflow-y-auto scroll-py-1 ring-1 ring-gray-200 dark:ring-gray-700 rounded-md shadow-lg bg-white dark:bg-gray-800 p-1 max-h-60"
        >
          <input
            placeholder="Search a person..."
            v-if="searchable"
            autocomplete="off"
            class="block w-[calc(100%+0.5rem)] focus:ring-transparent text-sm px-3 py-1.5 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-0 border-b border-gray-200 dark:border-gray-700 sticky -top-1 -mt-1 mb-1 -mx-1 z-10 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
          />
          <li
            v-for="list in options"
            :key="list"
            @click="setOptionValue(list)"
            class="cursor-default select-none relative flex items-center justify-between gap-1 rounded-md px-1.5 py-1.5 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-gray-900"
          >
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="truncate">{{ list.name }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  searchable: {
    type: Boolean,
    default: false,
  },
  // to emit the selected options
  optionKey: {
    type: String,
    default: () => null,
  },
  // to show the selected value in input
  optionValue: {
    type: String,
    default: "name",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isSelectOptionOpen = ref(false);

const selectedOption = reactive({
  key: [],
  value: [],
});

const openSelectOption = () => {
  isSelectOptionOpen.value = !isSelectOptionOpen.value;
};

watch(
  () => selectedOption.key,
  (newVal) => {
    emit("update:modelValue", newVal);
  }
);

const setOptionValue = (list) => {
  isSelectOptionOpen.value = false;
  selectedOption.value = list[props.optionValue];

  if (props.optionKey) {
    selectedOption.key = list[props.optionKey];
  } else {
    selectedOption.key = list;
  }
};

const options = ref([
  { id: 1, name: "OptionOne", value: "option_1" },
  { id: 2, name: "OptionTwo", value: "option_2" },
  { id: 3, name: "OptionThree", value: "option_3" },
  { id: 4, name: "OptionFour", value: "option_4" },
  { id: 5, name: "OptionFive", value: "option_5" },
  { id: 6, name: "OptionSix", value: "option_6" },
  { id: 6, name: "OptionSeven", value: "option_7" },
  { id: 6, name: "OptionEight", value: "option_8" },
]);
</script>

<style scoped>
.select-box-wrapper::before {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-width: 0 2px 2px 0;
  border-radius: 2px;
  border-color: #9e9d9d;
  position: absolute;
  right: 10px;
  top: 13px;
  transform: rotate(45deg);
  transition: all 0.3s;
  z-index: 1;
}

.select-box-wrapper.active::before {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-width: 0 2px 2px 0;
  border-radius: 2px;
  border-color: #9e9d9d;
  position: absolute;
  right: 10px;
  top: 13px;
  transform: rotate(225deg);
  z-index: 1;
}

.select-option-wrapper::-webkit-scrollbar {
  width: 5px;
  display: none;
  background-color: #ffffff;
}

.select-option-wrapper::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(107, 107, 107, 0.3);
  background-color: #555;
}
</style>

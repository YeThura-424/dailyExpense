<template>
  <div :class="['select-box-wrapper w-full']">
    <div v-if="showAmount && amount" class="amount flex justify-between px-2 text-sm">
      <p class="font-normal text-[#91919F]">Wallet Balance</p>
      <p class="font-medium text-[#FD3C4A]">{{ amount }} Ks</p>
    </div>
    <div v-if="showBudget && budget" class="amount flex justify-between px-2 text-sm">
      <p class="font-normal text-[#91919F]">Budget</p>
      <p class="font-medium text-[#FD3C4A]">{{ budget }} Ks</p>
    </div>
    <VDropdown compute-transform-origin :distance="6" :delay="{ show: 300, hide: 300 }">
      <div :class="['input-wrapper h-14 relative']">
        <input v-model="selectedOption.value" id="select-box" type="text" readonly="readonly"
          class="relative w-full h-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border border-[#91919f] inline-flex items-center text-left text-xl cursor-default rounded-xl gap-x-1.5 px-2.5 py-1.5 shadow-sm bg-white pe-9"
          :placeholder="placeholder" />
      </div>
      <template #popper>
        <div class="z-20 group w-full">
          <ul
            class="select-option-wrapper relative border border-[#91919f] focus:outline-none overflow-y-auto scroll-py-1 rounded-md shadow-lg bg-white p-1 max-h-60">
            <input placeholder="Search something..." v-if="searchable" autocomplete="off"
              class="block w-[calc(100%+0.5rem)] focus:ring-transparent text-sm px-3 py-1.5 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-0 border-b border-gray-200 dark:border-gray-700 sticky -top-1 -mt-1 mb-1 -mx-1 z-10 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none" />
            <li v-for="list in options" :key="list" v-close-popper @click="setOptionValue(list)" :class="checkActive(list) ? 'bg-[#7F3DFF] text-white' : 'text-gray-900'
              "
              class="cursor-default select-none relative flex items-center justify-between gap-1 rounded-md px-1.5 py-1.5 text-xl">
              <div class="flex items-center gap-1.5 min-w-0">
                <div v-if="showIcon && list?.icon"
                  class="w-12 h-12 bg-[#eee5ff] rounded-full flex justify-center items-center">
                  <img :src="list?.icon" alt="currency-icon" class="w-10 h-10" />
                </div>
                <span class="truncate">{{ list.name }}</span>
              </div>
            </li>
            <li v-if="options.length < 1">List is Empty</li>
          </ul>
        </div>
      </template>
    </VDropdown>

    <!-- selected values list  -->
    <div v-if="selectedOption.value.length > 0 && multiple" class="">
      <ul class="h-[75px] overflow-x-auto flex flex-wrap gap-2 mt-2">
        <li v-for="option in selectedOption.value" :key="option">
          <div class="flex items-center gap-x-2 bg-[#7F3DFF] px-2 py-1 rounded-md">
            <span class="text-white text-sm">{{ option.name }}</span>
            <Icon name="ion:ios-close-circle-outline" class="text-white" @click="removeSelectedOption(option.id)" />
          </div>
        </li>
      </ul>
    </div>
    <!-- selected values list ends  -->
  </div>
</template>

<script setup>
const props = defineProps({
  searchable: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    require: false,
    default: () => [],
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
  placeholder: {
    type: String,
    default: "Select something...",
  },
  showAmount: {
    type: Boolean,
    default: false,
  },
  showBudget: {
    type: Boolean,
    default: false,
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [Object, String, Number],
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const hidePopOver = ref(true);
const amount = ref(null);
const budget = ref(null);
const selectedOption = reactive({
  key: [],
  value: [],
});

onMounted(() => {
  if (props.modelValue) {
    if (props.optionKey) {
      const selected = props.options.find(
        (list) => list[props.optionKey] === props.modelValue
      );
      if (selected) {
        selectedOption.value = selected[props.optionValue];
        selectedOption.key = selected[props.optionKey];
      }
    } else {
      selectedOption.value = props.modelValue[props.optionValue];
      selectedOption.key = props.modelValue;
    }
  }
});

watch(
  () => selectedOption.key,
  (newVal) => {
    emit("update:modelValue", newVal);
  }
);

const setOptionValue = (list) => {
  selectedOption.value = list[props.optionValue];

  if (props.optionKey) {
    selectedOption.key = list[props.optionKey];
  } else {
    selectedOption.key = list;
  }

  if (props.showAmount) {
    amount.value = list.amount;
  }
  if (props.showBudget) {
    budget.value = list?.budget_categories[0]?.budget?.remaining_amount ?? null;
  }
  hidePopOver.value = true;
};

const checkActive = (data) => {
  if (props.multiple) {
    if (props.optionKey) {
      return selectedOption.key.every((item) => item === data[props.optionKey]);
    } else {
      return selectedOption.key.every((item) => item === data);
    }
  } else {
    if (props.optionKey) {
      return selectedOption.key === data[props.optionKey];
    } else {
      selectedOption.key === data;
    }
  }
};

const removeSelectedOption = (id) => {
  selectedOption.key = selectedOption.key.filter((option) => option.id !== id);
  selectedOption.key = [
    ...selectedOption.key,
    options.find((option) => option.id === id),
  ].sort((a, b) => a.id - b.id);
};
</script>

<style scoped>
.input-wrapper::before {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-width: 0 2px 2px 0;
  border-radius: 2px;
  border-color: #9e9d9d;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  transition: all 0.3s;
  z-index: 1;
}

.input-wrapper.active::before {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-width: 0 2px 2px 0;
  border-radius: 2px;
  border-color: #9e9d9d;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%) rotate(225deg);
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

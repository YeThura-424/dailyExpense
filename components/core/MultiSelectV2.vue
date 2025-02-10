<template>
  <div class="select-wrapper">
    <!-- <select multiple class="hidden" :name="name">
      <option v-for="(option, idx) in selectedOptions" :key="idx" :value="getOptionValue(option)">
        {{ getOptionValue(option) }}
      </option>
    </select> -->

    <div v-if="multiple">
      <div class="relative">
        <!-- select input box -->
        <div class="select-input">
          <input
            type="text"
            class="w-full p-3 focus:outline-none border border-[#FF5200] focus:ring-1 focus:ring-[#FF5200] rounded-md"
            placeholder="Select Category"
            @click="selectAction"
            v-model="searchText"
          />
        </div>
        <!-- select input box end here  -->

        <!-- selected values list  -->
        <div v-if="selectedOptions.length > 0" class="">
          <ul class="h-[75px] overflow-x-auto flex flex-wrap gap-2 mt-2">
            <li v-for="option in selectedOptions" :key="option">
              <div
                class="flex items-center gap-x-2 bg-[#FF5200] px-2 py-1 rounded-md"
              >
                <span class="text-white text-sm">{{ option.name }}</span>
                <Icon
                  name="ion:ios-close-circle-outline"
                  class="text-white"
                  @click="removeSelectedOption(option.id)"
                />
              </div>
            </li>
          </ul>
        </div>
        <!-- selected values list ends  -->

        <!-- select option list -->
        <ul
          v-if="showOptions"
          :class="[
            'rounded-md my-2 absolute bg-[#fdfdfd] select-shadow h-[200px] w-full overflow-x-scroll',
            selectedOptions.length > 0 ? '-bottom-[135px]' : '-bottom-[220px]',
          ]"
        >
          <li
            v-for="data in selectOptions"
            :key="data.name"
            @click="setSelectOption(data.id)"
            class="px-3 py-2 hover:bg-[#eee]"
          >
            {{ data.name }}
          </li>
        </ul>
        <!-- select option list end here  -->
      </div>
    </div>
    <div v-else>
      <!-- for single select  -->
      <div class="relative">
        <!-- select input box -->
        <div class="select-input">
          <input
            type="text"
            class="w-full p-3 focus:outline-none border border-[#FF5200] focus:ring-1 focus:ring-[#FF5200] rounded-md"
            placeholder="Select Category"
            @click="selectAction"
            v-model="selectedOptions.name"
          />
        </div>
        <!-- select input box end here  -->

        <!-- select option list -->
        <ul
          v-if="showOptions"
          :class="[
            'rounded-md my-2 absolute bg-[#fdfdfd] select-shadow h-[200px] w-full overflow-x-scroll',
            selectedOptions.length > 0 ? '-bottom-[135px]' : '-bottom-[220px]',
          ]"
        >
          <li
            v-for="data in selectOptions"
            :key="data.name"
            @click="setSelectOption(data.id)"
            class="px-3 py-2 hover:bg-[#eee]"
          >
            {{ data.name }}
          </li>
        </ul>
        <!-- select option list end here  -->
      </div>
    </div>
  </div>
</template>
<script setup>
const showOptions = ref(false);

const props = defineProps({
  options: {
    type: Array,
    default: [], // [{id:1,name:'Name 1'}]
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});
const options = [
  {
    name: "Category 1",
    value: "category_1",
    id: 1,
  },
  {
    name: "Category 2",
    value: "category_2",
    id: 2,
  },
  {
    name: "Category 3",
    value: "category_3",
    id: 3,
  },
  {
    name: "Category 4",
    value: "category_4",
    id: 4,
  },
  {
    name: "Category 5",
    value: "category_5",
    id: 5,
  },
  {
    name: "Category 6",
    value: "category_6",
    id: 6,
  },
  {
    name: "Category 7",
    value: "category_7",
    id: 7,
  },
  {
    name: "Category 8",
    value: "category_8",
    id: 8,
  },
  {
    name: "Category 9",
    value: "category_9",
    id: 9,
  },
  {
    name: "Category 10",
    value: "category_10",
    id: 10,
  },
];
const selectOptions = ref([]);
const searchText = ref(null);
const selectedOptions = ref([]);

watch(
  () => searchText.value,
  (value) => {
    if (value) {
      selectOptions.value = options.filter((option) =>
        option.name.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      selectOptions.value = options;
    }
  }
);
const selectAction = (e) => {
  showOptions.value = !showOptions.value;
};
const getSelectOptions = (options) => {
  selectOptions.value = options;
};

const setSelectOption = (id) => {
  showOptions.value = false;
  if (props.multiple && selectedOptions.value) {
    selectedOptions.value = [
      ...selectedOptions.value,
      options.find((option) => option.id === id),
    ];
    selectOptions.value = selectOptions.value.filter(
      (option) => option.id !== id
    );
  } else {
    selectedOptions.value = options.find((option) => option.id == id);
  }
};

const removeSelectedOption = (id) => {
  selectedOptions.value = selectedOptions.value.filter(
    (option) => option.id !== id
  );
  selectOptions.value = [
    ...selectOptions.value,
    options.find((option) => option.id === id),
  ].sort((a, b) => a.id - b.id);
};
getSelectOptions(options);
</script>

<style scoped>
.select-shadow {
  background: #fdfdfd;
  box-shadow: 8px -8px 16px #ddd, -8px 8px 16px #ddd;
}
</style>

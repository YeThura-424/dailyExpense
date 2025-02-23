<template>
  <div class="">
    <div class="export_content pb-4">
      <div class="category_header px-4">
        <MobilePageHeader
          title="Export"
          text-color="text-black"
          @back="backAction"
        />
      </div>
      <div class="export-filter-section bg-white px-4 py-4">
        <div class="export_type_select py-2">
          <p class="text-[#161719] text-lg py-2">
            What data do you want to export?
          </p>
          <CoreSelectBox
            :options="exportType"
            option-key="key"
            name="Type"
            v-model="form.type"
            placeholder="Select export type"
          />
        </div>
        <div class="export_date_type_select py-2">
          <p class="text-[#161719] text-lg py-2">How do you want to export?</p>
          <CoreSelectBox
            :options="exportRange"
            option-key="key"
            name="Range"
            v-model="form.range"
            placeholder="Select export range"
          />
        </div>
        <div v-if="form.range == 'day'" class="date_range">
          <div class="from_date_input_box">
            <p class="text-[#161719] text-lg py-2">From Date</p>
            <CoreDatePicker v-model="form.from_date" />
          </div>
          <div class="to_date_input_box">
            <p class="text-[#161719] text-lg py-2">To Date</p>
            <CoreDatePicker v-model="form.to_date" />
          </div>
        </div>
        <div
          v-if="form.range == 'month'"
          class="month_range grid grid-cols-2 gap-x-4"
        >
          <div class="year_select">
            <p class="text-[#161719] text-lg pt-2">Year</p>
            <CoreYearSelect v-model="form.year" :min-year="2024" />
          </div>
          <div class="month_select">
            <p class="text-[#161719] text-lg pt-2">Month</p>
            <CoreMonthSelect
              v-model="form.month"
              :current-year="yearForMonth"
            />
          </div>
        </div>
        <div
          v-if="form.range == 'year'"
          class="year_range grid grid-cols-1 gap-x-12"
        >
          <div class="year_select">
            <p class="text-[#161719] text-lg pt-2">Year</p>
            <CoreYearSelect v-model="form.year" :min-year="2024" />
          </div>
        </div>

        <div
          class="category-create fixed bottom-3 w-[95%] left-1/2 -translate-x-1/2"
        >
          <!-- <nuxt-link to="/category/add"> -->
          <button
            type="button"
            :disabled="!isReadyToExport"
            @click="exportData"
            class="w-full disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
          >
            <Icon
              name="ion:ios-create"
              class="text-white text-2xl cursor-pointer"
            />
            Export Selected Data
          </button>
          <!-- </nuxt-link> -->
        </div>
      </div>
    </div>
    <MobileLoadingDots v-if="exportLoading" />
  </div>
</template>

<script setup>
import { useExportStore } from "~/store/export";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const backAction = () => {
  navigateTo("/profile");
};
const { exportTransaction } = useExportStore();
const exportLoading = ref(false);
const isReadyToExport = ref(false);

const form = reactive({
  type: null,
  range: null,
  from_date: null,
  to_date: null,
  month: null,
  year: null,
});

const yearForMonth = ref(form.year);

watch(
  () => form.year,
  (newYear) => {
    yearForMonth.value = newYear;
  }
);

const exportType = ref([
  {
    id: 1,
    key: "wallet",
    name: "Wallet",
  },
  {
    id: 2,
    key: "transaction",
    name: "Transaction",
  },
  {
    id: 3,
    key: "budget",
    name: "Budget",
  },
  {
    id: 4,
    key: "all",
    name: "All",
  },
]);

const exportRange = ref([
  { id: 1, key: "day", name: "Day" },
  { id: 2, key: "month", name: "Month" },
  { id: 3, key: "year", name: "Year" },
]);

watch(
  () => form,
  (newVal) => {
    if (newVal.type) {
      console.log("type change");
      if (newVal.range == "day" && newVal.from_date && newVal.to_date) {
        isReadyToExport.value = true;
      } else if (newVal.range == "month" && newVal.month) {
        isReadyToExport.value = true;
      } else if (newVal.range == "year") {
        isReadyToExport.value = true;
      } else {
        isReadyToExport.value = false;
      }
    }
  },
  { deep: true }
);

const exportData = async () => {
  if (form.type == "transaction") {
    await transactionExport();
  }
};

const transactionExport = async () => {
  const date = new Date();
  exportLoading.value = true;
  const result = await exportTransaction(form);

  if (result.success && result.data) {
    console.log(result.data, "logging all the data");
    // all the logic for exporting as csv, xlsx, pdf
    try {
      const dataWithHeader = result.data.map((item) => ({
        "Action Date": formatDate(item?.action_date),
        Category: item?.categories.name,
        Description: item?.description,
        Type: item?.type,
        "From Wallet": item?.wallet?.name,
        Amount: item?.amount,
        "Created Date": formatDate(item?.created_at),
      }));

      const workBook = XLSX.utils.book_new();
      const transactionWorkSheet = XLSX.utils.json_to_sheet(dataWithHeader);
      XLSX.utils.book_append_sheet(
        workBook,
        transactionWorkSheet,
        "Transactions"
      );

      const xlsxBuffer = XLSX.write(workBook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([xlsxBuffer], { type: "application/octet-stream" });

      const fileName = `Transactions_${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}.xlsx`;

      saveAs(blob, fileName);
      exportLoading.value = false;
    } catch (error) {
      exportLoading.value = false;
      useNuxtApp().$toast.error(error.message);
    }
  } else {
    useNuxtApp().$toast.error(result.error);
  }
};
</script>

<style>
.export-filter-section {
  height: calc(100vh - 120px);
  overflow-x: auto;
}
</style>

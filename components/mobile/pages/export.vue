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
      <div class="export-filter-section px-4 py-4">
        <div class="export_type_select py-2">
          <CoreSelectBox
            :options="exportType"
            option-key="id"
            name="Type"
            v-model="form.type"
            placeholder="Select export type"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const backAction = () => {
  navigateTo("/profile");
};
const form = reactive({
  type: "",
});
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
</script>

<style>
.export-list-wrapper.bg-white {
  max-height: calc(100vh - 130px);
  overflow-x: auto;
}
</style>

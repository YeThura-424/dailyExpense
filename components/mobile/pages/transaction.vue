<template>
  <div>
    <div class="px-4 pt-5">
      <div class="flex justify-between items-center">
        <CoreMonthSelect :months="transaction_type" />
        <div class="filter-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="openFilterDialog"
          >
            <path
              d="M27 8.5H5C4.86739 8.5 4.74022 8.44732 4.64645 8.35355C4.55268 8.25978 4.5 8.13261 4.5 8C4.5 7.86739 4.55268 7.74022 4.64645 7.64645C4.74022 7.55268 4.86739 7.5 5 7.5H27C27.1326 7.5 27.2598 7.55268 27.3536 7.64645C27.4473 7.74021 27.5 7.86739 27.5 8C27.5 8.13261 27.4473 8.25979 27.3536 8.35355C27.2598 8.44732 27.1326 8.5 27 8.5Z"
              fill="black"
              stroke="#212325"
            />
            <path
              d="M23 17H9C8.73478 17 8.48043 16.8946 8.29289 16.7071C8.10536 16.5196 8 16.2652 8 16C8 15.7348 8.10536 15.4804 8.29289 15.2929C8.48043 15.1054 8.73478 15 9 15H23C23.2652 15 23.5196 15.1054 23.7071 15.2929C23.8946 15.4804 24 15.7348 24 16C24 16.2652 23.8946 16.5196 23.7071 16.7071C23.5196 16.8946 23.2652 17 23 17Z"
              fill="black"
            />
            <path
              d="M19 25H13C12.7348 25 12.4804 24.8946 12.2929 24.7071C12.1054 24.5196 12 24.2652 12 24C12 23.7348 12.1054 23.4804 12.2929 23.2929C12.4804 23.1054 12.7348 23 13 23H19C19.2652 23 19.5196 23.1054 19.7071 23.2929C19.8946 23.4804 20 23.7348 20 24C20 24.2652 19.8946 24.5196 19.7071 24.7071C19.5196 24.8946 19.2652 25 19 25Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <!-- see report section  -->
      <div
        class="flex justify-between bg-[#ddd2f1] text-[#7F3DFF] p-3 my-6 rounded-lg"
      >
        <h1 class="text-base font-normal">See your financial report</h1>
        <svg
          width="10"
          height="20"
          viewBox="0 0 10 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.60765 18.9903L1.59988 18.9901L1.5921 18.99C1.52595 18.9898 1.4605 18.9764 1.39957 18.9506C1.33863 18.9249 1.28341 18.8873 1.23711 18.84L1.23463 18.8375C1.1415 18.7439 1.08923 18.6171 1.08923 18.485C1.08923 18.3532 1.14129 18.2267 1.23406 18.1331C1.23425 18.1329 1.23444 18.1327 1.23463 18.1325L6.89358 12.4736L6.8938 12.4734C7.54924 11.8171 7.91739 10.9275 7.91739 10C7.91739 9.07253 7.54924 8.18296 6.8938 7.5267L6.89358 7.52648L1.24958 1.88249C1.17434 1.78871 1.13529 1.67078 1.13994 1.55028C1.1448 1.42444 1.19697 1.30508 1.28602 1.21603C1.37506 1.12698 1.49443 1.07481 1.62027 1.06995C1.74114 1.06528 1.85942 1.10459 1.95333 1.18028L7.64692 6.81404C7.64716 6.81428 7.6474 6.81452 7.64764 6.81476C8.06637 7.23262 8.3986 7.72894 8.62533 8.27533C8.85219 8.82204 8.96896 9.40813 8.96896 10C8.96896 10.5919 8.85219 11.178 8.62533 11.7247C8.39847 12.2714 8.06599 12.768 7.64692 13.186L7.64679 13.1862L1.98679 18.8362L1.98676 18.8361L1.98265 18.8403C1.93401 18.8901 1.87554 18.9291 1.81097 18.9549C1.7464 18.9807 1.67715 18.9928 1.60765 18.9903Z"
            fill="black"
            stroke="#7F3DFF"
          />
        </svg>
      </div>

      <!-- transaction list  -->
      <div class="transaction_list_warpper">
        <div>
          <h1 class="font-semibold text-lg">Today</h1>
          <div class="transaction_list"></div>
        </div>
      </div>
    </div>
    <CoreModelBox
      verticalAlign="items-end"
      :visible="openFilter"
      @dismiss="closeFilterDialog"
    />
    <MobileMainNav />
  </div>
</template>

<script setup>
const transaction_type = [
  { name: "Month", value: "month" },
  { name: "Year", value: "year" },
];

const openFilter = ref(false);
const openFilterDialog = () => {
  openFilter.value = true;
};

const closeFilterDialog = (value) => {
  openFilter.value = value;
};
</script>

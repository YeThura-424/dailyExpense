<template>
  <div class="listing-card-wrapper p-4 bg-[#ffffff] rounded-2xl">
    <div class="card-header flex justify-between items-center">
      <div class="header-type py-2">
        <button
          class="flex items-center text-lg gap-x-1 bg-[#F1F1FA] rounded-full px-2 py-1.5"
        >
          <Icon name="ion:ios-radio-button-on" class="text-yellow-500" />
          Shopping
        </button>
      </div>
      <div class="header-alert">
        <Icon name="ion:information-circled" class="text-yellow-500 text-3xl" />
      </div>
    </div>
    <div class="card-info">
      <h1 class="text-xl font-bold pb-2">Remaining $0</h1>
      <div class="budget-bar bg-yellow-500 p-2 rounded-lg"></div>
      <p class="text-[#6f6f74] text-lg">$1200 of $1000</p>
      <span class="text-xl text-red-500">You've exceed the limit!</span>
    </div>
  </div>
</template>

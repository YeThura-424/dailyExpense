<template>
  <div class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2">
    <div class="transaction_type flex gap-x-4">
      <div :class="[
        'transaction_list_icon w-14 h-14 hide-text rounded-md',
      ]">

      </div>
      <div class="transaction_list_desctiption">
        <h1 class="h-7 hide-text rounded">

        </h1>
        <span class="h-5 hide-text rounded"></span>
      </div>
    </div>
    <div class="transaction_list_amount text-right">
      <h1 class="h-7 hide-text rounded">

      </h1>
      <span class="h-5 hide-text rounded"></span>
    </div>
  </div>
</template>
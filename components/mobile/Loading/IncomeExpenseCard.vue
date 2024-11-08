<template>
  <div class="flex justify-between items-center gap-x-6 bg-[#FCFCFC] p-4 rounded-lg mt-2">
    <div class="transaction_type flex w-full gap-x-4">
      <div :class="[
        'transaction_list_icon w-14 h-14 hide-text rounded-md',
      ]">

      </div>
      <div class="transaction_list_desctiption w-full">
        <h1 class="h-7 hide-text rounded mb-2">

        </h1>
        <p class="h-5 hide-text rounded"></p>
      </div>
    </div>
    <div class="transaction_list_amount w-full text-right">
      <h1 class="h-7 hide-text rounded mb-2">

      </h1>
      <p class="h-5 hide-text rounded"></p>
    </div>
  </div>
</template>
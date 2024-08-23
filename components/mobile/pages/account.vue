<template>
  <div class="">
    <div class="expense_main_content px-6 py-4">
      <div class="expense_header flex pt-3">
        <div class="back_icon" @click="backAction">
          <Icon
            name="ion:arrow-back-circle-sharp"
            class="text-white text-3xl cursor-pointer"
          />
        </div>
        <div class="expense w-full">
          <p class="text-center text-white text-xl font-bold">Income</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

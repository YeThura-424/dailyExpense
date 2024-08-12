<template>
  <div class="bg-[#FD3C4A]">
    <div class="expense_main_content px-6 py-4">
      <div class="expense_header flex items-center">
        <div class="back_icon">
          <Icon
            name="ion:arrow-back-sharp"
            class="text-white text-3xl cursor-pointer"
          />
        </div>
        <div class="expense w-full">
          <p class="text-center text-white text-2xl font-bold">Expense</p>
        </div>
      </div>
      <div class="expense_amount text-white pt-40">
        <span class="text-base">How Much ?</span>
        <h1 class="font-extrabold text-5xl">$ 0</h1>
      </div>
    </div>
    <div class="expense_form bg-white rounded-t-[40px] shadow">
      <div>
        <h1>Category</h1>
        <CoreMultiSelect />
      </div>
    </div>
    <MobileMainNav />
  </div>
</template>

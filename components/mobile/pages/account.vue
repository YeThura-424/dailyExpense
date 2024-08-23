<template>
  <div class="">
    <div class="account_content py-4">
      <div class="account_header flex px-6 pt-3 pb-6">
        <div class="back_icon text-[#212325]" @click="backAction">
          <Icon
            name="ion:arrow-back-circle-sharp"
            class="text-3xl cursor-pointer"
          />
        </div>
        <div class="account w-full">
          <p class="text-center text-xl font-bold">Account</p>
        </div>
      </div>
      <div class="account_info text-center px-6 py-16">
        <h1 class="text-sm text-p[#91919F] font-medium">Account Balance</h1>
        <p class="text-3xl font-bold text-[#161719]">$9400</p>
      </div>

      <div class="profile-modules-wrapper bg-white">
        <!-- wallet account  -->
        <div
          class="account-section flex items-center justify-between border-b border-[#eee] px-4 py-4"
        >
          <div class="flex items-center gap-x-3">
            <div
              class="account-logo w-14 h-14 bg-[#EEE5FF] rounded-2xl flex justify-center items-center"
            >
              <Icon name="ion:md-wallet" class="text-4xl text-[#7F3DFF]" />
            </div>
            <h1 class="text-[#292B2D] text-xl font-medium">Bank Account</h1>
          </div>
          <div class="amount">
            <p class="text-xl text-[#212325]">$6000</p>
          </div>
        </div>
        <!-- physical cash  -->
        <div
          class="account-section flex items-center justify-between border-b border-[#eee] px-4 py-4"
        >
          <div class="flex items-center gap-x-3">
            <div
              class="account-logo w-14 h-14 bg-[#EEE5FF] rounded-2xl flex justify-center items-center"
            >
              <Icon name="ion:ios-cash" class="text-4xl text-[#7F3DFF]" />
            </div>
            <h1 class="text-[#292B2D] text-xl font-medium">In Hand Cash</h1>
          </div>
          <div class="amount">
            <p class="text-xl text-[#212325]">$3400</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.account_info {
  background-image: url("/images/account_bg.png");
}
</style>

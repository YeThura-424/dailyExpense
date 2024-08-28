<template>
  <div>
    <div class="px-4 pt-3 pb-3">
      <!-- see report section  -->
      <div class="account_detail_header pb-3">
        <MobilePageHeader
          title="Account Detail"
          icon-color="text-[#7F3DFF]"
          text-color="text-black"
        />
      </div>

      <div class="account_detail_in text-center flex flex-col items-center">
        <div
          class="account-logo w-14 h-14 bg-[#EEE5FF] rounded-2xl flex justify-center items-center"
        >
          <Icon name="ion:md-wallet" class="text-4xl text-[#7F3DFF]" />
        </div>
        <h1 class="text-xl font-semibold">Bank Account</h1>
        <p class="text-2xl font-bold py-2">$2400</p>
      </div>
      <!--  account transaction list  -->
      <div class="accont_detail_transaction_list_warpper">
        <div class="py-2">
          <h1 class="font-semibold text-lg">Today</h1>
          <div class="transaction_list pt-2">
            <div
              class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2"
            >
              <div class="transaction_type flex gap-x-4">
                <div class="transaction_list_icon">
                  <img src="/images/transaction_list.svg" />
                </div>
                <div class="transaction_list_desctiption">
                  <h1 class="font-semibold text-lg text-[#292B2D]">Shopping</h1>
                  <span class="text-sm text-[#91919F]">Buy Some grocery</span>
                </div>
              </div>
              <div class="transaction_list_amount text-right">
                <h1 class="font-semibold text-lg text-[#FD3C4A]">$-120</h1>
                <span class="text-sm text-[#91919F]">10:00AM</span>
              </div>
            </div>
            <div
              class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2"
            >
              <div class="transaction_type flex gap-x-4">
                <div class="transaction_list_icon">
                  <img src="/images/transaction_list.svg" />
                </div>
                <div class="transaction_list_desctiption">
                  <h1 class="font-semibold text-lg text-[#292B2D]">Shopping</h1>
                  <span class="text-sm text-[#91919F]">Buy Some grocery</span>
                </div>
              </div>
              <div class="transaction_list_amount text-right">
                <h1 class="font-semibold text-lg text-[#FD3C4A]">$-120</h1>
                <span class="text-sm text-[#91919F]">10:00AM</span>
              </div>
            </div>
            <div
              class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2"
            >
              <div class="transaction_type flex gap-x-4">
                <div class="transaction_list_icon">
                  <img src="/images/transaction_list.svg" />
                </div>
                <div class="transaction_list_desctiption">
                  <h1 class="font-semibold text-lg text-[#292B2D]">Shopping</h1>
                  <span class="text-sm text-[#91919F]">Buy Some grocery</span>
                </div>
              </div>
              <div class="transaction_list_amount text-right">
                <h1 class="font-semibold text-lg text-[#FD3C4A]">$-120</h1>
                <span class="text-sm text-[#91919F]">10:00AM</span>
              </div>
            </div>
          </div>
        </div>

        <div class="py-2">
          <h1 class="font-semibold text-lg">Yesterday</h1>
          <div class="transaction_list pt-2">
            <div
              class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2"
            >
              <div class="transaction_type flex gap-x-4">
                <div class="transaction_list_icon">
                  <img src="/images/transaction_list.svg" />
                </div>
                <div class="transaction_list_desctiption">
                  <h1 class="font-semibold text-lg text-[#292B2D]">Shopping</h1>
                  <span class="text-sm text-[#91919F]">Buy Some grocery</span>
                </div>
              </div>
              <div class="transaction_list_amount text-right">
                <h1 class="font-semibold text-lg text-[#FD3C4A]">$-120</h1>
                <span class="text-sm text-[#91919F]">10:00AM</span>
              </div>
            </div>
            <div
              class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2"
            >
              <div class="transaction_type flex gap-x-4">
                <div class="transaction_list_icon">
                  <img src="/images/transaction_list.svg" />
                </div>
                <div class="transaction_list_desctiption">
                  <h1 class="font-semibold text-lg text-[#292B2D]">Shopping</h1>
                  <span class="text-sm text-[#91919F]">Buy Some grocery</span>
                </div>
              </div>
              <div class="transaction_list_amount text-right">
                <h1 class="font-semibold text-lg text-[#FD3C4A]">$-120</h1>
                <span class="text-sm text-[#91919F]">10:00AM</span>
              </div>
            </div>
            <div
              class="flex justify-between items-center bg-[#FCFCFC] p-4 rounded-lg mt-2"
            >
              <div class="transaction_type flex gap-x-4">
                <div class="transaction_list_icon">
                  <img src="/images/transaction_list.svg" />
                </div>
                <div class="transaction_list_desctiption">
                  <h1 class="font-semibold text-lg text-[#292B2D]">Shopping</h1>
                  <span class="text-sm text-[#91919F]">Buy Some grocery</span>
                </div>
              </div>
              <div class="transaction_list_amount text-right">
                <h1 class="font-semibold text-lg text-[#FD3C4A]">$-120</h1>
                <span class="text-sm text-[#91919F]">10:00AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const backAction = () => {
  router.back();
};
</script>

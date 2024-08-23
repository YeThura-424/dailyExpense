<template>
  <div class="min-h-screen bg-white">
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

        <div v-if="false" class="empty_account_state">
          <div class="text-center">
            <p class="text-base font-medium">You don't any account</p>
            <p class="text-base font-medium">
              Let's make one so you in control
            </p>
          </div>
        </div>

        <div
          class="budget-create fixed bottom-3 w-[95%] left-1/2 -translate-x-1/2"
        >
          <nuxt-link to="/account/add">
            <button
              type="button"
              class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
            >
              <Icon
                name="ion:ios-create"
                class="text-white text-2xl cursor-pointer"
              />
              Create a budget
            </button>
          </nuxt-link>
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

<style scoped>
.account_info {
  background-image: url("/images/account_bg.png");
}
</style>

<template>
  <div>
    <div class="px-4 pt-5 pb-[78px]">
      <div class="profile-info-wrapper flex items-center gap-x-3">
        <div class="profile-image rounded-full border-2 border-[#7F3DFF]">
          <img
            :src="user?.image ?? '/images/userprofile.png'"
            alt=""
            class="w-20 h-20 rounded-full p-1"
          />
        </div>
        <div class="user-info flex justify-between items-center gap-x-20">
          <div class="profile-user-info">
            <p class="text-base text-[#91919F]">Username</p>
            <h1 class="text-xl text-[#161719] capitalize font-semibold">
              {{ user.name }}
            </h1>
          </div>
          <div class="profile-info-edit">
            <Icon name="ion:edit" class="text-3xl cursor-pointer" />
          </div>
        </div>
      </div>

      <div class="profile-modules-wrapper bg-white rounded-[35px] mt-8">
        <!-- account  -->
        <nuxt-link to="/account">
          <div
            class="account-section flex items-center gap-x-3 border-b border-[#eee] px-4 py-4"
          >
            <div
              class="account-logo w-14 h-14 bg-[#EEE5FF] rounded-2xl flex justify-center items-center"
            >
              <Icon name="ion:ios-wallet" class="text-4xl text-[#7F3DFF]" />
            </div>
            <h1 class="text-[#292B2D] text-xl font-medium">Account</h1>
          </div>
        </nuxt-link>
        <!-- setting  -->
        <div
          class="account-section flex items-center gap-x-3 border-b border-[#eee] px-4 py-4"
        >
          <div
            class="account-logo w-14 h-14 bg-[#EEE5FF] rounded-2xl flex justify-center items-center"
          >
            <Icon name="ion:ios-settings" class="text-4xl text-[#7F3DFF]" />
          </div>
          <h1 class="text-[#292B2D] text-xl font-medium">Setting</h1>
        </div>
        <!-- category  -->
        <nuxt-link to="/category">
          <div
            class="account-section flex items-center gap-x-3 border-b border-[#eee] px-4 py-4"
          >
            <div
              class="account-logo w-14 h-14 bg-[#EEE5FF] rounded-2xl flex justify-center items-center"
            >
              <Icon name="ion:ios-list-box" class="text-4xl text-[#7F3DFF]" />
            </div>
            <h1 class="text-[#292B2D] text-xl font-medium">Category</h1>
          </div>
        </nuxt-link>
        <!-- export  -->
        <div
          class="account-section flex items-center gap-x-3 border-b border-[#eee] px-4 py-4"
        >
          <div
            class="account-logo w-14 h-14 bg-[#EEE5FF] rounded-2xl flex justify-center items-center"
          >
            <Icon name="ion:ios-cloud-upload" class="text-4xl text-[#7F3DFF]" />
          </div>
          <h1 class="text-[#292B2D] text-xl font-medium">Export</h1>
        </div>
        <!-- logout  -->
        <div
          @click.prevent="Logout"
          class="account-section flex items-center gap-x-3 border-b border-[#eee] px-4 py-4"
        >
          <div
            class="account-logo w-14 h-14 bg-[#FFE2E4] rounded-2xl flex justify-center items-center"
          >
            <Icon name="ion:ios-log-out" class="text-4xl text-[#FD3C4A]" />
          </div>
          <h1 class="text-[#292B2D] text-xl font-medium">Logout</h1>
        </div>
      </div>
    </div>

    <MobileMainNav />
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/authUser";

const { logUserOut } = useAuthStore();

const user = useCookie("user").value;

const Logout = async () => {
  await logUserOut();
};
</script>

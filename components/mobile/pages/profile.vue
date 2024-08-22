<template>
  <div>
    <div class="px-4 pt-5 pb-[78px]">
      <div class="profile-info-wrapper flex items-center gap-x-3">
        <div class="profile-image rounded-full border-2 border-[#7F3DFF]">
          <img
            src="/images/userprofile.png"
            alt=""
            class="w-20 h-20 rounded-full p-1"
          />
        </div>
        <div class="user-info flex justify-between items-center gap-x-20">
          <div class="profile-user-info">
            <p class="text-base text-[#91919F]">Username</p>
            <h1 class="text-xl text-[#161719] font-semibold">Rathan Poudle</h1>
          </div>
          <div class="profile-info-edit">
            <Icon name="ion:edit" class="text-3xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>

    <MobileMainNav />
  </div>
</template>

<script setup></script>

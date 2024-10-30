<template>
  <div class="profile-info-wrapper">
    <div class="profile_header">
      <MobilePageHeader title="Edit Profile" text-color="text-black" @back="backAction" />
    </div>
    <div class="profile-info-section">
      <div class="profile-tabs flex justify-between items-center bg-white shadow-md">
        <div v-for="tab in tabs" :key="tab" @click="changeTab(tab.key)" :class="['tab-list w-full']">
          <p
            :class="['text-center py-3 transition-all duration-700 text-base', activeTab == tab.key ? 'border-b-2 border-[#7f3dff] font-semibold' : 'border-b-2 border-white text-[#3f4142] font-medium']">
            {{ tab.name }}</p>
        </div>
      </div>
      <div class="profile-tab-content">
        <div v-if="activeTab == 'info'" class="profile-info flex justify-center py-4">
          <div
            class="user-prifile relative w-[200px] h-[200px] rounded-full border border-[#7f3dff] flex justify-center items-center">
            <img :src="user?.image ? user?.image : '/images/userprofile.png'" alt=""
              class="w-[190px] h-[190px] border border-[#ccbaf0] rounded-full" />
            <div class="upload-icon absolute bottom-9 right-1 bg-[#eee] h-6 cursor-pointer">
              <input id="upload-prifile" type="file" class="hidden" />
              <label for="upload-profile">
                <Icon name="ion:camera-outline" size="24" class="text-[#7f3dff]" />
              </label>
            </div>
          </div>
        </div>
        <div v-else class="profile-security">
          Password Tabs
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const route = useRoute();
const user = useCookie('user');

const tabs = [
  { name: 'Info', key: 'info' },
  { name: 'Password', key: 'password' }
]

const activeTab = ref(tabs[0].key);

const changeTab = (tab) => {
  activeTab.value = tab;
}
const backAction = () => {
  navigateTo('/profile');
}

</script>
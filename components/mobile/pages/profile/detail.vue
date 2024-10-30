<template>
  <div class="profile-info-wrapper">
    <div class="profile_header">
      <MobilePageHeader title="Edit Profile" text-color="text-black" @back="backAction" />
    </div>
    <div class="profile-info">
      <div class="profile-tabs flex justify-between items-center bg-white shadow-md">
        <div v-for="tab in tabs" :key="tab" @click="changeTab(tab.key)" :class="['tab-list w-full']">
          <p
            :class="['text-center py-3 transition-all duration-700 text-base', activeTab == tab.key ? 'border-b-2 border-[#7f3dff] font-semibold' : 'border-b-2 border-white text-[#3f4142] font-medium']">
            {{ tab.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

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
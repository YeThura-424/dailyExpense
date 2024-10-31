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
        <div v-if="activeTab == 'info'" class="profile-info flex flex-col justify-center items-center gap-y-4 py-4">
          <div
            class="user-prifile relative w-[200px] h-[200px] rounded-full border border-[#7f3dff] flex justify-center items-center">
            <img v-if="userProfilePreview" :src="userProfilePreview" />
            <img v-else :src="user?.image ? user?.image : '/images/userprofile.png'" alt=""
              class="w-[190px] h-[190px] border border-[#ccbaf0] rounded-full" />
            <div class="upload-icon absolute bottom-9 right-1 bg-[#eee] h-6">
              <div for="upload-profile relative w-6 h-6">
                <Icon name="ion:camera-outline" size="24" class="text-[#7f3dff]" />
                <input id="upload-prifile" type="file" @change="handleUpload"
                  class="opacity-0 w-full h-full absolute right-0 cursor-pointer" />
              </div>
            </div>
          </div>
          <div class="user-profile-info w-full py-4 px-6">
            <div class="username py-2">
              <label class="text-lg text-[#3f4142] font-medium" for="username">Name</label>
              <CoreInputBox v-model="userInfo.name" type="text" />
            </div>
            <div class="email py-2">
              <label class="text-lg text-[#3f4142] font-medium" for="username">Email</label>
              <CoreInputBox v-model="userInfo.email" type="email" disabled />
            </div>
            <div class="currency py-2">
              <label class="text-lg text-[#3f4142] font-medium" for="currency">Currency</label>
              <CoreSelectBox v-model="userInfo.currency" placeholder="Select Default Currency" :options="currency"
                show-icon />
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
const user = useCookie('user');
const userInfo = reactive({
  name: user.value.name,
  profile: user.value.image,
  email: user.value.email,
  currency: user.value.currency,
})

const userProfilePreview = ref(null);
const tabs = [
  { name: 'Info', key: 'info' },
  { name: 'Password', key: 'password' }
]

const currency = ref([
  { name: 'Ks', value: 'ks', icon: '/images/ks.png' },
  { name: 'USD', value: 'usd', icon: '/images/dollar.png' },
  { name: 'Baht', value: 'bhat', icon: '/images/baht.png' },
])

const activeTab = ref(tabs[0].key);

const changeTab = (tab) => {
  activeTab.value = tab;
}

const backAction = () => {
  navigateTo('/profile');
}

const handleUpload = (e) => {
  userInfo.profile = e.target.files;
  userProfilePreview.value = URL.createObjectURL(e.target.files[0])
};
</script>
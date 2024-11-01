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
        <div v-if="activeTab == 'info'" class="profile-info flex flex-col justify-center items-center gap-y-4 pt-4">
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
          <div class="user-profile-info w-full pt-4 px-6">
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
                show-icon option-key="value" />
            </div>
            <div class="update-button py-4">
              <button @click="updateProfile" type="button"
                class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer">
                <Icon name="ion:arrow-up-right-box" class="text-white text-2xl cursor-pointer" />
                Update
              </button>
            </div>
          </div>
        </div>
        <div v-else class="profile-security">
          <div class="user-profile-info w-full pt-4 px-6">
            <div class="oldpassword py-2">
              <label class="text-lg text-[#3f4142] font-medium" for="oldpassword">Old Password</label>
              <CoreInputBox v-model="userPassword.old_password" type="password" placeholder="Old Password" />
              <p v-if="passwordUpdate?.old_password && !userPassword.old_password"
                class="text-sm text-red-600 font-normal">{{
                  passwordUpdate.old_password[0] }}
              </p>
            </div>
            <div class="newpassword py-2">
              <label class="text-lg text-[#3f4142] font-medium" for="newpassword">New Password</label>
              <CoreInputBox v-model="userPassword.new_password" type="password" placeholder="Old Password" />
              <p v-if="passwordUpdate?.new_password && !userPassword.new_password"
                class="text-sm text-red-600 font-normal">{{
                  passwordUpdate.new_password[0] }}
              </p>
            </div>
            <div class="newpassword py-2">
              <label class="text-lg text-[#3f4142] font-medium" for="confirmpassword">Confirm New Password</label>
              <CoreInputBox v-model="userPassword.confirm_password" type="password" placeholder="Old Password" />
              <p v-if="passwordUpdate?.confirm_password && (!userPassword.confirm_password || userPassword.confirm_password.length < 6)"
                class="text-sm text-red-600 font-normal">{{
                  passwordUpdate.confirm_password[0] }}
              </p>
            </div>
            <div class="update-button py-4">
              <button @click="updatePassword" type="button"
                class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer">
                <Icon name="ion:arrow-up-right-box" class="text-white text-2xl cursor-pointer" />
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useCookie('user');
const passwordUpdate = ref([]);
const userInfo = reactive({
  name: user.value.name,
  profile: user.value.image,
  email: user.value.email,
  currency: user.value.currency,
})

const userPassword = reactive({
  old_password: null,
  new_password: null,
  confirm_password: null
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

const updateProfile = async () => {
  if (userProfilePreview.value) {
    const formData = new FormData();
    formData.append('name', userInfo.name);
    formData.append('currency', userInfo.currency);
    formData.append('image', userInfo.profile);

    await useFetch(`/api/file-upload/profile-update/${user.value.id}`, {
      method: "POST",
      body: formData,
      transform: (response) => {
        console.log(response, 'updating with image');
      }
    })
  } else {
    console.log(userInfo);
    await useFetch(`/api/profile-update/${user.value.id}`, {
      method: "POST",
      body: userInfo,
      transform: (response) => {
        console.log(response, 'normal updating');
      }
    })
  }
}

const updatePassword = async () => {
  const { data, error } = await useFetch(`/api/change-password/${user.value.id}`, {
    method: "POST",
    body: userPassword,
    transform: (response) => {
      return response
    }
  })
  console.log('update password ', data)
  if (error?.value) {
    passwordUpdate.value = error.value?.data?.data?.errors;
  }
}
</script>
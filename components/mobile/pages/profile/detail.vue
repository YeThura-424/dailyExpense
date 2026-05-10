<template>
  <div class="profile-info-wrapper">
    <div class="profile_header">
      <MobilePageHeader
        title="Edit Profile"
        text-color="text-black"
        bg-color="bg-slate-100"
        @back="backAction"
      />
    </div>
    <div class="profile-info-section">
      <div
        class="profile-tabs flex justify-between items-center bg-white shadow-md"
      >
        <div
          v-for="tab in tabs"
          :key="tab"
          @click="changeTab(tab.key)"
          :class="['tab-list w-full']"
        >
          <p
            :class="[
              'text-center py-3 transition-all duration-700 text-base',
              activeTab == tab.key
                ? 'border-b-2 border-[#7f3dff] font-semibold'
                : 'border-b-2 border-white text-[#3f4142] font-medium',
            ]"
          >
            {{ tab.name }}
          </p>
        </div>
      </div>
      <div class="profile-tab-content">
        <div
          v-if="activeTab == 'info' && profile"
          class="profile-info flex flex-col justify-center items-center gap-y-4 pt-4"
        >
          <div
            class="user-prifile relative w-[200px] h-[200px] rounded-full border border-[#7f3dff] flex justify-center items-center"
          >
            <img
              v-if="userProfilePreview"
              :src="userProfilePreview"
              class="w-[190px] h-[190px] border border-[#ccbaf0] rounded-full"
            />
            <img
              v-else
              :src="
                profile?.avatar_url
                  ? getUserProfilePhoto(profile?.avatar_url)
                  : '/images/userprofile.png'
              "
              alt=""
              class="w-[190px] h-[190px] border border-[#ccbaf0] rounded-full"
            />
            <div class="upload-icon absolute bottom-9 right-1 bg-[#eee] h-6">
              <div for="upload-profile relative w-6 h-6">
                <Icon
                  name="ion:camera-outline"
                  size="24"
                  class="text-[#7f3dff]"
                />
                <input
                  id="upload-prifile"
                  type="file"
                  @change="handleUpload"
                  class="opacity-0 w-full h-full absolute right-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div class="user-profile-info w-full pt-4 px-6">
            <div class="username py-2">
              <label class="text-lg text-[#3f4142] font-medium" for="username"
                >Name</label
              >
              <CoreInputBox v-model="userInfo.name" type="text" />
            </div>
            <div class="email py-2">
              <label class="text-lg text-[#3f4142] font-medium" for="username"
                >Email</label
              >
              <CoreInputBox v-model="userInfo.email" type="email" disabled />
            </div>
            <div class="currency py-2">
              <label class="text-lg text-[#3f4142] font-medium" for="currency"
                >Currency</label
              >
              <CoreSelectBox
                v-model="userInfo.currency"
                placeholder="Select Default Currency"
                :options="currency"
                show-icon
                option-key="value"
              />
            </div>
            <div class="update-button py-4">
              <button
                @click="updateUserProfile"
                type="button"
                :disabled="!shouldUpdate"
                class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon
                  name="ion:arrow-up-right-box"
                  class="text-white text-2xl cursor-pointer"
                />
                Update
              </button>
            </div>
          </div>
          <div v-if="userLoading" class="loading-container">
            <MobileLoadingDots />
          </div>
        </div>
        <div v-else class="profile-security">
          <div class="user-profile-info w-full pt-4 px-6">
            <!-- <div class="oldpassword py-2">
              <label
                class="text-lg text-[#3f4142] font-medium"
                for="oldpassword"
                >Old Password</label
              >
              <CoreInputBox
                v-model="userPassword.old_password"
                type="password"
                placeholder="Old Password"
              />
              <p
                v-if="
                  passwordUpdate?.old_password && !userPassword.old_password
                "
                class="text-sm text-red-600 font-normal"
              >
                {{ passwordUpdate.old_password[0] }}
              </p>
            </div> -->
            <div class="newpassword py-2">
              <label
                class="text-lg text-[#3f4142] font-medium"
                for="newpassword"
                >New Password</label
              >
              <CoreInputBox
                v-model="userPassword.new_password"
                type="password"
                placeholder="New Password"
                :input-class="
                  passwordMatch
                    ? 'text-xl px-4 py-2 rounded-xl h-14 w-full focus:outline-none border border-[#91919F]'
                    : 'text-xl px-4 py-2 rounded-xl h-14 w-full focus:outline-none border border-red-600 text-red-600'
                "
              />
            </div>
            <div class="newpassword py-2">
              <label
                class="text-lg text-[#3f4142] font-medium"
                for="confirmpassword"
                >Confirm New Password</label
              >
              <CoreInputBox
                v-model="userPassword.confirm_password"
                type="password"
                placeholder="Confirm New Password"
                :input-class="
                  passwordMatch
                    ? 'text-xl px-4 py-2 rounded-xl h-14 w-full focus:outline-none border border-[#91919F]'
                    : 'text-xl px-4 py-2 rounded-xl h-14 w-full focus:outline-none border border-red-600 text-red-600'
                "
              />
            </div>
            <div class="update-button py-4">
              <button
                @click="updateUserPassword"
                type="button"
                class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
              >
                <Icon
                  name="ion:arrow-up-right-box"
                  class="text-white text-2xl cursor-pointer"
                />
                Change
              </button>
            </div>
          </div>
          <div v-if="userLoading" class="loading-container">
            <MobileLoadingDots />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../../../store/user";

const user = useCookie("user");
const profile = useCookie("profile");
const {
  getSession,
  updateProfile,
  getUserProfilePhoto,
  updatePassword,
  logout,
} = useUserStore();
const passwordMatch = ref(true);

const passwordUpdate = ref([]);
const userInfo = reactive({
  name: profile.value?.username,
  profile: profile.value?.avatar_url,
  newProfile: null,
  email: user.value?.email,
  currency: profile.value?.currency,
});

const userLoading = ref(false);
const shouldUpdate = ref(false);
const userPassword = reactive({
  new_password: null,
  confirm_password: null,
});
const userProfilePreview = ref(null);
const tabs = [
  { name: "Info", key: "info" },
  { name: "Password", key: "password" },
];

const currency = ref([
  { name: "Ks", value: "ks", icon: "/images/ks.png" },
  { name: "USD", value: "usd", icon: "/images/dollar.png" },
  { name: "Baht", value: "baht", icon: "/images/baht.png" },
]);

watch(
  () => userInfo,
  (newUserInfo) => {
    // to make sure update button is disabled for not updating data situation
    if (
      newUserInfo.name == user.value.name &&
      newUserInfo.profile == user.value.image &&
      newUserInfo.currency == user.value.currency
    ) {
      shouldUpdate.value = false;
    } else {
      shouldUpdate.value = true;
    }
  },
  { deep: true }
);

watch(
  () => userPassword,
  (updateVal) => {
    if (
      updateVal.confirm_password &&
      updateVal.new_password != updateVal.confirm_password
    ) {
      passwordMatch.value = false;
    } else {
      passwordMatch.value = true;
    }
  },
  { deep: true }
);

const activeTab = ref(tabs[0].key);

const changeTab = (tab) => {
  activeTab.value = tab;
};

const backAction = () => {
  navigateTo("/profile");
};

const handleUpload = (e) => {
  userInfo.newProfile = e.target.files;
  userProfilePreview.value = URL.createObjectURL(e.target.files[0]);
};

const updateUserProfile = async () => {
  userLoading.value = true;
  console.log(userInfo, "logging hererer");

  const result = await updateProfile(userInfo);
  userLoading.value = false;
  if (result.success) {
    useNuxtApp().$toast.success("Profile Updated Successfully!!");
    profile.value = result.data;
  } else {
    useNuxtApp().$toast.error(result.error);
  }
};

const updateUserPassword = async () => {
  if (!userPassword.new_password || !userPassword.confirm_password) {
    useNuxtApp().$toast.error("New password cann't be empty");
    return false;
  }

  if (userPassword.new_password != userPassword.confirm_password) {
    useNuxtApp().$toast.error("Password and comfirm password doesn't match!");
    return false;
  }
  userLoading.value = true;

  const result = await updatePassword(userPassword);

  if (result.success) {
    useNuxtApp().$toast.success("Password updated successfully");
    logout();
    navigateTo("/");
  } else {
    userLoading.value = false;
    useNuxtApp().$toast.error(result.error);
  }
};

await getSession();
</script>

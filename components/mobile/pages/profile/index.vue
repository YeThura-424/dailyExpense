<template>
  <div class="content-page profile-page">
    <header class="profile-overview surface-card"><img :src="profile?.avatar_url ? getUserProfilePhoto(profile.avatar_url) : '/images/userprofile.png'" alt="Your profile" /><div><p class="eyebrow">YOUR ACCOUNT</p><h2>{{ profile?.username || 'Your profile' }}</h2><p>{{ user?.email }}</p></div><button type="button" class="button-secondary" aria-label="Edit profile" @click="editProfile(user?.id)"><Icon name="ion:create-outline" /><span>Edit profile</span></button></header>
    <div class="profile-navigation">
      <NuxtLink to="/account" class="profile-tile"><span class="profile-tile-icon"><Icon name="ion:wallet-outline" /></span><div><h3>Wallets</h3><p>Your accounts and balances</p></div><Icon name="ion:chevron-forward" /></NuxtLink>
      <NuxtLink :to="`/profile/${user?.id}`" class="profile-tile"><span class="profile-tile-icon"><Icon name="ion:settings-outline" /></span><div><h3>Settings</h3><p>Profile, currency, and security</p></div><Icon name="ion:chevron-forward" /></NuxtLink>
      <NuxtLink to="/category" class="profile-tile"><span class="profile-tile-icon"><Icon name="ion:pricetags-outline" /></span><div><h3>Categories</h3><p>Organise your everyday spending</p></div><Icon name="ion:chevron-forward" /></NuxtLink>
      <NuxtLink to="/export" class="profile-tile"><span class="profile-tile-icon"><Icon name="ion:download-outline" /></span><div><h3>Export data</h3><p>Keep a copy of your records</p></div><Icon name="ion:chevron-forward" /></NuxtLink>
    </div>
    <button type="button" class="profile-logout" :disabled="loading" @click.prevent="Logout"><Icon name="ion:log-out-outline" />{{ loading ? 'Signing out…' : 'Sign out of your account' }}</button>
    <MobileLoadingDots v-if="loading && !profile" />
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";

const { logout, getUserProfilePhoto } = useUserStore();
const loading = ref(false);

const user = useCookie("user");
const profile = useCookie("profile");

const editProfile = (id) => {
  navigateTo(`/profile/${id}`);
};

const Logout = async () => {
  loading.value = true;
  const data = await logout();

  loading.value = false;
  if (data === true) return navigateTo('/login');
  useNuxtApp().$toast.error(data.error);
};
</script>

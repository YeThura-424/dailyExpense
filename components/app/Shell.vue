<template>
  <div class="app-shell" :class="{ 'has-mobile-nav': mobileNavigation }">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <aside class="app-sidebar" aria-label="Main navigation">
      <NuxtLink to="/" class="app-brand" aria-label="Daily Expense home">
        <span class="brand-mark"><Icon name="ion:wallet-outline" /></span>
        <span class="brand-copy">Daily<span>Expense</span></span>
      </NuxtLink>
      <p class="nav-caption">WORKSPACE</p>
      <nav class="sidebar-links">
        <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to" :class="['sidebar-link', { 'is-active': isActive(item.to) }]" :aria-current="isActive(item.to) ? 'page' : undefined" :title="item.label">
          <Icon :name="item.icon" /><span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
      <div class="sidebar-bottom">
        <div class="sidebar-note"><span class="text-[#7F3DFF]">A little clarity, every day.</span><p>Make space for the things that matter.</p></div>
        <NuxtLink to="/profile" class="sidebar-profile" title="Your profile">
          <img :src="avatar" alt="" /><span><strong>{{ profile?.username || 'Your account' }}</strong><small>Manage your profile</small></span><Icon name="ion:chevron-forward" />
        </NuxtLink>
      </div>
    </aside>
    <div class="app-workspace">
      <header class="workspace-header">
        <div><p class="eyebrow">YOUR PERSONAL FINANCE SPACE</p><h1>{{ pageTitle }}</h1></div>
        <div class="header-actions">
          <NuxtLink to="/transfer" class="button-secondary"><Icon name="ion:swap-horizontal-outline" /><span>Transfer</span></NuxtLink>
          <NuxtLink to="/expense" class="button-primary"><Icon name="ion:add" /><span>Add expense</span></NuxtLink>
        </div>
      </header>
      <main id="main-content" class="app-main" tabindex="-1"><slot /></main>
      <footer class="workspace-footer">A clearer view of your everyday spending.</footer>
    </div>
    <MobileMainNav v-if="mobileNavigation" />
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/user';
defineProps({ mobileNavigation: { type: Boolean, default: true } });
const route = useRoute();
const users = useUserStore();
const { profile } = storeToRefs(users);
const avatar = computed(() => profile.value?.avatar_url ? users.getUserProfilePhoto(profile.value.avatar_url) : '/images/userprofile.png');
const navigation = [
  { to: '/', label: 'Overview', icon: 'ion:grid-outline' },
  { to: '/transaction', label: 'Transactions', icon: 'ion:swap-horizontal-outline' },
  { to: '/account', label: 'Wallets', icon: 'ion:wallet-outline' },
  { to: '/budget', label: 'Budgets', icon: 'ion:pie-chart-outline' },
  { to: '/category', label: 'Categories', icon: 'ion:pricetags-outline' },
  { to: '/export', label: 'Export data', icon: 'ion:download-outline' },
  { to: '/profile', label: 'Profile', icon: 'ion:person-outline' },
];
const isActive = (path) => path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(path + '/');
const pageTitle = computed(() => navigation.find(item => isActive(item.to))?.label || ({ income: 'Income', expense: 'Expense', transfer: 'Transfer' }[route.path.split('/')[1]]) || 'Daily Expense');
</script>

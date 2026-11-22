<template>
  <nav class="mobile-nav" aria-label="Main navigation">
    <NuxtLink v-for="item in links.slice(0, 2)" :key="item.to" :to="item.to" :class="['mobile-nav-link', { 'is-active': active(item.to) }]" :aria-current="active(item.to) ? 'page' : undefined"><Icon :name="item.icon" /><span>{{ item.label }}</span></NuxtLink>
    <button type="button" class="mobile-add" aria-label="Add transaction or transfer" :aria-expanded="openMenu" @click="openMenu = true"><Icon name="ion:add" /></button>
    <NuxtLink v-for="item in links.slice(2)" :key="item.to" :to="item.to" :class="['mobile-nav-link', { 'is-active': active(item.to) }]" :aria-current="active(item.to) ? 'page' : undefined"><Icon :name="item.icon" /><span>{{ item.label }}</span></NuxtLink>
    <CoreMenuModelOld :visible="openMenu" @dismiss="openMenu = $event" />
  </nav>
</template>
<script setup>
const route = useRoute();
const openMenu = ref(false);
const links = [
  { to: '/', label: 'Overview', icon: 'ion:grid-outline' },
  { to: '/transaction', label: 'Activity', icon: 'ion:swap-horizontal-outline' },
  { to: '/budget', label: 'Budgets', icon: 'ion:pie-chart-outline' },
  { to: '/profile', label: 'Profile', icon: 'ion:person-outline' },
];
const active = path => path === '/' ? route.path === '/' : route.path.startsWith(path);
watch(() => route.path, () => { openMenu.value = false; });
</script>

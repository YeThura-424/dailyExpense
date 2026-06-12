<script setup>
definePageMeta({
  middleware: "auth",
});

useHead({
  title: 'Profile — Daily Expense',
  meta: [
    { name: 'description', content: 'View and manage your profile settings in Daily Expense.' },
    { property: 'og:title', content: 'Profile — Daily Expense' },
    { property: 'og:description', content: 'View and manage your profile settings in Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
})
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesProfile v-else />
  </div>
</template>

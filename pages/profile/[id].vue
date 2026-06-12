<script setup>
definePageMeta({
  middleware: "auth",
  layout: 'no-nav'
});

useHead({
  title: 'Profile Detail — Daily Expense',
  meta: [
    { name: 'description', content: 'View detailed profile information in Daily Expense.' },
    { property: 'og:title', content: 'Profile Detail — Daily Expense' },
    { property: 'og:description', content: 'View detailed profile information in Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
})
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesProfileDetail v-else />
  </div>
</template>

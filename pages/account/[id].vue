<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Account Details — Daily Expense',
  meta: [
    { name: 'description', content: 'View and manage account details in Daily Expense.' },
    { property: 'og:title', content: 'Account Details — Daily Expense' },
    { property: 'og:description', content: 'View and manage account details in Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAccountDetail v-else />
  </div>
</template>

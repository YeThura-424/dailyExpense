<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Add Account — Daily Expense',
  meta: [
    { name: 'description', content: 'Create a new account in Daily Expense.' },
    { property: 'og:title', content: 'Add Account — Daily Expense' },
    { property: 'og:description', content: 'Create a new account in Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAccountAdd v-else />
  </div>
</template>

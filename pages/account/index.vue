<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Accounts — Daily Expense',
  meta: [
    { name: 'description', content: 'Manage your accounts and wallets on Daily Expense.' },
    { property: 'og:title', content: 'Accounts — Daily Expense' },
    { property: 'og:description', content: 'Manage your accounts and wallets on Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAccount v-else />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: 'no-nav'
});

useHead({
  title: 'Expense — Daily Expense',
  meta: [
    { name: 'description', content: 'Manage and view your expense records on Daily Expense.' },
    { property: 'og:title', content: 'Expense — Daily Expense' },
    { property: 'og:description', content: 'Manage and view your expense records on Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesExpense v-else />
  </div>
</template>

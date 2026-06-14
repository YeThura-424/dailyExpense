<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Expense Detail — Daily Expense',
  meta: [
    { name: 'description', content: 'View and edit expense transaction details on Daily Expense.' },
    { property: 'og:title', content: 'Expense Detail — Daily Expense' },
    { property: 'og:description', content: 'View and edit expense transaction details on Daily Expense.' },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesExpenseDetail v-else />
  </div>
</template>

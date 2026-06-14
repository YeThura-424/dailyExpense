<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Income Detail — Daily Expense',
  meta: [
    { name: 'description', content: 'View and edit income transaction details on Daily Expense.' },
    { property: 'og:title', content: 'Income Detail — Daily Expense' },
    { property: 'og:description', content: 'View and edit income transaction details on Daily Expense.' },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesIncomeDetail v-else />
  </div>
</template>

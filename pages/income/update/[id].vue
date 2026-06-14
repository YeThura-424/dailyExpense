<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Update Income — Daily Expense',
  meta: [
    { name: 'description', content: 'Update an existing income transaction on Daily Expense.' },
    { property: 'og:title', content: 'Update Income — Daily Expense' },
    { property: 'og:description', content: 'Update an existing income transaction on Daily Expense.' },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesIncomeUpdate v-else />
  </div>
</template>

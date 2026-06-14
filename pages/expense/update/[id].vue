<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Update Expense — Daily Expense',
  meta: [
    { name: 'description', content: 'Update an existing expense transaction on Daily Expense.' },
    { property: 'og:title', content: 'Update Expense — Daily Expense' },
    { property: 'og:description', content: 'Update an existing expense transaction on Daily Expense.' },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesExpenseUpdate v-else />
  </div>
</template>

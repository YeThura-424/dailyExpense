<script setup>
definePageMeta({
  middleware: "auth",
  layout: 'no-nav'
});

useHead({
  title: 'Income — Daily Expense',
  meta: [
    { name: 'description', content: 'Manage and view your income records on Daily Expense.' },
    { property: 'og:title', content: 'Income — Daily Expense' },
    { property: 'og:description', content: 'Manage and view your income records on Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesIncome v-else />
  </div>
</template>

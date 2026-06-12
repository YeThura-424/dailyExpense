<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav",
});

useHead({
  title: 'Export — Daily Expense',
  meta: [
    { name: 'description', content: 'Export your transactions from Daily Expense in CSV or JSON formats.' },
    { property: 'og:title', content: 'Export — Daily Expense' },
    { property: 'og:description', content: 'Export your transactions from Daily Expense in CSV or JSON formats.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
})
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesExport v-else />
  </div>
</template>

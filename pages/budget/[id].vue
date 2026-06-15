<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Budget Details — Daily Expense',
  meta: [
    { name: 'description', content: 'View and edit budget details in Daily Expense.' },
    { property: 'og:title', content: 'Budget Details — Daily Expense' },
    { property: 'og:description', content: 'View and edit budget details in Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesBudgetDetail v-else />
  </div>
</template>

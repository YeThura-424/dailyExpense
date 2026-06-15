<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Create Budget — Daily Expense',
  meta: [
    { name: 'description', content: 'Create a new budget in Daily Expense.' },
    { property: 'og:title', content: 'Create Budget — Daily Expense' },
    { property: 'og:description', content: 'Create a new budget in Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesBudgetCreate v-else />
  </div>
</template>

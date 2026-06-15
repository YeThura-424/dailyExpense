<script setup>
definePageMeta({
  middleware: "auth",
});

useHead({
  title: 'Budget — Daily Expense',
  meta: [
    { name: 'description', content: 'Create and manage your budgets on Daily Expense.' },
    { property: 'og:title', content: 'Budget — Daily Expense' },
    { property: 'og:description', content: 'Create and manage your budgets on Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesBudget v-else />
  </div>
</template>

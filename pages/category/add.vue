<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Add Category — Daily Expense',
  meta: [
    { name: 'description', content: 'Create a new category in Daily Expense.' },
    { property: 'og:title', content: 'Add Category — Daily Expense' },
    { property: 'og:description', content: 'Create a new category in Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesCategoryAdd v-else />
  </div>
</template>

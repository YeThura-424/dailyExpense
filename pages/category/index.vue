<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Category — Daily Expense',
  meta: [
    { name: 'description', content: 'Manage and view your categories on Daily Expense.' },
    { property: 'og:title', content: 'Category — Daily Expense' },
    { property: 'og:description', content: 'Manage and view your categories on Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesCategoryList v-else />
  </div>
</template>

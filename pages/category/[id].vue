<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});

useHead({
  title: 'Edit Category — Daily Expense',
  meta: [
    { name: 'description', content: 'Edit category details in Daily Expense.' },
    { property: 'og:title', content: 'Edit Category — Daily Expense' },
    { property: 'og:description', content: 'Edit category details in Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesCategoryEdit v-else />
  </div>
</template>

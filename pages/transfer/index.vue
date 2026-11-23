<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav",
});

useHead({
  title: 'Transfer — Daily Expense',
  meta: [
    { name: 'description', content: 'Transfer funds between wallets and record transfers in Daily Expense.' },
    { property: 'og:title', content: 'Transfer — Daily Expense' },
    { property: 'og:description', content: 'Transfer funds between wallets and record transfers in Daily Expense.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' }
  ]
})
</script>

<template>
  <div>
    <LazyMobilePagesTransfer />
  </div>
</template>

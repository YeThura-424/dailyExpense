<script setup>
definePageMeta({
  middleware: "auth",
});

useHead({
  title: 'Transactions | Daily Expense Tracker',
  meta: [
    {
      name: 'description',
      content: 'View and manage all your transactions, track expenses and income, filter by category, and analyze your spending patterns.'
    },
    {
      property: 'og:title',
      content: 'Transactions | Daily Expense Tracker'
    },
    {
      property: 'og:description',
      content: 'Access your complete transaction history to track expenses, monitor income, and manage your finances.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:title',
      content: 'Transactions | Daily Expense Tracker'
    },
    {
      name: 'twitter:description',
      content: 'Manage your transactions, review spending history, and organize your expenses by category.'
    }
  ]
})
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesTransaction v-else />
  </div>
</template>

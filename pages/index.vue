<script setup>
definePageMeta({
  middleware: "auth",
});

useHead({
  title: 'Daily Expense Tracker | Dashboard',
  meta: [
    {
      name: 'description',
      content: 'View your expense dashboard, track spending patterns, monitor budgets, and manage your financial activities at a glance.'
    },
    {
      property: 'og:title',
      content: 'Dashboard | Daily Expense Tracker'
    },
    {
      property: 'og:description',
      content: 'Access your expense dashboard to track spending, manage budgets, and control your personal finances.'
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
      content: 'Dashboard | Daily Expense Tracker'
    },
    {
      name: 'twitter:description',
      content: 'View your expense summary, spending patterns, and budget status on your personal dashboard.'
    }
  ]
})
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePages v-else />
  </div>
</template>

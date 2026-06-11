<script setup>
definePageMeta({
  middleware: "auth",
  layout: "auth"
});

useHead({
  title: 'Daily Expense Tracker | Track Expenses & Manage Your Budget',
  meta: [
    {
      name: 'description',
      content: 'Sign in to Daily Expense Tracker to manage your expenses, track spending habits, monitor budgets, and gain better control of your personal finances.'
    },
    {
      property: 'og:title',
      content: 'Login | Daily Expense Tracker'
    },
    {
      property: 'og:description',
      content: 'Access your Daily Expense Tracker account to track expenses, manage budgets, and monitor your financial activities.'
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
      content: 'Login | Daily Expense Tracker'
    },
    {
      name: 'twitter:description',
      content: 'Sign in to your Daily Expense Tracker account and stay on top of your spending, budgeting, and financial goals.'
    }
  ]
})
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAuthLogin v-else />
  </div>
</template>

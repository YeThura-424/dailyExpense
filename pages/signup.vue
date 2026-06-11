<script setup>
definePageMeta({
  middleware: "auth",
  layout: "auth"
});

useHead({
  title: 'Sign Up | Daily Expense Tracker',
  meta: [
    {
      name: 'description',
      content: 'Create your Daily Expense Tracker account and start tracking expenses, managing budgets, and improving your financial habits today.'
    },
    {
      property: 'og:title',
      content: 'Sign Up | Daily Expense Tracker'
    },
    {
      property: 'og:description',
      content: 'Join Daily Expense Tracker to monitor spending, organize expenses, and achieve your financial goals.'
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
      content: 'Sign Up | Daily Expense Tracker'
    },
    {
      name: 'twitter:description',
      content: 'Create a free account and take control of your expenses, budgets, and personal finances.'
    }
  ]
})
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAuthSignup v-else />
  </div>
</template>

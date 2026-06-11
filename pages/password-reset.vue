<script setup>
definePageMeta({
  layout: "auth"
});

useHead({
  title: 'Forgot Password | Daily Expense Tracker',
  meta: [
    {
      name: 'description',
      content: 'Reset your Daily Expense Tracker account password and regain access to your expense records and budgeting tools.'
    },
    {
      property: 'og:title',
      content: 'Forgot Password | Daily Expense Tracker'
    },
    {
      property: 'og:description',
      content: 'Request a password reset to securely access your Daily Expense Tracker account.'
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
      content: 'Forgot Password | Daily Expense Tracker'
    },
    {
      name: 'twitter:description',
      content: 'Reset your password and securely regain access to your Daily Expense Tracker account.'
    }
  ]
})
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAuthPasswordReset v-else />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: 'no-nav'
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesIncome v-else />
  </div>
</template>

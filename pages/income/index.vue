<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesIncome v-else />
  </div>
</template>

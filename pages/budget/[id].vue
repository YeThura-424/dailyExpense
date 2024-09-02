<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesBudgetDetail v-else />
  </div>
</template>

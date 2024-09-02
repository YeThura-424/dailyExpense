<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesBudget v-else />
  </div>
</template>

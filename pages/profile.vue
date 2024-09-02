<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesProfile v-else />
  </div>
</template>

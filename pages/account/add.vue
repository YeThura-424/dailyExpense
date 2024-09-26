<script setup>
definePageMeta({
  middleware: "auth",
  layout: "no-nav"
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAccountAdd v-else />
  </div>
</template>

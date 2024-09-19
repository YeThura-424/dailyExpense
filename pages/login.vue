<script setup>
definePageMeta({
  middleware: "auth",
  layout: "auth"
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAuthLogin v-else />
  </div>
</template>

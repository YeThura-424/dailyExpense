<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAuthSignup v-else />
  </div>
</template>

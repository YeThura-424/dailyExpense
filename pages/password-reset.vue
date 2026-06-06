<script setup>
definePageMeta({
  layout: "auth"
});
</script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAuthPasswordReset v-else />
  </div>
</template>

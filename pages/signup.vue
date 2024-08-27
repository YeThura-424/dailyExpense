<script setup></script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAuthSignUp v-else />
  </div>
</template>

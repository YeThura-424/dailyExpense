<script setup></script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAuthLogin v-else />
  </div>
</template>

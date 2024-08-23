<script setup></script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesAccountAdd v-else />
  </div>
</template>

<script setup></script>

<template>
  <div>
    <LazyDesktop v-if="$device.isDesktopOrTablet" />
    <LazyMobilePagesBudgetDetail v-else />
  </div>
</template>

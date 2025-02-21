<template>
  <VueSlider
    v-model="slideValue"
    :height="15"
    :processStyle="{ backgroundColor: '#7f3dff' }"
    :tooltipStyle="{ color: '#fff', backgroundColor: '#7f3dff' }"
    :dotSize="28"
    :dotStyle="{
      backgroundColor: '#7f3dff',
      boxShadow: '0px 0px 0px 6px #fff',
    }"
  >
  </VueSlider>
</template>

<script setup>
import VueSlider from "vue-3-slider-component";

const slideValue = defineModel();
</script>

<style>
.vue-slider-dot-tooltip-inner-top:after {
  border-top-color: #7f3dff !important;
}
</style>

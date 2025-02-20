<template>
  <VueSlider
    v-model="slideValue"
    :height="20"
    :processStyle="{ backgroundColor: '#7f3dff' }"
    tooltip="none"
  >
    <template #dot="{ pos, index, value, focus, disabled }">
      <div
        class="flex justify-center items-center"
        style="
          width: 54px;
          height: 30px;
          background-color: #7f3dff;
          border-radius: 50px;
          color: white;
          box-shadow: 0 0 0 10px #fff;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        "
      >
        {{ Math.ceil(value) }}
      </div>
    </template>
  </VueSlider>
</template>

<script setup>
import VueSlider from "vue-3-slider-component";

const slideValue = ref(0);
</script>

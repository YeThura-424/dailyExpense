<template>
  <div class="range-slider-wrapper">
    <input type="range" class="range" />
  </div>
</template>

<script setup>
//
</script>

<style>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  height: 14px;
  background: #e3e5e5;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 30px;
  width: 54px;
  background-color: #7f3dff;
  border-radius: 50px;
  border: none;
  transition: 0.2s ease-in-out;
  box-shadow: 0 0 0 6px #fff;
}

input[type="range"]::-moz-range-thumb {
  height: 15px;
  width: 15px;
  background-color: #f50;
  border-radius: 50%;
  border: none;
  transition: 0.2s ease-in-out;
}
</style>

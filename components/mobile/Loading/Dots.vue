<template>
  <div class="loading-container">
    <div class="custom-loader"></div>
  </div>
</template>

<style scoped>

.loading-container{
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background-color: rgba(174, 172, 177, 0.5);
}
.custom-loader {
  width:75px;
  height:18px;
  background: 
    radial-gradient(circle closest-side,#7f3dff 90%,#0000) 0%   50%,
    radial-gradient(circle closest-side,#7f3dff 90%,#0000) 50%  50%,
    radial-gradient(circle closest-side,#7f3dff 90%,#0000) 100% 50%;
  background-size:calc(100%/3) 100%;
  background-repeat: no-repeat;
  animation:d7 1s infinite linear;
}
@keyframes d7 {
    33%{background-size:calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%}
    50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%}
    66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%  }
}
</style>
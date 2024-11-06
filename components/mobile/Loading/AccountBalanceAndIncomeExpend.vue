<template>
  <div class="loading-wrapper">
    <div class="account_balance text-center py-8">
      <h1 class="text-[#91919F] text-base font-bold pb-2">
        Account Balance
      </h1>
      <p class="h-8 hide-text text-center w-28 mx-auto rounded-md"> </p>
    </div>
    <div class="income_expense flex justify-between gap-x-4">
      <div class="h-20 w-full hide-text rounded-2xl">

      </div>
      <div class="h-20 w-full hide-text rounded-2xl">

      </div>
    </div>
  </div>
</template>

<style>
.hide-text {
  background-color: #f1f5f9;
  color: transparent;
  overflow: hidden;
  position: relative
}

.hide-text:before {
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: skeleton-animation;
  background: linear-gradient(90deg, #f7f7f7 25%, #f3f3f3 50%, #f7f7f7);
  content: "";
  filter: blur(1px);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 50px
}

@keyframes skeleton-animation {
  0% {
    left: 0
  }

  to {
    left: 100%
  }
}

.footer-shadow {
  box-shadow: 1px -2px 6px -6px rgba(0, 0, 0, .5)
}
</style>
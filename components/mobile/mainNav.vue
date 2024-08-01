<template>
  <div
    class="nav-wrapper bg-[#fff] w-full fixed bottom-0 rounded-t-lg p-3 m-w-[56px]"
  >
    <div class="nav-link-container flex justify-between items-center relative">
      <div class="flex gap-x-10">
        <span class="nav-link-item">
          <img src="/images/home.svg" />
        </span>
        <span class="nav-link-item rounded-tr-xl">
          <img src="/images/transaction.svg" />
        </span>
      </div>
      <div class="flex gap-x-10">
        <span class="nav-link-item">
          <img src="/images/pie-chart.svg" />
        </span>
        <span class="nav-link-item">
          <img src="/images/user.svg" />
        </span>
      </div>
    </div>
    <div
      class="nav-link-item center-item absolute -top-1/2 -1/2 left-1/2 -translate-x-1/2"
    >
      <img src="/images/Add.svg" />
    </div>
  </div>
</template>
<style scoped>
.nav-link-item.center-item {
  box-shadow: -1px -1px 0px 9px #eee;
  background: #fff;
  border-radius: 25px;
}

.nav-link-item.center-item::before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: #fff;
  border-top-right-radius: 20px;
  top: 28px;
  right: 64px;
  box-shadow: 5px -5px 0px 0px #eee;
}
.nav-link-item.center-item::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: #fff;
  border-top-left-radius: 20px;
  top: 28px;
  left: 62px;
  box-shadow: -2px -5px 0px 0px #eee;
}
</style>

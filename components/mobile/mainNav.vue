<template>
  <div class="nav-wrapper bg-[#ddd] w-full fixed bottom-0 rounded-t-lg p-3">
    <ul class="nav-link-container flex justify-between items-center relative">
      <li class="nav-link-item">
        <img src="/images/home.svg" />
      </li>
      <li class="nav-link-item rounded-tr-xl">
        <img src="/images/transaction.svg" />
      </li>

      <li class="nav-link-item">
        <img src="/images/pie-chart.svg" />
      </li>
      <li class="nav-link-item">
        <img src="/images/user.svg" />
      </li>
    </ul>
    <div
      class="nav-link-item center-item absolute -top-2 left-1/2 -translate-x-1/2"
    >
      <img src="/images/Add.svg" />
    </div>
  </div>
</template>
<style scoped>
.nav-link-item.center-item {
  box-shadow: -1px -1px 0px 9px #ffffff;
  background: #fff;
  border-radius: 25px;
}

.nav-link-item.center-item::before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: #dddddd;
  border-top-right-radius: 20px;
  top: 8px;
  right: 69px;
  box-shadow: 6px -7px 0px 6px #ffffff;
}
.nav-link-item.center-item::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: #dddddd;
  border-top-left-radius: 20px;
  top: 8px;
  left: 65px;
  box-shadow: -5px -6px 0px 3px #ffffff;
}
</style>

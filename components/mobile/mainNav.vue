<template>
  <div class="z-10">
    <div
      class="nav-wrapper bg-[#fff] w-full fixed bottom-0 rounded-t-lg p-3 m-w-[56px]"
    >
      <div
        class="nav-link-container flex justify-between items-center relative"
      >
        <div class="flex gap-x-10">
          <nuxt-link to="/">
            <span class="nav-link-item">
              <Icon
                name="ion:md-home"
                :class="[
                  'text-3xl',
                  activeRoute('index') ? 'text-[#7F3DFF]' : 'text-[#C6C6C6]',
                ]"
              />
            </span>
          </nuxt-link>
          <nuxt-link to="/transaction">
            <span class="nav-link-item">
              <Icon
                name="ion:arrow-swap"
                :class="[
                  'text-3xl',
                  activeRoute('transaction')
                    ? 'text-[#7F3DFF]'
                    : 'text-[#C6C6C6]',
                ]"
              />
            </span>
          </nuxt-link>
        </div>
        <div class="flex gap-x-10">
          <span class="nav-link-item">
            <Icon
              name="ion:pie-chart"
              :class="[
                'text-3xl',
                activeRoute('budget') ? 'text-[#7F3DFF]' : 'text-[#C6C6C6]',
              ]"
            />
          </span>
          <span class="nav-link-item">
            <Icon
              name="ion:person"
              :class="[
                'text-3xl',
                activeRoute('profile') ? 'text-[#7F3DFF]' : 'text-[#C6C6C6]',
              ]"
            />
          </span>
        </div>
      </div>
      <!-- center icon  -->
      <div
        class="z-10 justify-center flex items-center nav-link-item center-item absolute left-1/2 -translate-x-1/2 bottom-[30px]"
      >
        <Icon
          :name="openMenu ? 'ion:close-circled' : 'ion:plus-circled'"
          class="text-6xl text-[#7F3DFF]"
          @click="openMenuDialog"
        />
      </div>
      <div
        class="rounded-b-full w-[70px] h-[35px] bg-[#eee] absolute left-1/2 -translate-x-1/2 bottom-[25px]"
      ></div>
      <CoreMenuModel :visible="openMenu" @dismiss="closeMenu" />
    </div>
  </div>
</template>
<script setup>
const openMenu = ref(false);
const router = useRoute();

console.log("route", router.name);
const openMenuDialog = () => {
  openMenu.value = true;
};

const closeMenu = (value) => {
  openMenu.value = value;
};

const activeRoute = (route) => {
  return router.name === route;
};
</script>
<style scoped>
/* .nav-link-item.center-item {
  box-shadow: 0px -7px 0px 9px #eee;
  background: #eee;
  border-radius: 999px;
} */

/* .nav-link-item.center-item::before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: #fff;
  border-top-right-radius: 20px;
  top: 30px;
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
  top: 30px;
  left: 65px;
  box-shadow: -2px -5px 0px 0px #eee;
} */
</style>

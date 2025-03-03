<template>
  <!-- <div class="z-10"> -->
  <div
    class="nav-wrapper bg-[#fff] w-full fixed bottom-0 rounded-t-lg p-3 m-w-[56px]"
  >
    <div class="nav-link-container flex justify-between items-center relative">
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
        <nuxt-link to="/budget">
          <span class="nav-link-item">
            <Icon
              name="ion:pie-chart"
              :class="[
                'text-3xl',
                activeRoute('budget') ? 'text-[#7F3DFF]' : 'text-[#C6C6C6]',
              ]"
            />
          </span>
        </nuxt-link>
        <nuxt-link to="/profile">
          <span class="nav-link-item">
            <Icon
              name="ion:person"
              :class="[
                'text-3xl',
                activeRoute('profile') ? 'text-[#7F3DFF]' : 'text-[#C6C6C6]',
              ]"
            />
          </span>
        </nuxt-link>
      </div>
    </div>
    <!-- center icon  -->
    <div
      class="z-10 justify-center flex items-center nav-link-item center-item absolute left-1/2 -translate-x-1/2 bottom-[20px]"
    >
      <Icon
        :name="openMenu ? 'ion:close-circled' : 'ion:plus-circled'"
        class="text-6xl text-[#7F3DFF]"
        @click="openMenuDialog"
      />
    </div>
    <!-- rounded-b-full w-[70px] h-[65px] bg-[#eee] absolute left-1/2 -translate-x-1/2 bottom-[5px] -->
    <div
      class="indicator absolute left-1/2 -translate-x-1/2 bottom-[2px]"
    ></div>
    <CoreMenuModelOld :visible="openMenu" @dismiss="closeMenu" />
  </div>
  <!-- </div> -->
</template>
<script setup>
const openMenu = ref(false);
const router = useRoute();

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
.indicator {
  background-image: url("/images/svgviewer-output.svg");
  background-repeat: no-repeat;
  height: 80px;
  transition: 0.5s;
  width: 190px;
}
</style>

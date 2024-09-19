<template>
    <div class="navigation">
        <ul>
            <li :class="{ list: true, active: isActive('/') }">
                <nuxt-link to="/">
                    <span class="icon">
                        <Icon name="ion:md-home" />
                    </span>
                    <span class="text">Home</span>
                </nuxt-link>
            </li>
            <li :class="{ list: true, active: isActive('/transaction') }">
                <nuxt-link to="/transaction">
                    <span class="icon">
                        <Icon name="ion:arrow-swap" />
                    </span>
                    <span class="text">Transaction</span>
                </nuxt-link>
            </li>
            <li :class="{ list: true, active: isActive('/#add') }">
                <nuxt-link to="/#add">
                    <span class="icon">
                        <!-- <Icon name="ion:close-round" v-if="isActive('/#add')"/> -->
                        <Icon name="ion:plus-circled" />
                    </span>
                </nuxt-link>
            </li>
            <li :class="{ list: true, active: isActive('/budget') }">
                <nuxt-link to="/budget">
                    <span class="icon">
                        <Icon name="ion:pie-chart" />
                    </span>
                    <span class="text">Budget</span>
                </nuxt-link>
            </li>
            <li :class="{ list: true, active: isActive('/profile') }">
                <nuxt-link to="profile">
                    <span class="icon">
                        <Icon name="ion:person" />
                    </span>
                    <span class="text">Profile</span>
                </nuxt-link>
            </li>
            <div class="indicator"></div>
        </ul>
    </div>
    <CoreMenuModel :visible="openMenu" @dismiss="closeMenu" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';

const router = useRouter()
const route = useRoute();
const activePath = ref(route.path);
const openMenu = ref(false);

const openMenuDialog = () => {
    openMenu.value = true;
};

const closeMenu = ({ isOpen, nextPath }) => {
    openMenu.value = isOpen;
    if(!nextPath){
        router.back()
    }
};

// Watch for route changes and update activePath accordingly
watch(route, (newRoute) => {
    activePath.value = newRoute.fullPath;
    addBtn(activePath.value)
});

const addBtn = (path) => {
    if (path == '/#add') {
        console.log("here");
        openMenuDialog()
    }
}

// Function to check if the current path matches the active one
const isActive = (path) => activePath.value === path;

onMounted(() => {
    activePath.value = route.fullPath;
    addBtn(activePath.value)
});

</script>


<style scoped>
.navigation {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px 10px 0 0;
}

.navigation ul {
    display: flex;
    width: 350px;
}

.navigation ul li {
    position: relative;
    width: 70px;
    height: 70px;
    list-style: none;
    z-index: 1;
}

.navigation ul li a {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    text-align: center;
    font-weight: 500;
}

.navigation ul li a .icon {
    position: relative;
    display: block;
    line-height: 75px;
    font-size: 1.5em;
    text-align: center;
    color: #c6c6c6;
    transition: 0.5s;
}

.navigation ul li.active a .icon {
    transform: translateY(-32px);
    color: #7f3dff;
}

.navigation ul li a .text {
    position: absolute;
    color: black;
    font-weight: 400;
    font-size: 0.65em;
    letter-spacing: 0.05em;
    opacity: 0;
    transform: translateY(20px);
    transition: 0.5s;
}

.navigation ul li.active a .text {
    opacity: 1;
    transform: translateY(10px);
}

.indicator {
    position: absolute;
    top: -50%;
    width: 70px;
    height: 70px;
    background: white;
    border: 6px solid #eeeeee;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
}

.indicator::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -22px;
    width: 20px;
    height: 20px;
    background: transparent;
    border-top-right-radius: 20px;
    box-shadow: 1px -10px 0 #eeeeee;
}

.indicator::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -22px;
    width: 20px;
    height: 20px;
    background: transparent;
    border-top-left-radius: 20px;
    box-shadow: -1px -10px 0 #eeeeee;
}

.navigation ul li:nth-child(1).active~.indicator {
    transform: translateX(calc(70px * 0));
}

.navigation ul li:nth-child(2).active~.indicator {
    transform: translateX(calc(70px * 1));
}

.navigation ul li:nth-child(3).active~.indicator {
    transform: translateX(calc(70px * 2));
}

.navigation ul li:nth-child(4).active~.indicator {
    transform: translateX(calc(70px * 3));
}

.navigation ul li:nth-child(5).active~.indicator {
    transform: translateX(calc(70px * 4));
}
</style>

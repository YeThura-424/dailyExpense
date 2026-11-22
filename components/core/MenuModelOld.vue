<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="fixed inset-0 z-50" @close="closeMenu">
      <TransitionChild as="template" enter="duration-200 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-150 ease-in" leave-from="opacity-100" leave-to="opacity-0"><div class="fixed inset-0 bg-[#161719]/35 backdrop-blur-sm" /></TransitionChild>
      <div class="fixed inset-0 flex items-end justify-center p-4 pb-24 md:items-center md:pb-4">
        <TransitionChild as="template" enter="duration-200 ease-out" enter-from="opacity-0 translate-y-4" enter-to="opacity-100 translate-y-0" leave="duration-150 ease-in" leave-from="opacity-100" leave-to="opacity-0 translate-y-4">
          <DialogPanel class="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl"><div class="flex items-center justify-between gap-4"><DialogTitle class="text-lg font-bold">What would you like to add?</DialogTitle><button type="button" aria-label="Close quick actions" class="rounded-full p-2 text-[#91919F]" @click="closeMenu"><Icon name="ion:close" /></button></div><p class="mt-1 text-sm text-[#91919F]">Keep your everyday finances up to date.</p><div class="quick-action-links"><NuxtLink to="/income" @click="closeMenu"><span class="action-icon text-[#00A86B]"><Icon name="ion:arrow-down-outline" /></span><span>Income<small>Record money coming in</small></span></NuxtLink><NuxtLink to="/expense" @click="closeMenu"><span class="action-icon text-[#FD3C4A]"><Icon name="ion:arrow-up-outline" /></span><span>Expense<small>Track your spending</small></span></NuxtLink><NuxtLink to="/transfer" @click="closeMenu"><span class="action-icon text-[#0077FF]"><Icon name="ion:swap-horizontal-outline" /></span><span>Transfer<small>Move money between wallets</small></span></NuxtLink></div></DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  verticalAlign: {
    type: String,
    default: "items-center",
  },
});
const emit = defineEmits(["dismiss"]);

const isOpen = ref(false);

watch(
  () => props.visible,
  (updateVisible) => {
    isOpen.value = updateVisible;
  }
);

function closeMenu() {
  isOpen.value = false;
  emit("dismiss", isOpen.value);
}
</script>

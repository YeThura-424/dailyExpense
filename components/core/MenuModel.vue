<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeMenu" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-[#8B50FF]/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full justify-center items-end">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-fit max-w-md transform overflow-hidden transition-all absolute bottom-[90px]"
            >
              <div class="menu_wrapper flex justify-center gap-x-24">
                <div class="income_menu">
                  <nuxt-link to="/income">
                    <button
                      class="bg-[#00A86B] flex items-center justify-center rounded-full w-14 h-14"
                    >
                      <Icon
                        name="ion:cloud-download-sharp"
                        class="text-3xl text-[#fff]"
                      />
                    </button>
                  </nuxt-link>
                </div>
                <div class="expense_menu">
                  <nuxt-link to="/expense">
                    <button
                      class="bg-[#FD3C4A] flex items-center justify-center rounded-full w-14 h-14"
                    >
                      <Icon
                        name="ion:cloud-upload-sharp"
                        class="text-3xl text-[#fff]"
                      />
                    </button>
                  </nuxt-link>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
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

function closeMenu(nextPath = false) {
  isOpen.value = false;
  emit("dismiss", { isOpen: isOpen.value, nextPath });
}

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    console.log(route.path);
    if(route.path == '/expense' || route.path == '/income'){
      closeMenu(true)
    }
  }
)
</script>

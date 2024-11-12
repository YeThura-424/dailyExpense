<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div :class="[
          'flex min-h-full justify-center p-4 text-center',
          verticalAlign,
        ]">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <slot />
              <div class="mt-4 flex gap-x-3">
                <button type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal">
                  {{ closeTitle }}
                </button>
                <button type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent bg-[#7F3DFF] px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="applyFilter">
                  Apply
                </button>
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
  closeTitle: {
    type: String,
    default: "Close",
  },
});
const emit = defineEmits(["dismiss", "apply"]);

const isOpen = ref(false);

watch(
  () => props.visible,
  (updateVisible) => {
    isOpen.value = updateVisible;
  }
);

function closeModal() {
  isOpen.value = false;
  emit("dismiss", isOpen.value);
}

function applyFilter() {
  isOpen.value = false;
  emit("apply", isOpen.value);
}
</script>

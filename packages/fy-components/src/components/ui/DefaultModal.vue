<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
} from "@headlessui/vue";
import { ref, onMounted, onUnmounted, h } from "vue";
import { useEventBus } from "@fy-/core";
import { XCircleIcon } from "@heroicons/vue/24/solid";

const props = withDefaults(
  defineProps<{
    id: string;
    title?: string;
    onOpen?: Function;
    onClose?: Function;
    closeIcon?: Object;
  }>(),
  {
    closeIcon: () => h(XCircleIcon),
  }
);

const eventBus = useEventBus();

const isOpen = ref<boolean>(false);
const setModal = (value: boolean) => {
  if (value === true) {
    if (props.onOpen) props.onOpen();
  } else {
    if (props.onClose) props.onClose();
  }
  isOpen.value = value;
};
onMounted(() => {
  eventBus.on(`${props.id}Modal`, setModal);
});
onUnmounted(() => {
  eventBus.off(`${props.id}Modal`, setModal);
});
</script>
<template>
  <TransitionRoot
    :show="isOpen"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog
      :open="isOpen"
      @close="setModal"
      class="fixed inset-0 overflow-y-auto"
      style="z-index: 40"
    >
      <div
        class="flex flex-col items-center justify-center min-h-screen text-fv-neutral-800 dark:text-fv-neutral-300 bg-fv-neutral-900/[.20] dark:bg-fv-neutral-50/[.20]"
      >
        <DialogPanel
          class="relative mx-1 md:mx-0 w-11/12 max-w-6xl shadow"
          style="z-index: 41"
        >
          <slot name="before"></slot>
          <div class="bg-fv-neutral-100 dark:bg-fv-neutral-800">
            <DialogTitle
              class="text-xl flex justify-between items-center px-2 py-1 bg-fv-neutral-50 dark:bg-fv-neutral-900"
              v-if="title"
            >
              {{ title }}
              <a href="javascript:void(0)" @click="setModal(false)">
                <component
                  :is="closeIcon"
                  class="w-8 text-fv-neutral-700 hover:text-fv-neutral-800 focus:text-fv-neutral-800 dark:text-fv-neutral-400 dark:hover:text-fv-neutral-200 dark:focus:text-fv-neutral-200"
                />
              </a>
            </DialogTitle>
            <a href="javascript:void(0)" @click="setModal(false)" v-else>
              <component
                :is="closeIcon"
                class="w-8 text-fv-neutral-700 hover:text-fv-neutral-800 focus:text-fv-neutral-800 dark:text-fv-neutral-400 dark:hover:text-fv-neutral-200 dark:focus:text-fv-neutral-200 float-right mr-1 mt-1"
              />
            </a>
            <div
              :class="
                !title
                  ? 'p-2 md:p-3 xl:p-4 2xl:p-5'
                  : 'p-2 md:p-3 xl:p-4 2xl:p-5'
              "
            >
              <slot></slot>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

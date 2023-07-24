<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useEventBus } from "@fy-/core";
import { onMounted, onUnmounted } from "vue";
import type { NavLink } from "../../types/utils";
const props = withDefaults(
  defineProps<{
    links: NavLink[];
    id?: string;
    name?: string;
    baseUrl?: string;
  }>(),
  {
    id: "main",
    baseUrl: "/",
    name: undefined,
  }
);
const eventBus = useEventBus();
const route = useRoute();
const isLinkActive = (link: any) => {
  if (link.to != props.baseUrl) {
    if (route.path == link.to) return true;
  } else {
    if (route.path == link.to) {
      return true;
    }
  }
  return false;
};
const isActiveParent = (link: any) => {
  if (link.to != props.baseUrl) {
    if (route.path == link.to || route.path.includes(link.to)) return true;
  } else {
    if (route.path == link.to) {
      return true;
    }
  }
  return false;
};
const isOpen = useStorage(`isOpenSidebar-${props.id}`, true);
onMounted(() => {
  eventBus.on("openDrawer", () => {
    isOpen.value = true;
  });
  eventBus.on("closeDrawer", () => {
    isOpen.value = false;
  });
  eventBus.on("toggleDrawer", () => {
    isOpen.value = !isOpen.value;
  });
});
onUnmounted(() => {
  eventBus.off("openDrawer", "*");
  eventBus.off("closeDrawer", "*");
  eventBus.off("toggleDrawer", "*");
});
</script>
<template>
  <transition name="slide-x">
    <div
      id="drawer-navigation"
      class="fixed left-0 h-[calc(100vh-56px)] overflow-y-auto transition-transform bg-white w-80 dark:bg-fv-neutral-900 top-[3.84rem]"
      tabindex="-1"
      style="z-index: 30"
      aria-labelledby="drawer-navigation-label"
      v-if="isOpen"
    >
      <slot name="header">
        <h5
          id="drawer-navigation-label"
          class="text-base font-semibold text-fv-neutral-500 uppercase dark:text-fv-neutral-200"
          v-if="name"
        >
          {{ name }}
        </h5>
      </slot>
      <button
        @click="$eventBus.emit('closeDrawer')"
        type="button"
        data-drawer-hide="drawer-navigation"
        aria-controls="drawer-navigation"
        class="text-fv-neutral-400 bg-transparent hover:bg-fv-neutral-200 hover:text-fv-neutral-900 text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-fv-neutral-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">{{ $t("global_close_nav") }}</span>
      </button>
      <div class="py-4 overflow-y-auto" :class="{ 'mt-8': !name }">
        <slot name="before"></slot>
        <ul class="space-y-2 font-medium">
          <li v-for="(link, index) of links" :key="`aside_link_${index}`">
            <template v-if="!link.childrens">
              <RouterLink
                :to="link.to"
                class="flex items-center p-2 text-fv-neutral-900 dark:text-white hover:bg-fv-neutral-100 dark:hover:bg-fv-neutral-600"
                :class="{
                  'dark:bg-fv-neutral-700 bg-fv-primary-100 nav-selected-lg':
                    isLinkActive(link),
                }"
              >
                <component
                  :is="link.icon"
                  v-if="link.icon"
                  class="w-6 h-6 text-fv-neutral-500 transition duration-75 dark:text-fv-neutral-300 group-hover:text-fv-neutral-900 dark:group-hover:text-white"
                  :class="{
                    'text-fv-primary-600': isLinkActive(link),
                  }"
                />
                <span class="ml-3">{{ link.name }}</span>
              </RouterLink>
            </template>
            <template v-else>
              <button
                class="flex w-full items-center p-2 text-fv-neutral-900 dark:text-white hover:bg-fv-neutral-100 dark:hover:bg-fv-neutral-600"
                :class="{
                  'dark:bg-fv-neutral-700 bg-fv-primary-100':
                    isActiveParent(link),
                }"
              >
                <component
                  :is="link.icon"
                  v-if="link.icon"
                  :class="{
                    'text-fv-primary-600': isActiveParent(link),
                  }"
                  class="w-6 h-6 text-fv-neutral-500 transition duration-75 dark:text-fv-neutral-300 group-hover:text-fv-neutral-900 dark:group-hover:text-white"
                />
                <span class="ml-3">{{ link.name }}</span>
              </button>
              <RouterLink
                v-for="(child, i) in link.childrens"
                :key="child.to"
                :to="child.to"
                :class="{
                  'nav-selected': isActiveParent(child),
                  'border-b border-b-fv-neutral-500':
                    i != link.childrens.length - 1,
                }"
                class="flex text-sm items-center py-1 pr-2 pl-1 ml-10 text-fv-neutral-900 dark:text-white hover:bg-fv-neutral-100 dark:hover:bg-fv-neutral-600"
              >
                {{ child.name }}
              </RouterLink>
            </template>
          </li>
          <slot name="nav"></slot>
        </ul>
        <slot name="after"></slot>
      </div>
    </div>
  </transition>
</template>
<style lang="scss">
.slide-x-enter-active,
.slide-x-leave-active {
  transition: transform 0.8s, opacity 0.3s;
  opacity: 0;
}
.slide-x-enter-from,
.slide-x-leave-to {
  transform: translateX(-100%);
  opacity: 1;
}
</style>

<script lang="ts" setup>
import { NavLink } from "../../types/utils";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { useStorage } from "@vueuse/core";
import { useRoute } from "vue-router";

const props = withDefaults(
  defineProps<{
    links: NavLink[];
    id?: string;
    baseUrl?: string;
  }>(),
  {
    id: "main",
    baseUrl: "/",
  }
);
const route = useRoute();
const isLinkActive = (link: NavLink) => {
  if (link.to != props.baseUrl) {
    if (route.path == link.to || route.path.includes(link.to))
      return "fvside-active";
  } else {
    if (route.path == link.to) {
      return "fvside-active";
    }
  }
  return "";
};
const isOpen = useStorage(`isOpenSidebar-${props.id}`, true);
</script>
<template>
  <aside class="fui-sidebar" :class="isOpen ? '' : 'fui-sidebar__md'">
    <div class="fui-sidebar__controller">
      <button
        class="btn neutral"
        aria-controls="side-nav"
        @click="isOpen = !isOpen"
      >
        <ArrowLeftIcon v-if="isOpen" />
        <ArrowRightIcon v-else />
        <span class="fui-sr-only">Controls Sidebar Size</span>
      </button>
    </div>
    <slot name="before"></slot>
    <ul role="list" id="side-nav">
      <li v-for="(link, index) of links" :key="`aside_link_${index}`">
        <RouterLink
          :to="link.to"
          class="fui-sidebar__link"
          :class="isLinkActive(link)"
        >
          <div role="tooltip" class="fui-tooltip">
            {{ link.name }}
          </div>
          <component :is="link.icon" v-if="link.icon" />
          <span>{{ link.name }}</span>
          <span class="fui-sr-only">{{ link.name }}</span>
        </RouterLink>
      </li>
      <slot name="lis"></slot>
    </ul>
    <slot name="after"></slot>
  </aside>
</template>
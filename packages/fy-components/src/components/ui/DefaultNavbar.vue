<script lang="ts" setup>
import { ArrowDownIcon } from "@heroicons/vue/24/solid";
import { useRoute } from "vue-router";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { NavLink } from "../../types/utils";

const props = withDefaults(
  defineProps<{
    links: NavLink[];
    baseUrl?: string;
    siteName?: string;
    siteLogo?: string;
  }>(),
  {
    baseUrl: "/",
    loginPage: "/login",
    dashboardPage: "/dashboard",
    settingsPage: "/dashboard/settings",
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
</script>
<template>
  <nav class="bg-white border-fv-neutral-200 dark:bg-fv-neutral-900">
    <div class="w-full flex flex-wrap items-center justify-between mx-auto p-4">
      <RouterLink to="/" class="flex items-center" v-if="siteName">
        <img :src="siteLogo" v-if="siteLogo" class="h-8 mr-3" :alt="siteName" />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >{{ siteName }}</span
        >
      </RouterLink>
      <div class="flex items-center md:order-2">
        <slot name="custom"> - </slot>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="mobile-menu-2"
      >
        <ul
          class="flex relative flex-col font-medium p-4 md:p-0 mt-4 border border-fv-neutral-100 rounded-lg bg-fv-neutral-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-fv-neutral-800 md:dark:bg-fv-neutral-900 dark:border-fv-neutral-700"
        >
          <li v-for="link in links" :key="`nav-${link.to}`">
            <template v-if="!link.childrens || link.childrens.length == 0">
              <RouterLink
                :to="link.to"
                :title="link.name"
                class="block py-2 pl-3 pr-4 text-white bg-fv-neutral-700 rounded md:bg-transparent md:text-fv-neutral-700 md:p-0 md:dark:text-fv-neutral-500 dark:bg-fv-neutral-600 md:dark:bg-transparent"
                aria-current="page"
                :class="{
                  'bg-fv-primary-700  md:text-fv-primary-700 md:dark:text-fv-primary-500 dark:bg-fv-primary-600':
                    isLinkActive(link),
                }"
              >
                {{ link.name }}
              </RouterLink>
            </template>
            <template v-else>
              <Menu>
                <MenuButton
                  class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-white bg-fv-neutral-700 rounded md:bg-transparent md:text-fv-neutral-700 md:p-0 md:dark:text-fv-neutral-500 dark:bg-fv-neutral-600 md:dark:bg-transparent"
                  :class="{
                    'bg-fv-primary-700  md:text-fv-primary-700 md:dark:text-fv-primary-500 dark:bg-fv-primary-600':
                      isLinkActive(link),
                  }"
                >
                  {{ link.name }}
                  <ArrowDownIcon class="w-4 h-4 ml-1" aria-hidden="true" />
                </MenuButton>
                <transition name="fade">
                  <MenuItems
                    class="z-10 absolute my-4 font-normal bg-white divide-y divide-fv-neutral-100 rounded-lg shadow w-48 dark:bg-fv-neutral-700 dark:divide-fv-neutral-600"
                  >
                    <ul
                      class="py-2 text-sm text-fv-neutral-700 dark:text-fv-neutral-400"
                      aria-labelledby="Dropdown menu"
                    >
                      <MenuItem
                        v-for="(children, index) in link.childrens"
                        :key="`link_children_${index.toString()}`"
                      >
                        <li>
                          <RouterLink
                            :to="children.to"
                            :title="children.name"
                            class="block px-4 py-2 hover:bg-fv-neutral-100 dark:hover:bg-fv-neutral-600 dark:text-fv-neutral-400 dark:hover:text-white"
                          >
                            {{ children.name }}
                          </RouterLink>
                        </li>
                      </MenuItem>
                    </ul>
                  </MenuItems>
                </transition>
              </Menu>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

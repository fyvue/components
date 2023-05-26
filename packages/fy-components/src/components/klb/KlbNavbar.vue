<script lang="ts" setup>
import { UserCircleIcon } from "@heroicons/vue/24/solid";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { computed } from "vue";
import { useKlbStore } from "../../stores/klb";
import { NavLink } from "../../types/utils";
import DefaultNavbar from "../ui/DefaultNavbar.vue";
const store = useKlbStore();
const isAuth = computed(() => store.isAuth);
const user = computed(() => store.user);
withDefaults(
  defineProps<{
    links: NavLink[];
    baseUrl?: string;
    siteName?: string;
    siteLogo?: string;
    loginPage?: string;
    dashboardPage?: string;
    settingsPage?: string;
  }>(),
  {
    baseUrl: "/",
    loginPage: "/login",
    dashboardPage: "/dashboard",
    settingsPage: "/dashboard/settings",
  }
);
</script>
<template>
  <DefaultNavbar
    :links="links"
    :baseUrl="baseUrl"
    :siteName="siteName"
    :siteLogo="siteLogo"
  >
    <template v-slot:title>
      <slot name="title">{{ siteName }}</slot>
    </template>
    <template v-slot:custom>
      <slot name="custom">
        <div v-if="!isAuth" class="flex gap-2">
          <RouterLink class="btn primary defaults" :to="loginPage">
            Login
          </RouterLink>
          <RouterLink class="btn accent defaults" :to="loginPage">
            Sign up
          </RouterLink>
        </div>
        <div class="relative" v-else>
          <Menu>
            <MenuButton
              class="flex mr-3 text-sm bg-fv-neutral-800 rounded-full md:mr-0 focus:ring-4 focus:ring-fv-neutral-300 dark:focus:ring-fv-neutral-600"
            >
              <span class="sr-only">Open user menu</span>
              <UserCircleIcon class="w-8 h-8 rounded-full" />
            </MenuButton>
            <transition name="fade">
              <MenuItems
                class="z-50 absolute right-0 my-4 text-base list-none bg-white divide-y divide-fv-neutral-100 rounded-lg shadow dark:bg-fv-neutral-700 dark:divide-fv-neutral-600"
              >
                <div class="px-4 py-3">
                  <span
                    class="block text-sm text-fv-neutral-900 dark:text-white whitespace-nowrap"
                  >
                    {{ user?.Display_Name }}
                  </span>
                  <span
                    class="block text-sm text-fv-neutral-500 truncate dark:text-fv-neutral-400 whitespace-nowrap"
                  >
                    {{ user?.Email }}
                  </span>
                </div>
                <ul class="py-2" aria-labelledby="user-menu-button">
                  <MenuItem>
                    <li>
                      <RouterLink
                        :to="dashboardPage"
                        class="block px-4 py-2 text-sm text-fv-neutral-700 hover:bg-fv-neutral-100 dark:hover:bg-fv-neutral-600 dark:text-fv-neutral-200 dark:hover:text-white"
                      >
                        Dashboard
                      </RouterLink>
                    </li>
                  </MenuItem>
                  <MenuItem>
                    <li>
                      <RouterLink
                        :to="settingsPage"
                        class="block px-4 py-2 text-sm text-fv-neutral-700 hover:bg-fv-neutral-100 dark:hover:bg-fv-neutral-600 dark:text-fv-neutral-200 dark:hover:text-white"
                      >
                        Settings
                      </RouterLink>
                    </li>
                  </MenuItem>
                  <MenuItem>
                    <li>
                      <button
                        @click="store.logout()"
                        class="block w-full text-left px-4 py-2 text-sm text-fv-neutral-700 hover:bg-fv-neutral-100 dark:hover:bg-fv-neutral-600 dark:text-fv-neutral-200 dark:hover:text-white"
                      >
                        Logout
                      </button>
                    </li>
                  </MenuItem>
                </ul>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </slot>
    </template>
  </DefaultNavbar>
</template>

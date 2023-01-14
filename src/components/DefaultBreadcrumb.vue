<script lang="ts" setup>
import { HomeIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import type { BreadcrumbLink } from "../types/utils";
withDefaults(
  defineProps<{
    nav: BreadcrumbLink[];
  }>(),
  {
    nav: () => [],
  }
);
</script>
<template>
  <nav
    class="flex px-5 py-2 text-fv-neutral-700 rounded-lg"
    aria-label="Breadcrumb"
  >
    <ol
      class="inline-flex items-center flex-wrap"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <template v-for="(item, index) in nav" :key="`bc_${index.toString()}`">
        <li
          :class="
            item.to
              ? index == 0
                ? 'inline-flex items-center'
                : 'inline-flex items-center'
              : 'inline-flex items-center'
          "
          itemprop="itemListElement"
          itemtype="https://schema.org/ListItem"
          itemscope
        >
          <ChevronRightIcon
            v-if="index != 0"
            :class="
              item.to
                ? index == 0
                  ? 'w-4 h-4 mr-2  inline-block'
                  : 'w-5 h-5 text-fv-neutral-400 inline-block mx-0.5 md:mx-1.5'
                : 'w-5 h-5 text-fv-neutral-400 inline-block mx-0.5 md:mx-1.5'
            "
          />

          <router-link
            :to="item.to"
            v-if="item.to"
            itemprop="item"
            :class="
              item.to
                ? index == 0
                  ? 'text-sm font-medium text-fv-neutral-700 hover:text-fv-neutral-900 dark:text-fv-neutral-400 dark:hover:text-white'
                  : 'text-sm font-medium text-fv-neutral-700 hover:text-fv-neutral-900  dark:text-fv-neutral-400 dark:hover:text-white'
                : ''
            "
          >
            <HomeIcon
              :class="
                item.to
                  ? index == 0
                    ? 'w-4 h-4 mr-2  inline-block'
                    : 'w-5 h-5 text-fv-neutral-400 inline-block mx-0.5 md:mx-1.5'
                  : 'w-5 h-5 text-fv-neutral-400 inline-block mx-0.5 md:mx-1.5'
              "
              v-if="index === 0"
            />
            <span itemprop="name">{{ item.name }}</span>
            <meta itemprop="position" :content="(index + 1).toString()" />
          </router-link>
          <span
            class="text-sm font-medium text-fv-neutral-500 dark:text-fv-neutral-400"
            v-else
          >
            <span itemprop="name">{{ item.name }}</span>
            <meta itemprop="position" :content="(index + 1).toString()" />
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>

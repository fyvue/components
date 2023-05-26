<script setup lang="ts">
import { i18nextPromise } from "@fy-/core";
import { Backend } from "@karpeleslab/i18next-klb-backend";
import {
  KlbUseStore,
  KlbUseUserCheck,
  KlbcountriesPromise,
} from "@fy-/components";
import { KlbNavbar } from "@fy-/components";
import { computed } from "vue";
await i18nextPromise(Backend);
await KlbcountriesPromise();
const klbStore = KlbUseStore();
const isAuth = computed(() => klbStore.isAuth);
if (!import.meta.env.SSR) {
  KlbUseUserCheck("/login", true);
}
const components = [
  { link: "/docs/modal", title: "Modal" },
  { link: "/docs/breadcrumb", title: "Breadcrumb" },
  { link: "/docs/paging", title: "Paging" },
  { link: "/docs/inputs", title: "Inputs" },
  { link: "/docs/sidebar", title: "Sidebar" },
  { link: "/docs/table", title: "Table" },
];
const css = [{ link: "/docs/buttons", title: "Buttons" }];
const klb = [
  { link: "/docs/klbuserflow", title: "KlbUserFlow" },
  { link: "/docs/klbpage/test", title: "KlbPage" },
  { link: "/docs/klbcontact", title: "KlbContact" },
];
components.sort((a, b) => a.title.localeCompare(b.title));
css.sort((a, b) => a.title.localeCompare(b.title));
klb.sort((a, b) => a.title.localeCompare(b.title));
</script>
<template>
  <div>
    <header
      class="border-b border-fv-neutral-200 dark:border-fv-neutral-600 dark:bg-fv-neutral-800"
    >
      <KlbNavbar
        siteName="@fy-/components"
        siteLogo="/logo.svg"
        loginPage="/docs/klbuserflow"
        :links="[
          { to: '/', name: 'Getting Started' },
          {
            to: '#',
            name: 'SSR',
            childrens: [
              { to: '/ssr', name: 'Getting Started' },
              { to: '/ssr/rest', name: 'Rest' },
              { to: '/ssr/router', name: 'Router' },
            ],
          },
          { to: '/contact', name: 'Contact' },
        ]"
      ></KlbNavbar>
    </header>
    <div class="w-full px-4 mx-auto max-w-8xl">
      <div class="lg:flex">
        <aside
          id="sidebar"
          class="fixed inset-0 z-20 flex-none hidden h-full w-72 lg:static lg:h-auto lg:overflow-y-visible py-4 lg:w-48 lg:block border-r"
          aria-labelledby="sidebar-label"
        >
          <h2
            class="mb-1 text-sm font-semibold tracking-wide text-fv-neutral-900 uppercase lg:text-xs dark:text-white"
          >
            CSS
          </h2>
          <ul class="py-1 pl-1 list-unstyled fw-normal small mb-4">
            <li v-for="(link, i) in css" :key="`link-${i}`">
              <RouterLink class="btn link" :to="link.link">
                {{ link.title }}</RouterLink
              >
            </li>
          </ul>
          <h2
            class="mb-1 text-sm font-semibold tracking-wide text-fv-neutral-900 uppercase lg:text-xs dark:text-white"
          >
            Components
          </h2>
          <ul class="py-1 pl-1 list-unstyled fw-normal small mb-4">
            <li v-for="(link, i) in components" :key="`link-${i}`">
              <RouterLink class="btn link" :to="link.link">
                {{ link.title }}</RouterLink
              >
            </li>
          </ul>
          <h2
            class="mb-1 text-sm font-semibold tracking-wide text-fv-neutral-900 uppercase lg:text-xs dark:text-white"
          >
            KLB
          </h2>
          <ul class="py-1 pl-1 list-unstyled fw-normal small mb-4">
            <li v-for="(link, i) in klb" :key="`link-${i}`">
              <RouterLink class="btn link" :to="link.link">
                {{ link.title }}</RouterLink
              >
            </li>
          </ul>
        </aside>
        <main
          id="content-wrapper"
          class="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible p-4"
        >
          <RouterView v-slot="{ Component }">
            <Suspense timeout="0">
              <component :is="Component" />
              <template #fallback>
                <div>Fallback...</div>
                <!--<DefaultLoader id="app-router-suspender" :force="true" />-->
              </template>
            </Suspense>
          </RouterView>
        </main>
      </div>
    </div>
  </div>
</template>

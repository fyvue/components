<script setup lang="ts">
import { KlbPage } from "@fy-/components";
import NotFoundPage from "../NotFoundPage.vue";
const examples = `<template>
  <div class="bg-fv-primary-50 rounded shadow-xs flex items-center px-2 py-1">
    <KlbPage :notFoundComponent="NotFoundPage" cms-uuid="ctcm-itiuuo-l5sj-ddfh-6x6k-ys3766sa" />
  </div>
</template>
`;
</script>
<template>
  <div>
    <h1
      class="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
    >
      KlbPage
    </h1>
    <p class="mb-4 text-lg text-gray-600 dark:text-gray-400">
      Handle KLB CMS page. For this component you'll need a route that looks
      like this: <code>/docs/klbpage/:slug</code> (passing slug in
      route.params).
    </p>
    <div class="pt-4 mb-8 border-t border-gray-200 dark:border-gray-800">
      <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Examples
      </h2>
      <div
        class="bg-fv-primary-50 rounded shadow-xs flex items-center px-2 py-1"
      >
        <KlbPage
          :notFoundComponent="NotFoundPage"
          cms-uuid="ctcm-itiuuo-l5sj-ddfh-6x6k-ys3766sa"
        />
      </div>
      <div
        class="bg-fv-primary-50 rounded shadow-xs flex items-center px-2 py-1"
      ></div>
      <div class="bg-fv-neutral-700 mt-4 p-3 rounded shadow text-white text-sm">
        <pre>{{ examples.replace('_script_', '<script setup lang="ts">').replace('_script_end_', '</script>') }}</pre>
      </div>
    </div>
  </div>
</template>

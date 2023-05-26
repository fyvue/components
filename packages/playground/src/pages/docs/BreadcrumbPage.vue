<script setup lang="ts">
import { DefaultBreadcrumb } from "@fy-/components";
const links = [
  { name: "Home", to: "/" },
  { name: "Docs", to: "/docs" },
  { name: "Breadcrumb" },
];

const examples = `_script_
    const links = [
        { name: "Home", to: "/" },
        { name: "Docs", to: "/docs" },
        { name: "Breadcrumb" },
    ];
_script_end_
<template>
    <div class="bg-fv-primary-50 rounded shadow-xs flex items-center px-2 py-0.5">
        <DefaultBreadcrumb :nav="links" :showHome="true" />
    </div>
</template>
`;
</script>
<template>
  <div>
    <h1
      class="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
    >
      Breadcrumb <small>DefaultBreadcrumb</small>
    </h1>
    <p class="mb-4 text-lg text-gray-600 dark:text-gray-400">
      Default breadcrumb component. This will construct a correct
      <a href="https://schema.org/BreadcrumbList" class="btn link"
        >BreadcrumbList</a
      >
      schema.
    </p>
    <div class="pt-4 mb-8 border-t border-gray-200 dark:border-gray-800">
      <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Examples
      </h2>
      <div
        class="bg-fv-primary-50 rounded shadow-xs flex items-center px-2 py-0.5"
      >
        <DefaultBreadcrumb :nav="links" />
      </div>
      <div class="bg-fv-neutral-700 mt-4 p-3 rounded shadow text-white text-sm">
        <pre>{{ $cleanScript(examples) }}</pre>
      </div>
    </div>
  </div>
</template>

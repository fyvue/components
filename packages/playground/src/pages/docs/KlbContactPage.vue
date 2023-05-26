<script setup lang="ts">
import { KlbContact } from "@fy-/components";
const examples = `<template>
  <div class="bg-fv-primary-50 rounded shadow-xs flex items-center px-2 py-1">
    <KlbUserFlow returnDefault="/docs/klbuserflow" />
  </div>
</template>
`;
</script>
<template>
  <div>
    <h1
      class="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
    >
      KlbLogin
    </h1>
    <p class="mb-4 text-lg text-gray-600 dark:text-gray-400">
      Handle KLB contact page.
    </p>
    <div class="pt-4 mb-8 border-t border-gray-200 dark:border-gray-800">
      <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Examples
      </h2>
      <div class="bg-fv-primary-50 rounded shadow-xs flex items-center p-4">
        <KlbContact to="@support" class="w-full" />
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

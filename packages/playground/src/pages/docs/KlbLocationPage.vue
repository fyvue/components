<script setup lang="ts">
import { KlbLocation } from "@fy-/components";
const examples = `<template>
  <KlbLocation />
</template>
`;
</script>
<template>
  <div>
    <h1
      class="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
    >
      KlbLocation
    </h1>
    <p class="mb-4 text-lg text-gray-600 dark:text-gray-400">
      Klb User Location manager. (Only simple location for now)
    </p>
    <div class="pt-4 mb-8 border-t border-gray-200 dark:border-gray-800">
      <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Examples
      </h2>

      <KlbLocation />

      <div class="bg-fv-neutral-700 mt-4 p-3 rounded shadow text-white text-sm">
        <pre>{{ $cleanScript(examples) }}</pre>
      </div>
    </div>
  </div>
</template>

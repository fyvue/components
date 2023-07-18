<script setup lang="ts">
import { DefaultDateSelection, DateInterval } from "@fy-/components";
import { ref } from "vue";
const date = ref<DateInterval>({
  start: undefined,
  end: undefined,
});

const examples = `_script_
    const date = ref<DateInterval>({
    start: undefined,
    end: undefined,
    });
_script_end_
<template>
    <div class="bg-fv-primary-50 rounded shadow-xs flex items-center px-2 py-0.5">
        <DefaultDateSelection id="test" type="interval" v-model="date" /><br />
        {{ date }}
    </div>
</template>
`;
</script>
<template>
  <div>
    <h1
      class="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
    >
      DateSelection <small>DefaultDateSelection</small>
    </h1>
    <p class="mb-4 text-lg text-gray-600 dark:text-gray-400">
      Default DateSelection component. This will construct a correct
      <a href="https://schema.org/DateSelectionList" class="btn link"
        >DateSelectionList</a
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
        <DefaultDateSelection id="test" mode="interval" v-model="date" /><br />
        {{ date }}
      </div>
      <div class="bg-fv-neutral-700 mt-4 p-3 rounded shadow text-white text-sm">
        <pre>{{ $cleanScript(examples) }}</pre>
      </div>
    </div>
  </div>
</template>

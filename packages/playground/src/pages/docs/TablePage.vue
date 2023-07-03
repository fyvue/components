<script setup lang="ts">
import { DefaultTable } from "@fy-/components";
const data = [
  {
    name: "headers",
    type: "object",
    info: {
      label: "Object.key is the property name and Object.value is the label.",
      name: "headers",
    },
    def: "n/a",
    count: 0,
  },
  {
    name: "data?",
    type: "array",
    info: {
      label: "Array of objects",
      name: "headers",
    },
    def: "[]",
    count: 4,
  },
  {
    name: "showHeaders?",
    type: "array",
    info: {
      label: "Array of objects",
      name: "headers",
    },
    def: "true",
    count: 10,
  },
];
const examples = `_script_
      const data = [
        {
          name: "headers",
          type: "object",
          info: "Object.key is the property name and Object.value is the label.",
          def: "n/a",
          count: 0,
        },
        {
          name: "data?",
          type: "array",
          info: "Array of objects",
          def: "[]",
          count: 4,
        },
        {
          name: "showHeaders?",
          type: "array",
          info: "Array of objects",
          def: "true",
          count: 10,
        },
      ];
_script_end_
<template>
  <DefaultTable
    :data="data"
    :headers="{
      name: 'Name',
      type: 'Type',
      info: 'Info',
      def: 'Default',
      count: 'Count',
    }"
    :sortables="{ count: true }"
    :exportableColumns="['name', 'type', 'count']"
    exportableName="testExport"
  />
</template>
`;
</script>
<template>
  <div>
    <h1
      class="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
    >
      Table <small>DefaultTable</small>
    </h1>
    <p class="mb-4 text-lg text-gray-600 dark:text-gray-400">
      Default Table component. T
    </p>
    <div class="pt-4 mb-8 border-t border-gray-200 dark:border-gray-800">
      <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Examples
      </h2>

      <DefaultTable
        :data="data"
        :headers="{
          name: 'Name',
          type: 'Type',
          info: 'Info',
          def: 'Default',
          count: 'Count',
        }"
        :sortables="{ count: true }"
        :exportableColumns="['name', 'type', 'info', 'count']"
        :csvFormatColumns="{ info: (value) => value.label }"
        exportableName="testExport"
      >
        <template #info="{ value }">
          <span class="font-semibold">{{ value.info.label }}</span>
        </template>
      </DefaultTable>
      <div class="bg-fv-neutral-700 mt-4 p-3 rounded shadow text-white text-sm">
        <pre>{{ $cleanScript(examples) }}</pre>
      </div>
    </div>
  </div>
</template>

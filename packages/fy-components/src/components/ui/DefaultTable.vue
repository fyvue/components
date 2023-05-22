<script setup lang="ts">
import { reactive, computed } from "vue";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/24/solid";
import type { TableHeaders, TableSortable } from "../../types/utils";

const props = withDefaults(
  defineProps<{
    headers: TableHeaders;
    data: any[];
    sortables?: TableSortable;
    showHeaders?: boolean;
  }>(),
  {
    showHeaders: true,
    sortables: () => ({}),
  }
);

const currentSort = reactive({
  key: "",
  direction: "none",
});

const sortedData = computed(() => {
  if (currentSort.direction == "none") {
    return props.data.slice();
  }
  const sorted = props.data.slice().sort((a, b) => {
    if (currentSort.key === "") return 0;

    const aValue = a[currentSort.key];
    const bValue = b[currentSort.key];

    if (!isNaN(aValue) && !isNaN(bValue)) {
      return aValue - bValue;
    }

    return String(aValue).localeCompare(String(bValue));
  });

  if (currentSort.direction === "desc") {
    sorted.reverse();
  }
  return sorted;
});

const sortData = (key: string) => {
  currentSort.key = key;
  currentSort.direction =
    currentSort.direction === "asc" || currentSort.direction == "none"
      ? "desc"
      : "asc";
};
</script>
<template>
  <div
    class="relative overflow-x-auto border-fv-primary-600 sm:rounded-lg"
    v-if="sortedData.length"
  >
    <table
      class="w-full text-sm text-left text-fv-neutral-500 dark:text-fv-neutral-400"
    >
      <thead
        v-if="showHeaders"
        class="text-xs text-fv-neutral-700 uppercase bg-fv-neutral-50 dark:bg-fv-neutral-800 dark:text-fv-neutral-400"
      >
        <tr>
          <th
            v-for="(header, key) in headers"
            :key="key"
            @click="
              () => {
                if (sortables[key]) {
                  sortData(key.toString());
                }
              }
            "
            scope="col"
            class="px-6 py-3"
            :class="{
              'cursor-pointer': sortables[key],
            }"
          >
            {{ header }}
            <template v-if="sortables[key] && currentSort.key == key">
              <ArrowUpIcon
                v-if="currentSort.direction == 'desc'"
                class="inline w-3 h-3 align-top mt-0.5"
              />
              <ArrowDownIcon v-else class="inline w-3 h-3 align-top mt-0.5" />
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in sortedData"
          :key="index"
          class="bg-white border-b dark:bg-fv-neutral-900 dark:border-fv-neutral-800 hover:bg-fv-neutral-50 dark:hover:bg-fv-neutral-950"
        >
          <td v-for="(header, key) in headers" :key="key" class="px-6 py-4">
            <slot :name="key" :value="row">
              <template v-if="row[key]">{{ row[key] }} </template>
              <template v-else>{{ $t("global_table_empty_cell") }}</template>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    {{ $t("no_table_data") }}
  </div>
</template>

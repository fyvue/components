<script setup lang="ts">
import { LinkIcon } from "@heroicons/vue/24/solid";
import { computed, ref, toRef } from "vue";
import type { modelValueType, checkboxValueType } from "../types/utils";
import type { ErrorObject } from "@vuelidate/core";
import { useTranslation } from "@fy-/core";
const props = withDefaults(
  defineProps<{
    id: string;
    showLabel?: boolean;
    label?: string;
    type?: string;
    placeholder?: string;
    autocomplete?: string;
    checkboxTrueValue?: string | boolean;
    checkboxFalseValue?: string | boolean;
    req?: boolean;
    linkIcon?: string;
    modelValue?: modelValueType;
    checkboxValue?: checkboxValueType;
    options?: string[][];
    help?: string;
    error?: string;
    errorVuelidate?: ErrorObject[];
    disabled?: boolean;
  }>(),
  {
    showLabel: true,
    type: "text",
    req: false,
    options: () => [],
    checkboxTrueValue: true,
    checkboxFalseValue: false,
    disabled: false,
  }
);
const translate = useTranslation();
const inputRef = ref<HTMLInputElement>();
const errorProps = toRef(props, "error");
const errorVuelidateProps = toRef(props, "errorVuelidate");

const checkErrors = computed(() => {
  if (errorProps.value) return errorProps.value;
  if (errorVuelidateProps.value && errorVuelidateProps.value.length > 0) {
    const err = `vuelidate_validator_${errorVuelidateProps.value[0].$validator.toString()}`;
    return translate(err);
  }

  return null;
});

const focus = () => {
  if (inputRef.value) inputRef.value.focus();
};
const getInputRef = () => {
  if (inputRef.value) return inputRef.value;
};

const emit = defineEmits(["update:modelValue", "update:checkboxValue"]);
const model = computed({
  get: () => props.modelValue,
  set: (items) => {
    emit("update:modelValue", items);
  },
});
const modelCheckbox = computed({
  get: () => props.checkboxValue,
  set: (items) => {
    emit("update:checkboxValue", items);
  },
});
defineExpose({ focus, getInputRef });
</script>
<template>
  <div class="w-full">
    <template v-if="showLabel && id && label">
      <label
        class="inline flex items-center gap-x-1 w-full pt-2 mb-1 text-sm font-bold text-fv-neutral-600 dark:text-fv-neutral-300 uppercase"
        :for="id"
      >
        <input
          :aria-label="label"
          ref="inputRef"
          v-if="type == 'checkbox'"
          type="checkbox"
          class="-mt-1 mr-2 active:outline-1 active:outline-fv-primary-500 checked:outline-1 checked:outline-fv-primary-500 checked:bg-fv-primary-500"
          :id="id"
          :class="{ 'error-form': checkErrors }"
          :true-value="checkboxTrueValue"
          :false-value="checkboxFalseValue"
          v-model="modelCheckbox"
        />

        {{ label }}

        <a
          class="w-5 block -mt-0.5 !mx-2"
          :href="linkIcon"
          target="_blank"
          v-if="linkIcon"
        >
          <LinkIcon />
        </a>
        <sup class="text-red-600 dark:text-red-400" v-if="req">*</sup>
      </label>
    </template>
    <div
      v-if="!['checkbox', 'radiobox'].includes(type)"
      class="rounded flex bg-fv-neutral-50 border border-fv-neutral-300 text-fv-neutral-900 text-sm block w-full dark:bg-fv-neutral-700 dark:border-fv-neutral-600"
      :class="{
        'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400':
          checkErrors,
        'bg-neutral-200 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600':
          disabled,
      }"
    >
      <slot name="before"></slot>
      <input
        ref="inputRef"
        :aria-label="label"
        v-if="
          [
            'text',
            'password',
            'email',
            'search',
            'date',
            'datetime',
            'url',
          ].includes(type)
        "
        class="bg-transparent p-2 border-0 focus:ring-fv-primary-500 focus:border-fv-primary-500 w-full dark:focus:ring-fv-primary-500 dark:focus:border-fv-primary-500 dark:placeholder-fv-neutral-300 dark:text-white"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :id="id"
        v-model="model"
        :type="type"
        :disabled="disabled"
      />
      <textarea
        :aria-label="label"
        ref="inputRef"
        v-if="type == 'textarea'"
        class="h-32 bg-transparent p-2 border-0 focus:ring-fv-primary-500 focus:border-fv-primary-500 w-full dark:focus:ring-fv-primary-500 dark:focus:border-fv-primary-500 dark:placeholder-fv-neutral-300 dark:text-white"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :id="id"
        v-model="model"
        :disabled="disabled"
      />

      <select
        :aria-label="label"
        ref="inputRef"
        v-if="type == 'select'"
        :id="id"
        class="bg-transparent p-2 border-0 focus:ring-fv-primary-500 focus:border-fv-primary-500 w-full dark:focus:ring-fv-primary-500 dark:focus:border-fv-primary-500 dark:placeholder-fv-neutral-300 dark:text-white bg-fv-neutral-50 dark:bg-fv-neutral-700 outline-0 border-0"
        v-model="model"
      >
        <option v-for="opt in options" :value="opt[0]" :key="opt[0].toString()">
          {{ opt[1] }}
        </option>
      </select>
      <slot name="after"></slot>
    </div>

    <div v-if="checkErrors" class="text-sm text-red-600 dark:text-red-500">
      {{ checkErrors }}
    </div>
    <div class="mt-1 text-sm text-gray-500 dark:text-gray-400" v-if="help">
      {{ help }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { LinkIcon } from "@heroicons/vue/24/solid";
import { computed, ref, toRef } from "vue";
import type { modelValueType, checkboxValueType } from "../../types/utils";
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
  <div>
    <template
      v-if="
        [
          'text',
          'password',
          'email',
          'search',
          'date',
          'datetime',
          'url',
          'textarea',
          'select',
        ].includes(type)
      "
    >
      <label
        :for="id"
        v-if="label"
        class="block mb-0.5 text-sm font-semibold text-fv-neutral-900 dark:text-white"
        :class="{
          'text-red-700 dark:text-red-400': checkErrors,
        }"
      >
        {{ label }} <span v-if="req" class="text-red-700">*</span>
      </label>
      <input
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
        class="bg-fv-neutral-50 border border-fv-neutral-300 text-fv-neutral-900 text-sm rounded-lg focus:ring-fv-primary-500 focus:border-fv-primary-500 block w-full p-2.5 dark:bg-fv-neutral-700 dark:border-fv-neutral-600 dark:placeholder-fv-neutral-400 dark:text-white dark:focus:ring-fv-primary-500 dark:focus:border-fv-primary-500"
        :class="{
          'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-400 dark:placeholder-red-500 dark:border-red-500':
            checkErrors,
        }"
        ref="inputRef"
        :aria-describedby="label"
        :autocomplete="autocomplete"
        :id="id"
        v-model="model"
        :type="type"
        :disabled="disabled"
        :required="req"
        :placeholder="placeholder"
      />
      <textarea
        :aria-describedby="label"
        ref="inputRef"
        v-if="type == 'textarea'"
        class="min-h-[6rem] bg-fv-neutral-50 border border-fv-neutral-300 text-fv-neutral-900 text-sm rounded-lg focus:ring-fv-primary-500 focus:border-fv-primary-500 block w-full p-2.5 dark:bg-fv-neutral-700 dark:border-fv-neutral-600 dark:placeholder-fv-neutral-400 dark:text-white dark:focus:ring-fv-primary-500 dark:focus:border-fv-primary-500"
        :class="{
          'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-400 dark:placeholder-red-500 dark:border-red-500':
            checkErrors,
        }"
        :autocomplete="autocomplete"
        :id="id"
        v-model="model"
        :disabled="disabled"
        :required="req"
        :placeholder="placeholder"
      ></textarea>
      <select
        :aria-describedby="label"
        :disabled="disabled"
        v-if="type == 'select'"
        :required="req"
        v-model="model"
        :id="id"
        ref="inputRef"
        :class="{
          'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-400 dark:placeholder-red-500 dark:border-red-500':
            checkErrors,
        }"
        class="bg-fv-neutral-50 border border-fv-neutral-300 text-fv-neutral-900 text-sm rounded-lg focus:ring-fv-primary-500 focus:border-fv-primary-500 block w-full p-2.5 dark:bg-fv-neutral-700 dark:border-fv-neutral-600 dark:placeholder-fv-neutral-400 dark:text-white dark:focus:ring-fv-primary-500 dark:focus:border-fv-primary-500"
      >
        <option v-for="opt in options" :value="opt[0]" :key="opt[0].toString()">
          {{ opt[1] }}
        </option>
      </select>
    </template>

    <template v-if="type == 'checkbox'">
      <div class="flex">
        <div class="flex items-center h-5">
          <input
            :aria-describedby="label"
            :id="id"
            ref="inputRef"
            :true-value="checkboxTrueValue"
            :false-value="checkboxFalseValue"
            v-model="modelCheckbox"
            type="checkbox"
            value=""
            class="w-4 h-4 text-fv-primary-600 bg-fv-neutral-100 border-fv-neutral-300 rounded focus:ring-fv-primary-500 dark:focus:ring-fv-primary-600 dark:ring-offset-fv-neutral-800 focus:ring-2 dark:bg-fv-neutral-700 dark:border-fv-neutral-600"
          />
        </div>
        <div class="ml-2 text-sm">
          <label
            :for="id"
            class="font-medium text-fv-neutral-900 dark:text-fv-neutral-300"
            v-if="label"
            :class="{
              'text-red-600 dark:text-red-400': checkErrors,
            }"
            >{{ label }}
            <a
              class="w-4 h-4 inline-block btn link !mx-1 align-middle"
              :href="linkIcon"
              target="_blank"
              v-if="linkIcon"
            >
              <LinkIcon class="w-4 h-4" />
            </a>
          </label>
          <p
            v-if="help"
            class="text-xs font-normal text-fv-neutral-500 dark:text-fv-neutral-300"
          >
            {{ help }}
          </p>
        </div>
      </div>
    </template>
    <p v-if="checkErrors" class="mt-2 text-xs text-red-600 dark:text-red-400">
      {{ checkErrors }}
    </p>

    <p
      class="mt-2 text-xs text-fv-neutral-500 dark:text-fv-neutral-400"
      v-if="help && !['checkbox', 'radio'].includes(type)"
    >
      {{ help }}
    </p>
  </div>
</template>

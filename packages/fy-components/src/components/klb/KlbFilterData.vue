<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { reactive } from "vue";
import DefaultInput from "../ui/DefaultInput.vue";
import { useEventBus, useTranslation } from "@fy-/core";
import { onMounted } from "vue";
import DefaultDateSelection from "../ui/DefaultDateSelection.vue";
import { onUnmounted } from "vue";
interface FilterData {
  label: string;
  req: boolean;
  uid: string;
  type: string;
  restValue?: string;
  options?: any[][];
  isHidden?: boolean;
  default?: any | undefined;
  formats?: Record<string, (value: any) => any>;
  formatRestValue?: (value: any) => any;
  onChangeValue?: (form: any, value: any) => void;
}
const emit = defineEmits(["update:modelValue"]);
const state = reactive<any>({ formData: {} });
const rules: any = { formData: {} };
const types = reactive<any>({});
const translate = useTranslation();
const props = withDefaults(
  defineProps<{
    data?: Array<Array<FilterData>>;
    css: string;
    modelValue?: Record<string, unknown>;
  }>(),
  {
    showHeaders: true,
    data: () => [],
  }
);
const removeUndefinedStrings = (
  input: any,
  undefinedValues: any[] = ["undefined"]
) => {
  const output: any = {};

  Object.keys(input).forEach((key) => {
    if (!undefinedValues.includes(input[key]) && input[key] !== undefined) {
      if (!input[key]["$between"]) {
        output[key] = input[key];
      } else {
        input[key]["$between"][0] =
          input[key]["$between"][0] == "" || input[key]["$between"][0] == null
            ? undefined
            : input[key]["$between"][0];
        input[key]["$between"][1] =
          input[key]["$between"][1] == "" || input[key]["$between"][1] == null
            ? undefined
            : input[key]["$between"][1];
        if (
          input[key]["$between"][0] !== undefined ||
          input[key]["$between"][1] !== undefined
        ) {
          output[key] = input[key];
        }
      }
    }
  });

  return output;
};

const formatValues = (obj: any) => {
  props.data.forEach((group) => {
    group.forEach((f) => {
      if (f.formats && f.formats[f.type]) {
        obj[f.uid] = f.formats[f.type](obj[f.uid]);
      }
      if (f.formatRestValue) {
        obj[f.uid] = f.formatRestValue(obj[f.uid]);
      }
    });
  });
  return removeUndefinedStrings(obj, ["undefined", ""]);
};

const updateForms = () => {
  state.formData = {};
  rules.formData = {};
  props.data.forEach((group) => {
    group.forEach((f) => {
      state.formData[f.uid] =
        typeof f.default == "object" && f.default
          ? JSON.parse(JSON.stringify(f.default))
          : f.default;

      types[f.uid] = f.type;

      if (f.options && f.options.length) {
        f.options = f.options.map((status) => {
          const [statusKey, statusValue] = status;
          const translatedValue = translate(statusValue);
          return [statusKey, translatedValue];
        });
      }
      rules.formData[f.uid] = {};
    });
  });
  emit("update:modelValue", formatValues({ ...state.formData }));
};
updateForms();
const v$ = useVuelidate(rules, state);

const submitForm = () => {
  emit("update:modelValue", formatValues({ ...state.formData }));
};
const resetForm = () => {
  updateForms();
};
const eventBus = useEventBus();
onMounted(() => {
  eventBus.on("resetFilters", resetForm);
});
onUnmounted(() => {
  eventBus.off("resetFilters", resetForm);
});
</script>
<template>
  <form @submit.prevent="() => submitForm()">
    <div :class="css">
      <div v-for="(g, i) in data" :key="`index_${i}`">
        <template v-for="f in g" :key="f.uid">
          <template v-if="!f.isHidden">
            <DefaultInput
              :type="f.type"
              :label="f.label"
              :id="f.uid"
              v-if="['text', 'select', 'date', 'email'].includes(f.type)"
              :options="f.options ? f.options : [[]]"
              v-model="state.formData[f.uid]"
              :errorVuelidate="v$.formData[f.uid].$errors"
              class="mb-2"
              @change="
                (ev: any) => {
                  if (f.onChangeValue) {
                    f.onChangeValue(state.formData, ev);
                  }
                }
              "
            />
            <DefaultDateSelection
              :id="f.uid"
              :label="f.label"
              v-if="f.type === 'range'"
              mode="interval"
              v-model="state.formData[f.uid]"
              class="mb-2"
            />
          </template>
        </template>
      </div>
    </div>

    <div class="flex justify-between mt-2 gap-x-2">
      <button type="submit" class="btn defaults primary">
        {{ $t("filters_search_cta") }}
      </button>
      <button
        type="reset"
        class="btn defaults neutral"
        @click.prevent="
          () => {
            resetForm();
          }
        "
      >
        {{ $t("filters_clear_cta") }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { reactive } from "vue";
import DefaultInput from "../ui/DefaultInput.vue";
import { useTranslation, removeUndefinedStrings } from "@fy-/core";
import { onMounted } from "vue";
interface FilterData {
  label: string;
  req: boolean;
  uid: string;
  type: string;
  restValue?: string;
  options?: string[][];
  default?: string | undefined;
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

const checkDateValues = (obj: any) => {
  return removeUndefinedStrings(obj);
};

const updateForms = () => {
  state.formData = {};
  rules.formData = {};
  props.data.forEach((group) => {
    group.forEach((f) => {
      state.formData[f.uid] = f.default;
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
  emit("update:modelValue", checkDateValues({ ...state.formData }));
};
updateForms();
const v$ = useVuelidate(rules, state);

const submitForm = () => {
  emit("update:modelValue", checkDateValues({ ...state.formData }));
};
const resetForm = () => {
  updateForms();
};

onMounted(() => {});
</script>
<template>
  <form @submit.prevent="() => submitForm()">
    <div :class="css">
      <div v-for="(g, i) in data" :key="`index_${i}`">
        <template v-for="f in g" :key="f.uid">
          <DefaultInput
            :type="f.type"
            :label="f.label"
            :id="f.uid"
            v-if="['text', 'select', 'date', 'email'].includes(f.type)"
            :options="f.options ? f.options : [[]]"
            v-model="state.formData[f.uid]"
            :errorVuelidate="v$.formData[f.uid].$errors"
            class="mb-2"
          />
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

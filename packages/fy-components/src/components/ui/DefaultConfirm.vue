<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import { useEventBus } from "@fy-/core";
import DefaultModal from "./DefaultModal.vue";
import type { ConfirmModalData } from "../../types/utils";
const eventBus = useEventBus();
const title = ref<string | null>(null);
const desc = ref<string | null>(null);
const onConfirm = ref<Function | null>(null);

const _onConfirm = async () => {
  if (onConfirm.value) {
    await onConfirm.value();
  }
  resetConfirm();
};
const resetConfirm = () => {
  title.value = null;
  desc.value = null;
  onConfirm.value = null;
  eventBus.emit("confirmModal", false);
};
const showConfirm = (data: ConfirmModalData) => {
  title.value = data.title;
  desc.value = data.desc;
  onConfirm.value = data.onConfirm;
  eventBus.emit("confirmModal", true);
};

onMounted(() => {
  eventBus.on("resetConfirm", resetConfirm);
  eventBus.on("showConfirm", showConfirm);
});
onUnmounted(() => {
  eventBus.off("resetConfirm", resetConfirm);
  eventBus.off("showConfirm", showConfirm);
});
</script>
<template>
  <DefaultModal id="confirm" :title="title ? title : ''">
    <div class="leading-relaxed" v-if="desc">
      {{ desc }}
    </div>

    <div class="flex justify-between gap-3 mt-4">
      <button
        @click="$eventBus.emit('confirmModal', false)"
        class="btn neutral medium"
      >
        {{ $t("confirm_modal_cta_cancel") }}
      </button>
      <button @click="_onConfirm()" class="btn primary medium">
        {{ $t("confirm_modal_cta_confirm") }}
      </button>
    </div>
  </DefaultModal>
</template>

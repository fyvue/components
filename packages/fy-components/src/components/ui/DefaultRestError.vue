<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useEventBus } from "@fy-/core";
import DefaultModal from "./DefaultModal.vue";
const eventBus = useEventBus();
const restError = ref<any>();

const openRestError = (err: any) => {
  restError.value = err;
  console.log(err);
  eventBus.emit("restErrorModal", true);
};
onMounted(async () => {
  eventBus.on("restError", openRestError);
});
onUnmounted(() => {
  eventBus.off("restError", openRestError);
});
</script>
<template>
  <DefaultModal id="restError">
    <h2 class="h2">{{ $t("rest_global_error") }}</h2>
    <code class="text-red-600"
      >{{
        restError.token
          ? $t(restError.token)
          : restError.error
          ? restError.error
          : "Unknown error"
      }}
      <small v-if="restError.status">({{ restError.status }})</small></code
    >
  </DefaultModal>
</template>

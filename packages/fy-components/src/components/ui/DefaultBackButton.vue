<script setup lang="ts">
import { ref, onMounted } from "vue";
defineProps<{
  link: string;
}>();
const hasPreviousPage = ref(false);
onMounted(() => {
  hasPreviousPage.value = window && window.history.length > 1;
});
</script>
<template>
  <button
    @click="hasPreviousPage ? $router.go(-1) : $router.push(link)"
    class="btn defaults primary"
  >
    {{ $t("global_back_cta") }}
  </button>
</template>

<script setup lang="ts">

</script>
<template>
    <div>
        <RouterView v-slot="{ Component }">
        <Suspense timeout="0">
          <component :is="Component" />
          <template #fallback>
            <div>Fallback...</div>
            <!--<DefaultLoader id="app-router-suspender" :force="true" />-->
          </template>
        </Suspense>
      </RouterView>
    </div>
</template>
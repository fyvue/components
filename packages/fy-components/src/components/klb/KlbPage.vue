<script setup lang="ts">
import { rest } from "../../helpers/KlbSSR";
import { useSeo } from "../../composables/useSeo";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { useEventBus, useServerRouter } from "@fy-/core";
import type { FyHeadLazy } from "../../types/utils.d.ts";
import type { KlbAPIContentCmsSingle } from "../../types/klb";
import type { Component } from "vue";

const props = withDefaults(
  defineProps<{
    notFoundComponent: Component;
    cmsUuid?: string;
  }>(),
  {
    cmsUuid: "@pages",
  }
);
const route = useRoute();
const page = ref<any>();
const seo = ref<FyHeadLazy>({});
const router = useServerRouter();
const is404 = ref<boolean>(false);
const eventBus = useEventBus();
watch(
  () => route.params.slug,
  async (slug) => {
    await getPage(slug.toString());
  }
);
const getPage = async (slug: string) => {
  eventBus.emit("main-loading", true);
  page.value = undefined;
  seo.value = {};
  is404.value = false;
  const _data = await rest<KlbAPIContentCmsSingle>(
    `Content/Cms/${props.cmsUuid}:loadSlug`,
    "GET",
    {
      slug: slug,
    }
  ).catch((err) => {
    if (err.code == 404) {
      router.status = 404;
      is404.value = true;
      seo.value.title = "404";
    }
    return;
  });

  if (_data && _data.result == "success") {
    page.value = _data.data;
    seo.value.title = page.value.content_cms_entry_data.Title;
    if (page.value.content_cms_entry_data.Short_Contents)
      seo.value.description = page.value.content_cms_entry_data.Short_Contents;
    seo.value.published = new Date(
      parseInt(page.value.content_cms_entry_data.Published.unixms)
    ).toISOString();
    seo.value.modified = new Date(
      parseInt(page.value.content_cms_entry_data.Last_Modified.unixms)
    ).toISOString();
  }
  eventBus.emit("main-loading", false);
};
await getPage(route.params.slug.toString());
useSeo(seo);
</script>
<template>
  <div class="w-full">
    <h1 class="text-xl md:text-2xl mb-4 h1 title-cms" v-if="page">
      {{ page.content_cms_entry_data.Title }}
    </h1>
    <div
      class="prose-dark lg:prose-xl !max-w-none"
      v-if="page"
      v-html="page.content_cms_entry_data.Contents"
    ></div>

    <component :is="notFoundComponent" v-if="is404" />
  </div>
</template>

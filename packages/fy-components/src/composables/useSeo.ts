import type { Ref } from "vue";
import { getUrl, getLocale } from "@karpeleslab/klbfw";
import { useFyHead } from "@fy-/head";
import { computed } from "vue";
import { FyHeadLazy } from "../types/utils";

export const useSeo = (seo: Ref<FyHeadLazy>, initial: boolean = false) => {
  useFyHead({
    title: computed(() => seo.value.title),
    links: computed(() => {
      const _res: Array<any> = [];

      if (!seo.value.canonical) {
        _res.push({
          rel: "canonical",
          href: `${getUrl().scheme}://${getUrl().host}${getUrl().path}`,
          key: "canonical",
        });
      }
      if (seo.value.canonical) {
        _res.push({
          rel: "canonical",
          href: `${seo.value.canonical}`,
          key: "canonical",
        });
      }
      if (seo.value.prev) {
        _res.push({
          rel: "prev",
          href: seo.value.prev,
          key: "prev",
        });
      }
      if (seo.value.next) {
        _res.push({
          rel: "next",
          href: seo.value.next,
          key: "next",
        });
      }
      return _res;
    }),
    /*htmlAttrs: computed(() => {
      if (initial && getMode() == 'ssr')
        return { lang: computed(() => getLocale()) };
      return {};
    }),
    bodyAttrs: computed(() => {
      if (initial) return { itemtype: 'http://schema.org/WebPage' };
      return {};
    }),*/
    metas: computed(() => {
      const _res: Array<any> = [];

      if (!seo.value.url) {
        _res.push(
          {
            property: "og:locale",
            content: getLocale().replace("-", "_"),
          },
          {
            property: "og:url",
            content: getUrl().full,
          }
        );
      }
      _res.push(
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "robots",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        }
      );
      if (seo.value.isAdult && seo.value.isAdult == true) {
        _res.push({
          property: "rating",
          content: "adult",
        });
        _res.push({
          property: "RATING",
          content: "RTA-5042-1996-1400-1577-RTA",
        });
      }
      if (seo.value.url) {
        _res.push({
          property: "og:url",
          content: seo.value.url,
        });
      }
      if (seo.value.name) {
        _res.push({
          property: "og:site_name",
          content: seo.value.name,
        });
      }
      if (seo.value.type) {
        _res.push({
          property: "og:type",
          content: seo.value.type,
        });
      }
      if (seo.value.title) {
        _res.push(
          {
            property: "og:title",
            content: seo.value.title,
          },
          {
            name: "twitter:title",
            content: seo.value.title,
          }
        );
      }
      if (seo.value.description) {
        _res.push(
          {
            property: "og:description",
            content: seo.value.description,
          },
          {
            name: "twitter:description",
            content: seo.value.description,
          },
          {
            property: "og:description",
            content: seo.value.description,
          },
          {
            name: "description",
            content: seo.value.description,
          }
        );
      }
      if (seo.value.published) {
        _res.push({
          property: "article:published_time",
          content: seo.value.published,
        });
      }
      if (seo.value.modified) {
        _res.push({
          property: "article:modified_time",
          content: seo.value.modified,
        });
      }
      if (seo.value.imageWidth && seo.value.imageHeight) {
        _res.push(
          {
            property: "og:image:width",
            content: seo.value.imageWidth,
          },
          {
            property: "og:image:height",
            content: seo.value.imageHeight,
          }
        );
      }
      if (seo.value.imageType) {
        _res.push({
          property: "og:image:type",
          content: seo.value.imageType,
        });
        _res.push({
          property: "twitter:image:type",
          content: seo.value.imageType,
        });
      }
      if (seo.value.image) {
        _res.push(
          {
            property: "og:image",
            content: seo.value.image,
          },
          {
            name: "twitter:image",
            content: seo.value.image,
          }
        );
      }

      return _res;
    }),
  });
};

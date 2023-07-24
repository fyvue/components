<script setup lang="ts">
import { DefaultGallery } from "@fy-/components";
import { reactive, ref } from "vue";
const images = [
  {
    uuid: "569397cc-ea2a-4bb4-859d-d1e55e6ee541",
    enabled: true,
    sensitive: false,
    created: "2023-07-23T03:43:46.507719",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/267e37b4-9813-4f31-9f0e-10d25bb62059",
  },
  {
    uuid: "5a91f232-0a93-4adc-9528-e3c32e839792",
    enabled: true,
    sensitive: false,
    created: "2023-07-23T00:15:42.749117",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/8da49985-07a8-4d17-a5f0-a0d958fa824b",
  },
  {
    uuid: "a0d6fd92-711f-4f70-b49b-c5e2dce85d5a",
    enabled: true,
    sensitive: false,
    created: "2023-07-23T00:15:07.147203",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/e23fa878-1346-49e0-864c-9bf0d388a97e",
  },
  {
    uuid: "d6e80875-db61-45ef-95b3-543b30f640d0",
    enabled: true,
    sensitive: false,
    created: "2023-07-23T00:14:40.300263",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/529bcd15-764c-4cea-b545-f0a99c642959",
  },
  {
    uuid: "2f512b8e-a5ff-44b5-b8f6-eab6b3c19557",
    enabled: true,
    sensitive: false,
    created: "2023-07-23T00:14:13.588967",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/58724bba-ce9d-41aa-bf39-048bcf56327a",
  },
];
const currentImage = ref<number>(0);
const examples = `_script_
    const images = [
        {
            "http://localhost:8082/_special/rest/AIx/images/267e37b4-9813-4f31-9f0e-10d25bb62059",
        },
        {
            image_url:
            "http://localhost:8082/_special/rest/AIx/images/8da49985-07a8-4d17-a5f0-a0d958fa824b",
        },
    ]
_script_end_
<template>
    <div class="bg-fv-primary-50 rounded shadow-xs flex items-center px-2 py-0.5">
        <DefaultGallery :images="images" />
    </div>
</template>
`;
</script>
<template>
  <div>
    <h1
      class="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
    >
      Gallery <small>DefaultGallery</small>
    </h1>
    <p class="mb-4 text-lg text-gray-600 dark:text-gray-400">
      Default Gallery component.
    </p>
    <div class="pt-4 mb-8 border-t border-gray-200 dark:border-gray-800">
      <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Examples {{ currentImage }}
      </h2>
      <div
        class="bg-fv-primary-50 rounded shadow-xs flex items-center px-2 py-0.5"
      >
        <DefaultGallery id="test" :images="images" v-model="currentImage" />
      </div>
      <div class="bg-fv-neutral-700 mt-4 p-3 rounded shadow text-white text-sm">
        <pre>{{ $cleanScript(examples) }}</pre>
      </div>
    </div>
  </div>
</template>

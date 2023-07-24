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
  {
    uuid: "9b039e44-3a2c-47db-8c47-b6dd6eebb8b9",
    enabled: true,
    sensitive: false,
    created: "2023-07-23T00:13:29.151543",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/531957c1-a864-4ee2-8ae8-e8453fa3c614",
  },
  {
    uuid: "1dc17fdc-7a2d-4cfc-8499-165382ccd7c2",
    enabled: true,
    sensitive: false,
    created: "2023-07-22T23:15:42.142825",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/3522e28b-7859-4a63-a18e-391bc44accc1",
  },
  {
    uuid: "a09331f7-610f-4252-8800-88f2cd27f943",
    enabled: true,
    sensitive: false,
    created: "2023-07-22T23:14:14.463269",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/500dabfe-8fa4-4da1-a6fd-553ccd4e900e",
  },
  {
    uuid: "ed750e27-fed9-4dec-8ce8-47cb196683d7",
    enabled: true,
    sensitive: false,
    created: "2023-07-22T23:13:38.806275",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/267e37b4-9813-4f31-9f0e-10d25bb62059",
  },
  {
    uuid: "67371c69-e90b-4555-a7bf-d1a94b5f3157",
    enabled: true,
    sensitive: false,
    created: "2023-07-22T23:13:12.107194",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/58724bba-ce9d-41aa-bf39-048bcf56327a",
  },
  {
    uuid: "71879c9c-1646-4f2c-a4b3-3927ebb65423",
    enabled: true,
    sensitive: false,
    created: "2023-07-22T22:07:53.703108",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/9c106be0-2045-439d-b032-0501d92de94d",
  },
  {
    uuid: "fb79fb5b-50b9-44d9-8033-1953f6866c6f",
    enabled: true,
    sensitive: false,
    created: "2023-07-22T22:07:03.090757",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/ac9497f5-6585-44e8-88c8-5cb0c741e253",
  },
  {
    uuid: "579f69fb-1793-46e8-86ec-b480b788f4db",
    enabled: true,
    sensitive: false,
    created: "2023-07-22T21:22:03.244728",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/8198d3a7-2bec-404f-b8c4-928b6cdb12fc",
  },
  {
    uuid: "cf43543f-51d3-41cd-b34f-ab28ab19e98c",
    enabled: true,
    sensitive: false,
    created: "2023-07-22T21:21:29.986089",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/fd373d17-5396-4fe0-bfe0-d5c1549e3217",
  },
  {
    uuid: "d5cfc2c0-d0f1-4c91-b916-1878609079c4",
    enabled: true,
    sensitive: false,
    created: "2023-07-22T21:21:12.993681",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/24785aec-ac10-4f2f-b092-f32333b2023e",
  },
  {
    uuid: "c90b0ecc-2330-4953-9748-871da6c98b5e",
    enabled: true,
    sensitive: false,
    created: "2023-07-22T21:20:48.073295",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/94f7fa43-7dab-429c-9d29-6153250684e1",
  },
  {
    uuid: "f33ca30c-8ec4-4700-b92b-ce6a66fed799",
    enabled: true,
    sensitive: true,
    created: "2023-07-23T18:54:38.864287",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/76aa6cbe-2d60-4053-ad3a-75eb083cb56a",
  },
  {
    uuid: "b66ff590-b77e-48bd-bb96-0b7a40d945e7",
    enabled: true,
    sensitive: true,
    created: "2023-07-23T18:54:23.720934",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/468f7643-cfc7-45c7-b5cc-ddb2e76c6eae",
  },
  {
    uuid: "82872018-f1b2-4efc-a5f7-755fbc060dd5",
    enabled: true,
    sensitive: true,
    created: "2023-07-23T07:12:22.331350",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/757c2aba-a84a-4386-abec-48aeeac8211e",
  },
  {
    uuid: "96d5622f-7963-4f60-b425-5c16fcc5119b",
    enabled: true,
    sensitive: true,
    created: "2023-07-23T07:10:01.776950",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/b950d64d-cb34-429d-8f39-7ec9d321b519",
  },
  {
    uuid: "3d1cc1fd-5a1d-4907-b1bb-f5efcd95ff6a",
    enabled: true,
    sensitive: true,
    created: "2023-07-23T07:08:44.611001",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/4f9e2089-a01c-4a72-a42b-bde94b9dd46e",
  },
  {
    uuid: "c64b38d5-ab65-48b3-9999-e6ad34ffdd95",
    enabled: true,
    sensitive: true,
    created: "2023-07-23T06:25:17.107164",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/2101c309-bd98-4cfa-a221-1a09d56dc3e0",
  },
  {
    uuid: "ffacba21-79fe-4ae9-9749-928545c2eb83",
    enabled: true,
    sensitive: true,
    created: "2023-07-23T05:31:11.011855",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/05a6af09-1557-4ece-96cb-91350e4f5d68",
  },
  {
    uuid: "1185b4a3-ea23-4c51-8376-c340505de78c",
    enabled: true,
    sensitive: true,
    created: "2023-07-23T05:30:54.181862",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/57530bd1-f23b-4cf1-bca9-e1681351e994",
  },
  {
    uuid: "3d31340e-1f59-42a7-9443-4aac117ac759",
    enabled: true,
    sensitive: true,
    created: "2023-07-22T22:07:45.293983",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/2abfdb22-1cf1-4acb-a4a5-4361126b87b1",
  },
  {
    uuid: "1c8f5b62-bef6-4659-ba32-752bb3076eeb",
    enabled: true,
    sensitive: true,
    created: "2023-07-22T22:06:20.651893",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/a88a5cdf-84e4-4052-ae68-b4c22dacb35e",
  },
  {
    uuid: "9f9feeb6-8f50-4694-9df5-3b0574a59cc5",
    enabled: true,
    sensitive: true,
    created: "2023-07-22T22:06:03.182424",
    image_url:
      "http://localhost:8082/_special/rest/AIx/images/c43fe53c-4da3-4394-9b3b-b5b74b125c84",
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

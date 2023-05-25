<script setup lang="ts"></script>
<template>
  <div>
    <h1
      class="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
    >
      Buttons
    </h1>
    <p class="mb-4 text-lg text-gray-600 dark:text-gray-400">
      Default styles for buttons using the css class <strong>btn</strong>,
      usable for buttons and links.
    </p>
    <div class="pt-4 mb-8 border-t border-gray-200 dark:border-gray-800">
      <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Examples
      </h2>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        Examples using the class btn and the variants.<br />
        <b>Colors variants:</b> <code>.primary</code>, <code>.accent</code>,
        <code>.danger</code>, <code>.valid</code>, <code>.neutral</code>.<br />
        <b>Size variants:</b> <code>.defaults</code>, <code>.large</code>,
        <code>.small</code>,
        <code>.medium</code>
      </p>
      <div class="my-2 flex flex-wrap gap-4 justify-start items-center">
        <button class="btn primary defaults">btn primary defaults</button>
        <button class="btn accent large">btn accent large</button>
        <button class="btn neutral medium">btn neutral medium</button>
        <button class="btn valid defaults">btn valid</button>
        <button class="btn valid small">btn valid small</button>
        <button class="btn danger defaults font-bold">
          font-bold btn danger defaults
        </button>
        <button class="btn link">btn link</button>
      </div>
    </div>
  </div>
</template>

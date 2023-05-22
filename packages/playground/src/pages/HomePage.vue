<script setup lang="ts">
import { DefaultInput, DefaultModal } from "@fy-/components";
import { ref } from "vue";
const inputTest = ref();
const checkBox = ref();
</script>
<template>
  <DefaultModal id="test" title="Test Modal">
    <div class="p-4">
      <p>test</p>
    </div>
  </DefaultModal>
  <div class="mt-10 container -mx-auto px-4">
    <DefaultInput
      type="text"
      v-model="inputTest"
      label="Username"
      id="username"
      help="Your profile will be wserie.com/USERNAME."
      class="mt-4"
    />

    <DefaultInput
      type="checkbox"
      :checkboxValue="checkBox"
      label="Test checkbox"
      class="mt-4"
      id="thecheckbox"
      checkboxFalseValue="0"
      checkboxTrueValue="1"
    />

    <DefaultInput
      type="textarea"
      v-model="inputTest"
      label="Test textarea"
      id="textarea"
      class="mt-4"
    />
    <DefaultInput
      type="select"
      class="mt-4"
      id="eaze"
      v-model="inputTest"
      :options="[
        ['1', '1'],
        ['2', '2'],
      ]"
      label="Test Select"
    />
    <button
      class="btn primary defaults mt-4"
      @click="$eventBus.emit('testModal', true)"
    >
      open modal</button
    ><br /><br />
    <button class="btn accent large" @click="$eventBus.emit('testModal', true)">
      open modal</button
    ><br /><br />
    <button
      class="btn neutral medium"
      @click="$eventBus.emit('testModal', true)"
    >
      open modal</button
    ><br /><br />
    <button
      class="btn valid defaults"
      @click="$eventBus.emit('testModal', true)"
    >
      open modal</button
    ><br /><br />
    <a href="#" class="btn link">Test link</a>
  </div>
</template>

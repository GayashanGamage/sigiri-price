<template>
  <div
    :class="
      sitestore.notificationStyle === 'warning' &&
      sitestore.notificationSize == 'sm'
        ? 'max-w-[250px] min-w-[200px] w-full bg-amber-500 rounded-sm p-2'
        : sitestore.notificationStyle === 'success' &&
          sitestore.notificationSize == 'md'
        ? 'max-w-[300px] min-w-[200px] w-full bg-green-500 rounded-md p-3'
        : sitestore.notificationStyle === 'info' &&
          sitestore.notificationSize == 'lg'
        ? 'max-w-[350px] min-w-[200px] w-full bg-blue-500 rounded-lg p-5'
        : 'bg-green-500'
    "
    class="flex flex-col h-auto gap-8 sticky bottom-10 float-end mr-10"
    v-if="sitestore.notificationBar"
  >
    <div
      class="flex flex-row justify-between"
      :class="
        sitestore.notificationSize == 'sm'
          ? 'text-sm'
          : sitestore.notificationSize == 'md'
          ? 'text-base'
          : sitestore.notificationSize == 'lg'
          ? 'text-lg'
          : 'text-base'
      "
    >
      <p class="text-white">{{ sitestore.notificationText }}</p>
      <i
        class="fi fi-rr-circle-xmark text-white text-lg hover:text-black"
        @click="notificationClose"
      ></i>
    </div>
  </div>
</template>
<script setup>
import { siteStore } from "@/stores/sitedata";
const sitestore = siteStore();

const notificationClose = () => {
  sitestore.notificationAutoClose();
  sitestore.notificationBar = false;
};
</script>

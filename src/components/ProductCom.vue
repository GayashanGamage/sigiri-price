<template>
  <div class="c-level-one-container">
    <p>tracked product</p>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { onBeforeMount, ref } from "vue";

name: "ProductCom";
const allProducts = ref();
</script>

<style scoped>
.c-level-one-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}
</style>

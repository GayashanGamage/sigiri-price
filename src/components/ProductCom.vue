<template>
  <div class="c-level-one-container">
    <div class="c-level-two-container">
      <p>name : {{}}</p>
      <p>original price : {{}}</p>
      <p>your price : {{}}</p>
      <button>Change price</button>
      <button>Delete product</button>
    </div>
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
.c-level-two-container {
  display: flex;
  flex-direction: row;
}
</style>

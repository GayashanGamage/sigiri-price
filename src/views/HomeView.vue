<template>
  <div class="v-level-one-container">
    <MenubarCom></MenubarCom>
    <ProductView></ProductView>
    <FooterCom></FooterCom>
  </div>
</template>

<script setup>
import FooterCom from "@/components/FooterCom.vue";
import MenubarCom from "@/components/MenubarCom.vue";
import ProductView from "@/components/ProductView.vue";
</script>

<style scoped>
.v-level-one-container {
  width: 100vw;
  height: 99vh;
  margin: 0px !important;
  padding: 0px;
  position: 0;
}
</style>

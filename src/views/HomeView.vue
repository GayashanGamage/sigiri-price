<template>
  <div class="v-level-one-container">
    <MenubarCom></MenubarCom>
    <ProductView></ProductView>
    <What></What>
    <HowToWork></HowToWork>
    <QA></QA>
    <FooterCom></FooterCom>
  </div>
</template>

<script setup>
import FooterCom from "@/components/Common/FooterCom.vue";
import HowToWork from "@/components/Homepage/HowToWork.vue";
import MenubarCom from "@/components/Common/MenubarCom.vue";
import ProductView from "@/components/Homepage/ProductView.vue";
import QA from "@/components/Homepage/QA.vue";
import What from "@/components/Homepage/What.vue";
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

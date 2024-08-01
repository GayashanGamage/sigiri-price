<template>
  <div class="v-levle-one-container">
    <MenubarCom></MenubarCom>
    <div class="v-level-two-container">
      <p>members page</p>
    </div>
    <FooterCom></FooterCom>
  </div>
</template>

<script setup>
import FooterCom from "@/components/FooterCom.vue";
import MenubarCom from "@/components/MenubarCom.vue";
MenubarCom;
name: "Member";
</script>

<style scoped>
.v-level-two-container {
  height: 85vh;
}
</style>

<template>
  <div class="v-levle-one-container">
    <MenubarCom></MenubarCom>
    <router-view></router-view>
    <FooterCom></FooterCom>
  </div>
</template>

<script setup>
import FooterCom from "@/components/FooterCom.vue";
import MenubarCom from "@/components/MenubarCom.vue";
import axios from "axios";
name: "Member";
</script>

<style scoped></style>

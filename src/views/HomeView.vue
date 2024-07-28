<template>
  <div class="v-level-one-container">
    <MenubarCom></MenubarCom>
    <div class="v-level-two-container">
      <input type="text" class="url-input" />
      <button class="find-button">Show Product</button>
    </div>
    <FooterCom></FooterCom>
  </div>
</template>

<script setup>
import FooterCom from "@/components/FooterCom.vue";
import MenubarCom from "@/components/MenubarCom.vue";
name: "HomeView";
</script>

<style scoped>
.v-level-one-container {
  width: 100vw;
  height: 99vh;
  margin: 0px !important;
  padding: 0px;
  position: 0;
}
.v-level-two-container {
  width: 99vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.url-input {
  width: 30vw;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #b5c0d0;
  outline: none;
  font-family: "League Spartan", sans-serif;
  font-weight: 200;
  letter-spacing: 1px;
  font-size: 22px;
  padding: 0px 10px;
}
.find-button {
  width: 200px;
  height: 30px;
  font-family: "League Spartan", sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 20px;
  border: 0px;
  margin: 20px;
  border-radius: 4px;
}
</style>

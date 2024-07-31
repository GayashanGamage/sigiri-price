<template>
  <div class="c-level-one-container">
    <div class="c-level-two-container">
      <h1 class="site-title">RUKA.PRICE</h1>
      <button class="logout">Member</button>
    </div>
  </div>
</template>

<script setup>
name: "MenubarCom";
</script>

<style scoped>
.c-level-one-container {
  background-color: #eeeeee;
  margin-top: 0;
  padding-top: 0;
  height: 8vh;
  display: flex;
  flex-direction: row;
}
.c-level-two-container {
  border: 1px solid black;
  width: 100%;
}
.site-title {
  font-family: "League Spartan", sans-serif;
  padding: 10px 40px;
  float: left;
}
.logout {
  width: 100px;
  height: 60%;
  font-size: 20px;
  font-weight: 300;
  float: right;
  margin: 10px 40px;
}
</style>

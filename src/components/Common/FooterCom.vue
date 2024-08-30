<template>
  <div class="f-level-one-container">
    <p>
      Develop by
      <span><a href="https://gamage.me" target="_blank">@gamage.me</a></span>
    </p>
  </div>
</template>

<script setup>
name: "FooterCom";
</script>

<style scoped>
.f-level-one-container {
  background-color: #6482ad;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f5eded;
}
a {
  text-decoration: none;
  color: #f5eded;
}
a:hover {
  text-decoration: underline;
}
</style>

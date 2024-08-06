<template>
  <div class="c-level-one-container">
    <div class="c-level-two-container">
      <div class="content-one">
        <p>Name :</p>
        <p>Email :</p>
        <p>Password :</p>
        <button @click="deleteAccount">Delete account</button>
      </div>
      <div class="content-two">
        <p>{{ userDetails["_id"] }}</p>
        <p>{{ userDetails["first_name"] }}</p>
        <p>{{ userDetails["email"] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { onBeforeMount, ref } from "vue";
name: "SettingCom";

let userDetails = ref({});

const deleteAccount = () => {
  let allCookie = document.cookie.split("; ");
  let selectedCookie = "";
  for (let i = 0; i < allCookie.length; i++) {
    if (allCookie[i].startsWith("token=")) {
      selectedCookie = allCookie[i].slice(6);
    }
  }
  axios
    .post(
      `${import.meta.env.VITE_site}/remove-account`,
      {},
      {
        headers: {
          Authorization: `Bearer ${selectedCookie}`,
        },
      }
    )
    .then((response) => {
      let allCookie = document.cookie.split("; ");
      for (let i = 0; i < allCookie.length; i++) {
        if (allCookie[i].startsWith("token=")) {
          document.cookie = allCookie[i] + "; max-age=-100";
        }
      }
      localStorage.removeItem("username");
      router.replace("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
onBeforeMount(() => {
  let allCookie = document.cookie.split("; ");
  let selectedCookie = "";
  for (let i = 0; i < allCookie.length; i++) {
    if (allCookie[i].startsWith("token=")) {
      selectedCookie = allCookie[i].slice(6);
    }
  }
  axios
    .post(
      `${import.meta.env.VITE_site}/account-data`,
      {},
      {
        headers: {
          Authorization: `Bearer ${selectedCookie}`,
        },
      }
    )
    .then((response) => {
      userDetails.value = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<style scoped>
.c-level-one-container {
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.c-level-two-container {
  display: flex;
  flex-direction: row;
}
</style>

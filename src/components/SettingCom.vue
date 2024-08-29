<template>
  <div class="c-level-one-container">
    <div class="c-level-two-container">
      <div class="content-one">
        <p class="title">Name :</p>
        <p class="title">Email :</p>
        <p class="title">Password :</p>
      </div>
      <div class="content-two">
        <p class="value">{{ userDetails["first_name"] }}</p>
        <p class="value">{{ userDetails["email"] }}</p>
        <button class="change_button">Change</button><br />
        <button @click="deleteAccount" class="delete_button">
          Remove account
        </button>
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
  background-color: #f6f6f6;
}
.c-level-two-container {
  display: flex;
  flex-direction: row;
  padding: 70px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 4px 4px 13px 4px #f5eded;
}
.title {
  font-weight: 500;
  font-size: 18px;
  margin-top: 5px;
}
.value {
  font-weight: 200;
  font-size: 18px;
  margin-top: 5px;
  margin-left: 20px;
}
.delete_button,
.change_button {
  margin-left: 20px;
  font-weight: 250;
  font-size: 18px;
  margin-top: 5px;
  padding: 0 20px;
  background-color: #7fa1c3;
  border: 0px;
  border-radius: 4px;
  color: #ffffff;
}
.delete_button:hover,
.change_button:hover {
  background-color: #6482ad;
}
</style>

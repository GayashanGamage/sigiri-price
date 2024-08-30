<template>
  <div class="level-three-container">
    <!-- signin part -->
    <div class="level-four-container action">
      <input
        type="text"
        placeholder="Email"
        class="user_input"
        v-model="l_email"
      />
      <input
        type="password"
        placeholder="Password"
        class="user_input"
        id="user_input"
        v-model="l_password"
        @keypress="toggleButton"
        @focusout="hideToggleButton"
      />
      <p v-if="dotToggle" id="toggle" @click="passwordToggle" class="showHide">
        show
      </p>
      <button class="userAction" @click="login">LogIn</button>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
name: "MemberprocessView";

const toast = useToast();

// signin data collectors -----------------------
const dotToggle = ref(false);
const dotToText = ref(false);

// loging credentials
const l_email = ref("");
const l_password = ref("");

// signIn functions -----------------------------
// show text password show functionality
const toggleButton = () => {
  if (l_password.value.length > 0) {
    dotToggle.value = true;
  }
};

// hide text password show functionality
const hideToggleButton = () => {
  if (l_password.value.length == 0) {
    dotToggle.value = false;
  }
};

// toggle between text and dot in password
const passwordToggle = () => {
  if (dotToText.value == false) {
    document.getElementById("user_input").type = "text";
    document.getElementById("toggle").innerHTML = "Hide";
    dotToText.value = true;
  } else {
    document.getElementById("user_input").type = "password";
    document.getElementById("toggle").innerHTML = "Show";
    dotToText.value = false;
  }
};

const login = () => {
  axios
    .post(`${import.meta.env.VITE_site}/login`, {
      email: l_email.value,
      password: l_password.value,
    })
    .then(function (response) {
      document.cookie =
        "token=" +
        `${response.data["token"]}` +
        "; expires=Thu, 31 Dec 2025 12:00:00 UTC";
      // #TODO: add first_name to localStorage
      localStorage.setItem("username", response.data["name"]);
      router.replace("/profile/setting");
    })
    .catch(function (error) {
      toast.error("something go wrong");
    });
};
</script>

<style scoped>
.level-three-container {
  width: 24vw;
  height: 50vh;
  border-radius: 6px;
}
/* entire form with back-button */
.action {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  height: 85%;
  background-color: #ffffff;
  box-shadow: 4px 4px 13px 4px #f5eded;
  border-radius: 0 0 4px 4px;
  border-top: 0px;
}
/* user input boxes */
.user_input {
  font-size: 20px;
  width: 70%;
  font-weight: 200;
  outline: none;
  padding: 5px 0px 5px 20px;
  border-radius: 6px;
  border: 1px solid #cec8c8;
}
/* signin button styling */
.userAction {
  width: 76%;
  height: 36px;
  border-radius: 6px;
  border: 0px;
  background-color: #7fa1c3;
  font-size: 18px;
  color: #ffffff;
}
.userAction:hover {
  background-color: #6482ad;
}
/* password show/hide ♦ */
.showHide {
  align-self: flex-end;
  margin-right: 55px;
  color: #7fa1c3;
  cursor: pointer;
}
.showHide:hover {
  color: #000000;
}
</style>

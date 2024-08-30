<template>
  <div class="level-one-container">
    <div class="v-level-four-container action">
      <input
        type="text"
        placeholder="Email"
        class="user_input"
        v-model="email"
      />
      <input
        type="text"
        placeholder="First name"
        class="user_input"
        v-model="first_name"
      />
      <input
        type="password"
        placeholder="password"
        class="user_input"
        id="password_sup_1"
        v-model="password"
        @keypress="toggleButton_sup"
        @focusout="hideToggleButton_sup"
      />
      <input
        type="password"
        placeholder="Confirm password"
        class="user_input"
        id="password_sup_2"
        v-model="password2"
        @keypress="toggleButton_sup"
        @focusout="hideToggleButton_sup"
      />
      <p
        v-if="dotToggle_sup"
        id="toggle_sup"
        @click="passwordToggle_sup"
        class="showHide"
      >
        show
      </p>
      <button class="userAction" @click="register">Register</button>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// toast message init
const toast = useToast();

// signup data collectors -----------------------
const dotToggle_sup = ref(false);
const dotToText_sup = ref(false);

// user register details
const email = ref("");
const first_name = ref("");
const password = ref("");
const password2 = ref("");

// signup functions ---------------------------------
// show text password show functionality
const toggleButton_sup = () => {
  if (password.value.length > 0 || password2.value.length > 0) {
    dotToggle_sup.value = true;
  }
};

// hide text password show functionality
const hideToggleButton_sup = () => {
  if (password.value.length == 0 && password2.value.length == 0) {
    dotToggle_sup.value = false;
  }
};

// toggle between text and dot in password
const passwordToggle_sup = () => {
  if (dotToText_sup.value == false) {
    // console.log("yep");
    document.getElementById("password_sup_1").type = "text";
    document.getElementById("password_sup_2").type = "text";
    document.getElementById("toggle_sup").innerHTML = "Hide";
    dotToText_sup.value = true;
  } else {
    // console.log("nop");
    document.getElementById("password_sup_1").type = "password";
    document.getElementById("password_sup_2").type = "password";
    document.getElementById("toggle_sup").innerHTML = "Show";
    dotToText_sup.value = false;
  }
};

// register function
const register = () => {
  axios
    .post(`${import.meta.env.VITE_site}/create-user`, {
      email: email.value,
      first_name: first_name.value,
      password: password.value,
    })
    .then(function (response) {
      document.cookie =
        "token=" +
        `${response.data["token"]}` +
        "; expires=Thu, 31 Dec 2025 12:00:00 UTC";
      localStorage.setItem("username", first_name.value);
      console.log("before router");
      router.replace("/profile/setting");
      console.log("after router");
    })
    .catch(function (error) {
      console.log(error);
      toast.error("this is email already use in this application");
    });
};
</script>

<style scoped>
/* area that include all input field and signup button */
.level-one-container {
  height: 43vh;
}
/* container that include user input and actionbutton */
.action {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 4px 4px 13px 4px #f5eded;
  border-radius: 0 0 4px 4px;
  border-top: 0px;
}
/* user input fields */
.user_input {
  font-size: 20px;
  width: 70%;
  font-weight: 200;
  outline: none;
  padding: 5px 0px 5px 20px;
  border-radius: 6px;
  border: 1px solid #cec8c8;
}
/* signup button  */
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
/* password show/hide toggle */
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

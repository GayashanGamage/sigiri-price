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
      <div class="validation-box">
        <p class="validation-message invalied" id="validation1">
          <span
            class="material-symbols-outlined validation-icon"
            id="validation1-icon"
          >
            close </span
          >Email valied
        </p>
        <p class="validation-message invalied" id="validation2">
          <span
            class="material-symbols-outlined validation-icon"
            id="validation2-icon"
          >
            close </span
          >Min lenth of password 8
        </p>
        <p class="validation-message invalied" id="validation3">
          <span
            class="material-symbols-outlined validation-icon"
            id="validation3-icon"
          >
            close </span
          >Password matched
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { ref, watch } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// toast message init
const toast = useToast();

// signup data collectors -----------------------
const dotToggle_sup = ref(false);
const dotToText_sup = ref(false);

// user input validation
const valiedEmail = ref(false);
const valiedPassword = ref(false);
const passwordMatch = ref(false);

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

// watch for password lenth
watch(password, (newValue, oldValue) => {
  if (newValue.length >= 8) {
    // change color of validation message
    document.getElementById("validation2").classList.add("valied");
    document.getElementById("validation2").classList.remove("invalied");
    // change icon of validation message
    document.getElementById("validation2-icon").innerHTML = "check";
  } else {
    // change color of validation message
    document.getElementById("validation2").classList.remove("valied");
    document.getElementById("validation2").classList.add("invalied");
    // change icon of validation message
    document.getElementById("validation2-icon").innerHTML = "close";
  }
});

// watch for email validation
watch(email, (newValue, oldValue) => {
  let valiedEmail = String(newValue)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (valiedEmail != null) {
    // change color of validation message
    document.getElementById("validation1").classList.add("valied");
    document.getElementById("validation1").classList.remove("invalied");
    // change validation icon
    document.getElementById("validation1-icon").innerHTML = "check";
  } else {
    // change color of validation message
    document.getElementById("validation1").classList.remove("valied");
    document.getElementById("validation1").classList.add("invalied");
    // change validation icon
    document.getElementById("validation1-icon").innerHTML = "close";
  }
});

// watch for password mache
watch(
  [password, password2],
  ([newPassword, newPassword2], [oldPassword, oldPassword2]) => {
    if (
      newPassword === newPassword2 &&
      (newPassword !== "" || newPassword2 !== "")
    ) {
      // change color of validation message
      document.getElementById("validation3").classList.remove("invalied");
      document.getElementById("validation3").classList.add("valied");
      // change icon of validation message
      document.getElementById("validation3-icon").innerHTML = "check";
    } else {
      // change color of validation message
      document.getElementById("validation3").classList.add("invalied");
      document.getElementById("validation3").classList.remove("valied");
      // change icon of validation message
      document.getElementById("validation3-icon").innerHTML = "close";
    }
  }
);
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
  height: 60vh;
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
.validation-box {
  margin-top: 15px;
  width: 75%;
}
.validation-message {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.validation-icon {
  font-size: 16px;
  font-weight: 900;
  margin-right: 16px;
}
.valied {
  color: green;
}
.invalied {
  color: red;
}
</style>

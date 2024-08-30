<template>
  <div class="level-three-container">
    <!-- signin part -->
    <div class="level-four-container action">
      <input
        type="text"
        placeholder="Email"
        class="user_input"
        v-model="email"
      />
      <input
        type="password"
        placeholder="Password"
        class="user_input"
        id="user_input"
        v-model="password"
        @keypress="toggleButton"
        @focusout="hideToggleButton"
      />
      <p v-if="dotToggle" id="toggle" @click="passwordToggle" class="showHide">
        show
      </p>
      <button class="userAction" @click="login">LogIn</button>
      <div class="validation-message-container">
        <!-- email validation -->
        <p id="validation1" class="invalied validation-message">
          <span
            class="material-symbols-outlined validation-icon"
            id="validation1-icon"
          >
            close </span
          >E-mail valied
        </p>

        <!-- password validation -->
        <p id="validation2" class="invalied validation-message">
          <span
            class="material-symbols-outlined validation-icon"
            id="validation2-icon"
          >
            close </span
          >min lenth of password is 8
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
name: "MemberprocessView";

const toast = useToast();

// signin data collectors -----------------------
const dotToggle = ref(false);
const dotToText = ref(false);

// user input validation
const valiedEmail = ref(false);
const valiedPassword = ref(false);

// loging credentials
const email = ref("");
const password = ref("");

// signIn functions -----------------------------
// show text password show functionality
const toggleButton = () => {
  if (password.value.length > 0) {
    dotToggle.value = true;
  }
};

// hide text password show functionality
const hideToggleButton = () => {
  if (password.value.length == 0) {
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
  if (valiedEmail.value === false || valiedPassword.value === false) {
    toast.error("Enter valied input");
  } else {
    axios
      .post(`${import.meta.env.VITE_site}/login`, {
        email: email.value,
        password: password.value,
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
        toast.error("Invalied Email or Password. try again");
      });
  }
};

// email validation watch
watch(email, (newValue, oldValue) => {
  let validatedEmail = String(newValue)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  // if email is valied then,
  if (validatedEmail !== null) {
    // define email as valied email
    valiedEmail.value = true;
    // change color of the text
    document.getElementById("validation1").classList.add("valied");
    document.getElementById("validation1").classList.remove("invalied");
    // change icon
    document.getElementById("validation1-icon").innerHTML = "check";
  }
  // if email is not valied
  else {
    // define email as invalied email
    valiedEmail.value = false;
    // change color of the text
    document.getElementById("validation1").classList.remove("valied");
    document.getElementById("validation1").classList.add("invalied");
    // change icon
    document.getElementById("validation1-icon").innerHTML = "close";
  }
});

// password validation watch
watch(password, (newValue, oldValue) => {
  if (newValue.length >= 8) {
    // define password as valied password
    valiedPassword.value = true;
    // change color of the text
    document.getElementById("validation2").classList.remove("invalied");
    document.getElementById("validation2").classList.add("valied");
    // change icon
    document.getElementById("validation2-icon").innerHTML = "check";
  } else {
    // define password as invalied password
    valiedPassword.value = false;
    // change color of the text
    document.getElementById("validation2").classList.remove("valied");
    document.getElementById("validation2").classList.add("invalied");
    // change icon
    document.getElementById("validation2-icon").innerHTML = "close";
  }
});
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
.validation-message-container {
  padding-top: 20px;
  width: 75%;
  font-weight: 400;
}
.validation-message {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.valied {
  color: green;
}
.invalied {
  color: red;
}
.validation-icon {
  font-size: 18px;
  margin-right: 20px;
  font-weight: 900;
}
</style>

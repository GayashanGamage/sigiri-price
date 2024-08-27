<template>
  <div class="v-level-one-container">
    <MenubarCom></MenubarCom>
    <div class="v-level-two-container">
      <div class="v-level-three-container">
        <div class="v-level-four-container back" @click="goBack">
          <span class="material-symbols-outlined back-icon"> arrow_back </span>
          <p class="back-text">Go back</p>
        </div>
        <!-- option buttons -->
        <div class="v-level-four-container buttons">
          <button
            @click="memberAction('sup')"
            class="option-button signup"
            id="signup"
          >
            SignUp
          </button>
          <button
            @click="memberAction('sin')"
            class="option-button signin selected"
            id="signin"
          >
            SignIn
          </button>
        </div>

        <!-- signin part -->
        <div class="v-level-four-container action" v-if="sin">
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
            v-model="l_password"
          />
          <button class="userAction" @click="login">LogIn</button>
        </div>

        <!-- signup part -->
        <div class="v-level-four-container action" v-if="sup">
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
            v-model="password"
          />
          <!-- <input
            type="password"
            placeholder="Confirm password"
            class="user_input"
          /> -->
          <button class="userAction" @click="register">Register</button>
        </div>
      </div>
    </div>
    <FooterCom></FooterCom>
  </div>
</template>

<script setup>
import FooterCom from "@/components/FooterCom.vue";
import MenubarCom from "@/components/MenubarCom.vue";
import router from "@/router";
import axios from "axios";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
name: "MemberprocessView";

const toast = useToast();

const sin = ref(true);
const sup = ref(false);

// user register details
const email = ref();
const first_name = ref();
const password = ref();

// loging credentials
const l_email = ref();
const l_password = ref();

// change selected button apearence
const memberAction = (val) => {
  if (val === "sup") {
    sin.value = false;
    sup.value = true;
    document.getElementById("signin").classList.remove("selected");
    document.getElementById("signup").classList.add("selected");
  } else {
    sin.value = true;
    sup.value = false;
    document.getElementById("signup").classList.remove("selected");
    document.getElementById("signin").classList.add("selected");
  }
};

const goBack = () => {
  router.replace("/");
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
      router.replace("/profile/setting");
    })
    .catch(function (error) {
      console.log(error);
      toast.error("this is email already use in this application");
    });
};
</script>

<style scoped>
.v-level-two-container {
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
}
.v-level-three-container {
  width: 27vw;
  height: 50vh;
  border-radius: 6px;
}

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
.buttons {
  /* border: 1px solid black; */
  height: 15%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.user_input {
  font-size: 20px;
  width: 70%;
  font-weight: 200;
  outline: none;
  padding: 5px 0px 5px 20px;
  border-radius: 6px;
  border: 1px solid #cec8c8;
}
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
.back {
  /* border: 1px solid black; */
  margin-bottom: 20px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #7fa1c3;
}
.back:hover {
  color: #6482ad;
}
.back-text {
  margin-left: 20px;
}
.option-button {
  background-color: #7fa1c3;
  color: #ffffff;
  font-size: 20px;
  font-weight: 300;
  border: 0px;
}
.option-button:hover {
  background-color: #6482ad;
}
.signin {
  border-radius: 0 6px 0 0;
}
.signup {
  border-radius: 6px 0 0 0;
}
.selected {
  background-color: #6482ad;
  font-weight: 500;
}
</style>

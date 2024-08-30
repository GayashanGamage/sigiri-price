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
        <Signin v-if="sin"></Signin>
        <!-- signup part -->
        <Signup v-if="sup"></Signup>
      </div>
    </div>
    <FooterCom></FooterCom>
  </div>
</template>

<script setup>
import FooterCom from "@/components/Common/FooterCom.vue";
import MenubarCom from "@/components/Common/MenubarCom.vue";
import Signin from "@/components/Memberprocess/Signin.vue";
import Signup from "@/components/Memberprocess/Signup.vue";
import router from "@/router";
import { ref } from "vue";

name: "MemberprocessView";

const sin = ref(true);
const sup = ref(false);

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

// go back funciton
const goBack = () => {
  router.replace("/");
};
</script>

<style scoped>
/* content area without menubar and footer  */
.v-level-two-container {
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
}
/* entire form with back-button */
.v-level-three-container {
  width: 24vw;
  height: 50vh;
  border-radius: 6px;
}

/* signin and signup buttons */
.buttons {
  height: 15%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

/* back button styling */
.back {
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

/* option button styling */
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

<template>
  <div class="v-level-one-container">
    <MenubarCom></MenubarCom>
    <div class="v-level-two-container">
      <div class="v-level-three-container">
        <div class="v-level-four-container back" @click="goBack">
          <span class="material-symbols-outlined back-icon"> arrow_back </span>
          <p class="back-text">Go back</p>
        </div>
        <div class="v-level-four-container buttons">
          <button @click="memberAction">Sinup</button>
          <button @click="memberAction">SinIn</button>
        </div>
        <div class="v-level-four-container action" v-if="memberView">
          <input type="text" placeholder="Email" class="user_input" />
          <input type="password" placeholder="Password" class="user_input" />
          <button class="userAction">LogIn</button>
        </div>
        <div class="v-level-four-container action" v-if="!memberView">
          <input type="text" placeholder="Email" class="user_input" />
          <input type="text" placeholder="First name" class="user_input" />
          <input type="password" placeholder="password" class="user_input" />
          <input
            type="password"
            placeholder="Confirm password"
            class="user_input"
          />
          <button class="userAction">Register</button>
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
import { ref } from "vue";
name: "MemberprocessView";

const memberView = ref(false);

const memberAction = () => {
  memberView.value = !memberView.value;
};

const goBack = () => {
  router.replace("/");
};
</script>

<style scoped>
.v-level-two-container {
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  border: 1px solid black;
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
  padding-left: 20px;
}
.userAction {
  width: 76%;
  height: 30px;
}
.back {
  /* border: 1px solid black; */
  margin-bottom: 20px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.back-text {
  margin-left: 20px;
}
</style>

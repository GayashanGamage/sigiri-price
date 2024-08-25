<template>
  <div class="c-level-one-container">
    <div class="c-level-two-container">
      <h1 class="site-title" @click="homePage">SIGIRI PRICE</h1>
      <div
        class="user common"
        v-if="!availablebutton"
        @click="showMenu"
        ref="userProfileIcon"
      >
        <p class="user-icon">{{ user_name.slice(0, 2) }}</p>
      </div>
      <button class="logout common" @click="memberPage" v-if="availablebutton">
        Member
      </button>
    </div>
    <div class="user-menu" v-if="userMenuTogle" @mouseleave="showMenu">
      <p class="menu-column" @click="directTo('/profile/setting')">Settings</p>
      <p class="menu-column" @click="directTo('/profile/product')">
        Track products
      </p>
      <p @click="logout" class="menu-column">Logout</p>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { onClickOutside } from "@vueuse/core";
import { onBeforeMount, ref } from "vue";
name: "MenubarCom";

// menubar button toggle
const availablebutton = ref(true);
const userMenuTogle = ref(false);
const userProfileIcon = ref(null);
const user_name = ref("Unkonwn");

const memberPage = () => {
  router.push("/member");
};
onBeforeMount(() => {
  let a =
    document.cookie.match("(^|;)\\s*" + "token" + "\\s*=\\s*([^;]+)")?.pop() ||
    "";
  if (a !== "") {
    availablebutton.value = false;
    user_name.value = localStorage.getItem("username");
  } else {
    availablebutton.value = true;
  }
});

// menu toggle functionality
const showMenu = () => {
  userMenuTogle.value = !userMenuTogle.value;
};

// if click outside of user menu it will disapear
onClickOutside(userProfileIcon, (click) => (userMenuTogle.value = false));

// direct to home page
const homePage = () => {
  router.push("/");
};

// logout functionality
const logout = () => {
  let allCookie = document.cookie.split("; ");
  for (let i = 0; i < allCookie.length; i++) {
    if (allCookie[i].startsWith("token=")) {
      document.cookie = allCookie[i] + "; max-age=-100";
    }
  }
  localStorage.removeItem("username");
  router.replace("/");
};

const directTo = (link) => {
  router.push(link);
};
</script>

<style scoped>
.c-level-one-container {
  background-color: #eeeeee;
  margin-top: 0;
  padding-top: 0;
  height: 8vh;
  display: flex;
  flex-direction: row;
}
.c-level-two-container {
  border: 1px solid black;
  width: 100%;
}
.site-title {
  font-family: "League Spartan", sans-serif;
  padding: 10px 40px;
  float: left;
}
.logout {
  width: 100px;
  height: 60%;
  font-size: 20px;
  font-weight: 300;
  margin: 10px 40px;
}
.user {
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 100%;
  margin: 6px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.common {
  float: right;
}
.user-menu {
  position: absolute;
  top: 9vh;
  right: 1%;
  width: 300px;
  height: auto;
  border-radius: 3px;
  box-shadow: 1px 1px 1px 1px#888888;
}
.user-icon {
  font-weight: 800;
  font-size: 24px;
}
.menu-column {
  height: 40px;
  font-size: 20px;
  font-weight: 300;
  margin-left: 30px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.menu-column:hover {
  font-weight: 600;
  cursor: pointer;
}
</style>

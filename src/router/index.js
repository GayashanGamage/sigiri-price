import ProductCom from "@/components/ProductCom.vue";
import SettingCom from "@/components/SettingCom.vue";
import Member from "@/views/Member.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Memberprocess from "@/views/Memberprocess.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
      name: "productview",
    },
    {
      path: "/member",
      component: Memberprocess,
      name: "memberprocess",
    },
    {
      path: "/profile",
      component: Member,
      name: "member",
      // redirect: "profile/setting",
      children: [
        {
          path: "setting",
          component: SettingCom,
          name: "user-setting",
        },
        {
          path: "product",
          component: ProductCom,
          name: "user-product",
        },
      ],
    },
  ],
});

// router guade
router.beforeEach((to, from, next) => {
  // get cookie
  let allCookie = document.cookie.split("; ");
  let selectedCookie = "";
  for (let i = 0; i < allCookie.length; i++) {
    if (allCookie[i].startsWith("token=")) {
      selectedCookie = allCookie[i].slice(6);
    }
  }
  // get username from local storage
  let username = localStorage.getItem("username");
  // evaluate path
  if (
    to.name === "member" ||
    to.name === "user-setting" ||
    to.name === "user-product"
  ) {
    // check whether authonticated or not
    if (selectedCookie === "" || username === null) {
      router.push("/member");
    }
  }
  next();
});

export default router;

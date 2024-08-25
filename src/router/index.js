import ProductCom from "@/components/ProductCom.vue";
import SettingCom from "@/components/SettingCom.vue";
import Member from "@/views/Member.vue";
import MemberprocessView from "@/views/MemberprocessView.vue";
import ProductView from "@/components/ProductView.vue";
import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

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
      component: MemberprocessView,
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
export default router;

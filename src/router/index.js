import Member from "@/views/Member.vue";
import MemberprocessView from "@/views/MemberprocessView.vue";
import ProductView from "@/views/ProductView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: ProductView,
      name: "productview",
    },
    {
      path: "/member",
      component: MemberprocessView,
      name: "memberprocess",
    },
    {
      path: "/m",
      component: Member,
      name: "member",
    },
  ],
});

export default router;

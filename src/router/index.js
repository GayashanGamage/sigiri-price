// import ProductCom from "@/components/ProductCom.vue";
// import SettingCom from "@/components/SettingCom.vue";
// import Member from "@/views/Member.vue";
import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "@/views/HomeView.vue";
// import Memberprocess from "@/views/Memberprocess.vue";
import Homepage from "@/views/Homepage.vue";
import My from "@/views/My.vue";
import Favorites from "@/views/my/favorites.vue";
import Settings from "@/views/my/settings.vue";
import { userStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Homepage,
      name: "productview2",
    },
    {
      path: "/my",
      component: My,
      name: "my",
      redirect : 'my/favorites',
      children : [
        {
          path : 'setting',
          component : Settings,
          name : 'settings'
        },
        {
          path : 'favorites',
          component : Favorites,
          name : 'favorites'
        },
      ]
    },
    // {
    //   path: "/home",
    //   component: HomeView,
    //   name: "productview",
    // },
    // {
    //   path: "/member",
    //   component: Memberprocess,
    //   name: "memberprocess",
    // },
    // {
    //   path: "/profile",
    //   component: Member,
    //   name: "member",
    //   // redirect: "profile/setting",
    //   children: [
    //     {
    //       path: "setting",
    //       component: SettingCom,
    //       name: "user-setting",
    //     },
    //     {
    //       path: "product",
    //       component: ProductCom,
    //       name: "user-product",
    //     },
    //   ],
    // },
  ],
});

router.beforeEach((to, from, next) => {
  if(to.name == 'my' || to.name == 'settings' || to.name == 'favorites' && from.name == 'productview2'){
    const token = userStore().token
    if(token == null){
      const tokenAvailability = userStore().restoreToken()
      if(tokenAvailability == false){
        router.push('/')
      }else if(tokenAvailability == true){
        next()
      }
    }else if(token != null){
      next()
    }
  }
  next()
})


// router guade
// router.beforeEach((to, from, next) => {
//   console.log('executed from store')
//   // get cookie
//   let allCookie = document.cookie.split("; ");
//   let selectedCookie = "";
//   for (let i = 0; i < allCookie.length; i++) {
//     if (allCookie[i].startsWith("token=")) {
//       selectedCookie = allCookie[i].slice(6);
//       console.log(selectedCookie)
//     }
//   }
//   // get username from local storage
//   let username = localStorage.getItem("username");
//   // evaluate path
//   if (
//     to.name === "member" ||
//     to.name === "user-setting" ||
//     to.name === "user-product"
//   ) {
//     // check whether authonticated or not
//     if (selectedCookie === "" || username === null) {
//       router.push("/member");
//     }
//   }
//   next();
// });

export default router;

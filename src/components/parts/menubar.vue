<template>
    <!-- menu bar -->
    <div class="flex flex-col py-4 w-full h-auto xl:px-[0px] px-[20px] z-10 bg-[var(--background-color-one)] shadow-lg">
        <div class="flex flex-row justify-between mx-auto max-w-[1200px] min-w-[300px] w-full">
            <h1 class="text-2xl font-black bg-primary"><router-link to="/">SIGIRI price</router-link></h1>
            <button class="border px-10 py-2 rounded-sm hover:bg-[var(--button-one)] hover:text-white hover:border-[var(--button-one)] hover:cursor-pointer active:bg-[var(--button-two)] active:border-[var(--button-two)]" @click="openPopup" id="membersButton">Members</button>
        </div>
        <Members></Members>
        <Logout></Logout>
    </div>
</template>

<script setup>
import { siteStore } from "@/stores/sitedata";
import Members from "../popups/members.vue";
import router from "@/router";
import { onMounted } from "vue";
import Logout from "../popups/logout.vue";

const sitedata = siteStore()
console.log('reloanch')

// open the popup according to the current page
const openPopup = () => {
    if(router.currentRoute._value.path == '/my/favorites' || router.currentRoute._value.path == '/my/setting'){
       sitedata.logoutPopup = true
    }else{
        sitedata.membersPopup = true
    }
}


// change the name according to the current rendered page
onMounted(() => {
    document.querySelector('#membersButton').textContent = "Logout"
    if(router.currentRoute._value.path == '/my/favorites'){
       document.querySelector('#membersButton').textContent = "Logout"
    }else{
        document.querySelector('#membersButton').textContent = "Members"
    }
})

</script>
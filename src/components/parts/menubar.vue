<template>
    <!-- menu bar -->
    <div class="flex flex-col py-4 w-full h-auto border-b xl:px-[0px] px-[20px] z-10">
        <div class="flex flex-row justify-between mx-auto max-w-[1200px] min-w-[300px] w-full">
            <h1 class="text-2xl font-black bg-primary"><router-link to="/">SIGIRI price</router-link></h1>
            <button class="border px-10 py-2 rounded-sm hover:bg-[var(--button-hover)] hover:text-white hover:border-[var(--button-hover)] hover:cursor-pointer active:bg-[var(--button-activate)] active:border-[var(--button-activate)]" @click="sitedata.membersPopup = true">Members</button>
        </div>
        <Members></Members>
    </div>
</template>

<script setup>
import { siteStore } from "@/stores/sitedata";
import Members from "../popups/members.vue";

const sitedata = siteStore()
</script>
<template>
    <!-- menu bar -->
    <div class="flex flex-col py-4 w-full h-auto border-b xl:px-[0px] px-[20px]">
        <div class="flex flex-row justify-between mx-auto max-w-[1200px] min-w-[300px] w-full">
            <h1 class="text-2xl font-black">SIGIRI Price</h1>
            <button class="border px-10 py-2 rounded-sm hover:bg-black hover:text-white hover:border-black hover:cursor-pointer" @click="sitedata.membersPopup = true">Members</button>
        </div>
    </div>
</template>

<script setup>
import { siteStore } from "@/stores/sitedata";

const sitedata = siteStore()
</script>
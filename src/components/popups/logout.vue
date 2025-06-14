<template>
    <div class="flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] h-full" v-if="sitedata.logoutPopup">
        <!-- enter email window -->
        <div class="flex flex-col h-auto gap-8 bg-white rounded-lg p-5  max-w-[350px] min-w-[200px] w-full">
            <h3 class="font-bold text-2xl text-center">Do you want to logout from SIGIRI price ?</h3>
            <div class="grid grid-cols-2 gap-2">
                <button class="border px-10 py-2 rounded-sm hover:border-[var(--delete-button-hover)] hover:bg-[var(--delete-button-hover)] active:bg-[var(--delete-button-activate)] active:border-[var(--delete-button-activate)] hover:text-white border-[var(--delete-button-hover)] text-[var(--delete-button-hover)]" @click="logout">Yes</button>
                <button class="border px-10 py-2 rounded-sm hover:bg-[var(--button-hover)] hover:text-white hover:border-[var(--button-hover)] hover:cursor-pointer active:bg-[var(--button-activate)] active:border-[var(--button-activate)]" @click="sitedata.logoutPopup = false">No</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { siteStore } from '@/stores/sitedata';
import { userStore } from '@/stores/user';
const userstore = userStore()
const sitedata = siteStore()

const logout = () => {
    userstore.removeToken()
    router.replace({'name' : 'productview2'})
    sitedata.logoutPopup = false
}

</script>
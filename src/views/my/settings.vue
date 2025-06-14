<template>
    <div class="xl:grid xl:grid-cols-2 md:grid md:grid-cols-1 gap-4 w-full">
        <div class="flex flex-col p-4 border-2 border-gray-200 rounded-md gap-4 bg-gray-50 hover:bg-gray-100">
            <h3 class="font-semibold text-xl">Personal Infomation</h3>
            <div class="flex flex-col gap-2">
                <div class="flex flex-row">
                    <p class="text-gray-400 font-normal mr-4">First name : </p>
                    <p class="text-gray-400 font-bold">{{ userstore.personalData.name }}</p>
                </div>
                <div class="flex flex-row overflow-hidden">
                    <p class="text-gray-400 font-normal mr-4">Email </p>
                    <p class="text-gray-400 font-bold">{{ userstore.personalData.email }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="text-gray-400 font-normal mr-4">Account created : </p>
                    <p class="text-gray-400 font-bold">{{ userstore.personalData.created }}</p>
                </div>
            </div>
        </div>
        <div class="sm:grid sm:grid-cols-2 gap-4 grid grid-cols-1 md:mt-0 mt-4">
            <div class="flex flex-col p-4 border-2 border-gray-200 rounded-md gap-4 bg-gray-50 hover:bg-gray-100">
                <h3 class="font-semibold text-xl">Freez notifications</h3>
                <p class="text-gray-400 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium hic minima</p>
                <button class="border-2 font-semibold text-sm py-2 rounded-sm hover:bg-[var(--button-hover)] hover:border-[var(--button-hover)] hover:text-white active:bg-[var(--button-activate)] active:border-[var(--button-activate)] active:text-white" v-if="userstore.personalData.notificationFreez == false" @click="notificationFreez">Freez notifications</button>
                <button class="border-2 font-semibold text-sm py-2 rounded-sm hover:bg-[var(--button-hover)] hover:border-[var(--button-hover)] hover:text-white bg-[var(--button-activate)] border-[var(--button-activate)] text-white" v-if="userstore.personalData.notificationFreez == true" @click="notificationFreez">UnFreez notifications</button>
            </div>
            <div class="flex flex-col p-4 border-2 border-gray-200 rounded-md gap-4 bg-gray-50 hover:bg-gray-100">
                <h3 class="font-semibold text-xl">Change password</h3>
                <p class="text-gray-400 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium hic minima</p>
                <button class="border-2 font-semibold text-sm py-2 rounded-sm hover:bg-[var(--button-hover)] hover:border-[var(--button-hover)] hover:text-white active:bg-[var(--button-activate)] active:border-[var(--button-activate)] active:text-white" @click="changePassword">Change password</button>
            </div>
        </div>
        <Passwordreset></Passwordreset>
    </div>
</template>

<script setup>
import Passwordreset from '@/components/popups/passwordreset.vue';
import router from '@/router';
import { siteStore } from '@/stores/sitedata';
import { userStore } from '@/stores/user';
import { onBeforeMount } from 'vue';

const userstore = userStore()
const sitestore = siteStore()

const notificationFreez = () => {
    userstore.personalData.notificationFreez = !userstore.personalData.notificationFreez
}

const changePassword = () => {
    sitestore.settingPagePasswordReset = true
    sitestore.emailWindow = false
    sitestore.secreateCodeWindow = true
    sitestore.passwordReset = true
}

onBeforeMount(() => {
    console.log('try to execute token protection validation')
    if(userstore.token == null){
        const restore =  userstore.restoreToken()
        console.log(restore)
        if(restore == false){
            console.log('exit from my page one')
            router.push({'name' : 'productview2'})
            return
        }
    }
})

// remove this
const storeProduct = () => {
    // check the price is insert and validation
    // if not show error on console log
    // if not procede bellows
    // check token is available or not
    // if token is available then, send request with token
    // if responce code is 403/ 404 then crean all tokens from pinia store & cookies store
    // show login page
    // if token is not available, then make a API request
    const myPrice = userstore.searchProduct.tracking.myPrice
    console.log(myPrice)
    if(isNaN(myPrice)){
        const tokenAvailability = userstore.restoreToken()
        if(tokenAvailability == true){
            axios.post(`${import.meta.env.VITE_site}/product/track`, productstore.searchProduct, {
                        headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${userstore.token}`
                        }
                    })
                .then((success) => {
                    // console.log('store successfull')
                    searchProductVisibility()
                })
                .catch((error) => {
                    // console.log(error.status)
                    if(error.status == 404){
                        // console.log('unauthorized access')
                        userstore.removeToken()
                        membersPopup()
                    }else if(error.status == 400){
                        // console.log('Product duplication found')
                        searchProductVisibility()
                    }else if(error.status == 500){
                        // console.log('Something went wrong. try again letter')
                    }
                })
        }else if(tokenAvailability == false){
            membersPopup()
        }
    }else{
        // console.log('enter valied price')
    }
    
}

</script>
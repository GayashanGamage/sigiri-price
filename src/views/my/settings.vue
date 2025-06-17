<template>
    <div class="xl:grid xl:grid-cols-2 md:grid md:grid-cols-1 gap-4 w-full">
        <div class="flex flex-col p-4 border-2 border-gray-200 rounded-md gap-4 bg-gray-50 hover:bg-gray-100" v-if="!skeleton">
            <h3 class="font-semibold text-xl">Personal Infomation</h3>
            <div class="flex flex-col gap-2">
                <div class="flex flex-row">
                    <p class="text-gray-400 font-normal mr-4">First name : </p>
                    <p class="text-gray-400 font-bold">{{ userstore.personalData.firstName }}</p>
                </div>
                <div class="flex flex-row overflow-hidden">
                    <p class="text-gray-400 font-normal mr-4">Email </p>
                    <p class="text-gray-400 font-bold">{{ userstore.personalData.email }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="text-gray-400 font-normal mr-4">Account created : </p>
                    <p class="text-gray-400 font-bold">{{ userstore.personalData.createdAt }}</p>
                </div>
            </div>
        </div>
        <!-- skeleton part -->
        <div class="flex flex-col p-4 border-2 border-gray-200 rounded-md gap-4 bg-gray-50 hover:bg-gray-100 animate-pulse" v-if="skeleton">
            <h3 class="font-semibold text-xl">Personal Infomation</h3>
            <div class="flex flex-col gap-2">
                
            </div>
        </div>
        <div class="sm:grid sm:grid-cols-2 gap-4 grid grid-cols-1 md:mt-0 mt-4">
            <!-- actual part for freez notification -->
            <div class="flex flex-col p-4 border-2 border-gray-200 rounded-md gap-4 bg-gray-50 hover:bg-gray-100" v-if="!skeleton">
                <h3 class="font-semibold text-xl">Freez notifications</h3>
                <p class="text-gray-400 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium hic minima</p>
                <button :class="{'border-2 rounded-sm font-semibold text-sm py-2' : userstore.personalData.allEmailNotification == false, 'border-2 rounded-sm font-semibold text-sm py-2 bg-black text-white border-black' : userstore.personalData.allEmailNotification == true }" @click="notificationFreez">{{ userstore.personalData.allEmailNotification == true ? 'Freeze Notification' : 'Unfreeze notification' }}</button>
            </div>
            <!-- skeleton part for freeze notification -->
            <div class="flex flex-col p-4 border-2 border-gray-200 rounded-md gap-4 bg-gray-50 hover:bg-gray-100 animate-pulse" v-if="skeleton">
                <h3 class="font-semibold text-xl">Freez notifications</h3>
                <p class="text-gray-400 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium hic minima</p>
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
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

const userstore = userStore()
const sitestore = siteStore()
const skeleton = ref(true)

const changeNotificationStatus = () => {
    // console.log(!userstore.personalData.allEmailNotification, typeof(userstore.personalData.allEmailNotification))
    axios.patch(`${import.meta.env.VITE_site}/user/setnotificationall`, null, {
        params : {
            'notificationStatus' : userstore.personalData.allEmailNotification
        },
        headers : {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${userstore.token}`
        }
    })
    .then((succuss) => {
        userstore.personalData.allEmailNotification = !userstore.personalData.allEmailNotification
    })
    .catch((error) => {
        console.log(error.status)
    })
}

const notificationFreez = () => {
    // check token in userstore
    // if not available, then try to restore
    // if restore is success then send request
    // if restore is unsuccess, then logout and clearn all data
    if(userstore.token != null){
        changeNotificationStatus()
    }else if(userstore.token == null){
        const restore = userstore.restoreToken()
        if(restore == true){
            changeNotificationStatus()
        }else if(restore == false){
            logout()
        }
    }
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

const logout = () => {
    userstore.removeToken()
    router.push('/')
}

const getUserData = () => {
    axios.get(`${import.meta.env.VITE_site}/user/details`, {
        headers : {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${userstore.token}`
        }
    })
    .then((responce) => {
        userstore.personalData = responce.data.data
        skeleton.value = false
    })
    .catch((error) => {
        console.log(error.status)
    })
}

onBeforeMount(() => {
    if(userstore.token == null){
        tokenStatus = userstore.restoreToken()
        if(tokenStatus == false){
            logout()
        }else if(tokenStatus == true){
            getUserData()
        }
    }else if(userstore.token != null){
        getUserData()
    }
})

</script>
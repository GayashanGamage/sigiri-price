<template>
    <div class="flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] h-full" v-if="sitestore.passwordReset">
        <!-- enter email window -->
        <div class="flex flex-col h-auto bg-white rounded-lg p-5  max-w-[400px] min-w-[200px] w-full" v-if="sitestore.emailWindow">
            
            <!-- heading section -->
            <div class="flex flex-row justify-between items-center mb-6">
                <h3 class="font-bold text-2xl">Enter your email</h3>
                <i class="fi fi-rr-circle-xmark hover:cursor-pointer text-2xl" @click="closeWindow"></i>
            </div>
            <!-- body section -->
            <div class="flex flex-col gap-2">
                <input type="text" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="Email" v-model="userstore.userData.email">
                <button class="border-2  hover:bg-black hover:text-white hover:border-black rounded-sm py-2" @click="sendVerification">Send verification code</button>
            </div>
            <!-- footer section -->
            <div class="flex flex-row gap-4 mt-3 hover:cursor-pointer w-fit" @click="sitestore.membersPopup = true, sitestore.passwordReset = false">
                <i class="fi fi-rr-arrow-left"></i>
                <p class="">Back</p>
            </div>
            <!-- error messages -->
            <div class="flex flex-row justify-between items-center px-2 bg-[rgba(247,55,79,0.8)] border-3 border-[rgba(247,55,79,1)] py-1 text-white rounded-md mt-4" v-if="sitestore.errormessage"> 
                <p class="" id="errorMessege"></p>
                <i class="fi fi-rr-circle-xmark text-xl hover:text-black " @click="sitestore.errormessage = !sitestore.errormessage"></i>
            </div>
        </div>

        <!-- enter secreate code window -->
        <div class="flex flex-col h-auto bg-white rounded-lg p-5  max-w-[400px] min-w-[200px] w-full" v-if="sitestore.secreateCodeWindow">
            <!-- heading section -->
            <div class="flex flex-row justify-between items-center mb-6">
                <div class="flex flex-col">
                    <h3 class="font-bold text-2xl">Enter secreate code</h3>
                    <p class="font-thin text-xs">Check your email inbox and spam box</p>
                </div>
                <i class="fi fi-rr-circle-xmark hover:cursor-pointer text-2xl" @click="closeWindow"></i>
            </div>
            <!-- body section -->
            <div class="flex flex-col gap-2">
                <input type="text" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="0 0 0 0" maxlength="4" v-model="userstore.userData.code"> 
                <button class="border-2  hover:bg-black hover:text-white hover:border-black rounded-sm py-2" @click="verifyCode">Change password</button>
            </div>
            <!-- error messages -->
            <div class="flex flex-row justify-between items-center px-2 bg-[rgba(247,55,79,0.8)] border-3 border-[rgba(247,55,79,1)] py-1 text-white rounded-md mt-4" v-if="sitestore.errormessage"> 
                <p class="" id="errorMessege"></p>
                <i class="fi fi-rr-circle-xmark text-xl hover:text-black " @click="sitestore.errormessage = !sitestore.errormessage"></i>
            </div>
        </div>

        <!-- change password window -->
        <div class="flex flex-col h-auto bg-white rounded-lg p-5  max-w-[400px] min-w-[200px] w-full" v-if="sitestore.passwordChange">
            <!-- heading section -->
            <div class="flex flex-row justify-between items-center mb-6">
                <h3 class="font-bold text-2xl"></h3>
                <i class="fi fi-rr-circle-xmark hover:cursor-pointer text-2xl" @click="closeWindow"></i>
            </div>
            <!-- body section -->
            <div class="flex flex-col gap-2">
                <input type="password" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="new password" v-model="userstore.userData.password"> 
                <input type="password" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="confirm password" v-model="userstore.userData.passwordConfirm"> 
                <button class="border-2  hover:bg-black hover:text-white hover:border-black rounded-sm py-2" @click="confirmPassword">Confirm</button>
            </div>
            <!-- error messages -->
            <div class="flex flex-row justify-between items-center px-2 bg-[rgba(247,55,79,0.8)] border-3 border-[rgba(247,55,79,1)] py-1 text-white rounded-md mt-4" v-if="sitestore.errormessage"> 
                <p class="" id="errorMessege"></p>
                <i class="fi fi-rr-circle-xmark text-xl hover:text-black " @click="sitestore.errormessage = !sitestore.errormessage"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { siteStore } from '@/stores/sitedata';
import { userStore } from '@/stores/user';
import axios from 'axios';
import { onBeforeUnmount, ref } from 'vue';
const sitestore = siteStore()
const userstore =  userStore()

// -------------------------- supporting functions ---------------------------------
// reset password change window ref values
const passwrodChangeRefReset = () => {
    sitestore.emailWindow = true
    sitestore.secreateCodeWindow = false
    sitestore.passwordChange = false
}

const showErrorMessage = (messege) => {
    sitestore.errormessage = true
    setTimeout(() => {
        document.querySelector('#errorMessege').textContent = messege
    }, 100)
}

// close password change windows 
const closeWindow = () => {
    sitestore.passwordReset = false
    sitestore.membersPopup = false
    userstore.userData = null
    passwrodChangeRefReset()
}

// ----------------------- API calls ---------------------------------------
// send code to provided email
const sendVerification = () => {
    // check if there any avalues in email section
    console.log(userstore.userData.email)
    if(userstore.userData.email.length > 0){
        // send API request
        axios.get(`${import.meta.env.VITE_site}/auth/sendverification`, { params : {'email' : userstore.userData.email}})
        .then((success) => {
            sitestore.emailWindow = false
            sitestore.secreateCodeWindow = true
            userstore.userData['code'] = undefined
        })
        .catch((error) => {
            showErrorMessage('Invalied email address ')
            userstore.userData['email'] = ''
        })
    }else{
        showErrorMessage('Enter email address ')
    }
}

// verify the code that send thrue email
const verifyCode = () => {
    // validate data type of the input
    if(!isNaN(userstore.userData.code)){
        console.log(typeof(parseInt(userstore.userData.code)), userstore.userData.email)
        axios.post(`${import.meta.env.VITE_site}/auth/emailVerification`, {
            email : userstore.userData.email,
            code : parseInt(userstore.userData.code)
        })
        .then((success) => {
            userstore.userData['password'] = ""
            userstore.userData['passwordConfirm'] = ""
            delete userstore.userData['code']

            sitestore.secreateCodeWindow = false
            sitestore.passwordChange = true
            sitestore.errormessage = false
            sitestore.errormessage = false
            
        })
        .catch((error) => {
            showErrorMessage("Incorrect code ")
        })
    }else{
        showErrorMessage("Enter valied code - only numbers ")
    }
}

// change password
const confirmPassword = () => {
    if(sitestore.settingPagePasswordReset == false){
        // check the password match or not
        if(userstore.userData.password != userstore.userData.passwordConfirm){
            showErrorMessage("passwords not match")
        }else if(userstore.userData.password.length <= 6){
            showErrorMessage("Enter more than 6 charactors")
        }else{
            axios.patch(`${import.meta.env.VITE_site}/auth/passwordChange`, {
                email : userstore.userData.email,
                password : userstore.userData.password
            })
            .then((success) => {
                closeWindow()
                userstore.userData = {
                    'email' : '',
                    'password' : ''
                }
                sitestore.passwordReset = false
                sitestore.membersPopup = true
            })
            .catch((error) => {
                showErrorMessage("something went wrong. try again latter ")
            })
        }
    }else if(sitestore.settingPagePasswordReset == true){
        // this is for close password reset window in setting page-close action
    }
}

</script>
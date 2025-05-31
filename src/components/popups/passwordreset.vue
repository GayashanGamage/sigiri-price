<template>
    <div class="flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] h-full" v-if="sitestore.passwordReset">
        <!-- enter email window -->
        <div class="flex flex-col h-auto bg-white rounded-lg p-5  max-w-[400px] min-w-[200px] w-full" v-if="emailWindow">
            
            <!-- heading section -->
            <div class="flex flex-row justify-between items-center mb-6">
                <h3 class="font-bold text-2xl">Enter your email</h3>
                <i class="fi fi-rr-circle-xmark hover:cursor-pointer text-2xl" @click="closeWindow"></i>
            </div>
            <!-- body section -->
            <div class="flex flex-col gap-2">
                <input type="text" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="Email">
                <button class="border-2  hover:bg-black hover:text-white hover:border-black rounded-sm py-2" @click="sendVerification">Send verification code</button>
            </div>
            <!-- footer section -->
            <div class="flex flex-row gap-4 mt-3 hover:cursor-pointer w-fit" @click="sitestore.membersPopup = true, sitestore.passwordReset = false">
                <i class="fi fi-rr-arrow-left"></i>
                <p class="">Back</p>
            </div>
            <!-- error messages -->
            <div class="flex flex-row justify-between items-center px-2 bg-[rgba(247,55,79,0.8)] border-3 border-[rgba(247,55,79,1)] py-1 text-white rounded-md mt-4" v-if="errormessage"> 
                <p class="">Credencials are not match</p>
                <i class="fi fi-rr-circle-xmark text-xl hover:text-black " @click="errormessage = !errormessage"></i>
            </div>
        </div>

        <!-- enter secreate code window -->
        <div class="flex flex-col h-auto bg-white rounded-lg p-5  max-w-[400px] min-w-[200px] w-full" v-if="secreateCodeWindow">
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
                <input type="text" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="0 0 0 0" maxlength="4"> 
                <button class="border-2  hover:bg-black hover:text-white hover:border-black rounded-sm py-2" @click="verifyCode">Change password</button>
            </div>
            <!-- error messages -->
            <div class="flex flex-row justify-between items-center px-2 bg-[rgba(247,55,79,0.8)] border-3 border-[rgba(247,55,79,1)] py-1 text-white rounded-md mt-4" v-if="errormessage"> 
                <p class="">Credencials are not match</p>
                <i class="fi fi-rr-circle-xmark text-xl hover:text-black " @click="errormessage = !errormessage"></i>
            </div>
        </div>

        <!-- change password window -->
        <div class="flex flex-col h-auto bg-white rounded-lg p-5  max-w-[400px] min-w-[200px] w-full" v-if="passwordChange">
            <!-- heading section -->
            <div class="flex flex-row justify-between items-center mb-6">
                <h3 class="font-bold text-2xl">Change your password</h3>
                <i class="fi fi-rr-circle-xmark hover:cursor-pointer text-2xl" @click="closeWindow"></i>
            </div>
            <!-- body section -->
            <div class="flex flex-col gap-2">
                <input type="password" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="new password"> 
                <input type="password" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="confirm password"> 
                <button class="border-2  hover:bg-black hover:text-white hover:border-black rounded-sm py-2" @click="confirmPassword">Confirm</button>
            </div>
            <!-- error messages -->
            <div class="flex flex-row justify-between items-center px-2 bg-[rgba(247,55,79,0.8)] border-3 border-[rgba(247,55,79,1)] py-1 text-white rounded-md mt-4" v-if="errormessage"> 
                <p class="">Credencials are not match</p>
                <i class="fi fi-rr-circle-xmark text-xl hover:text-black " @click="errormessage = !errormessage"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { siteStore } from '@/stores/sitedata';
import { ref } from 'vue';
const sitestore = siteStore()

const emailWindow = ref(true)
const secreateCodeWindow = ref(false)
const passwordChange = ref(false)
const errormessage = ref(true)

// reset password change window ref values
const passwrodChangeRefReset = () => {
    emailWindow.value = true
    secreateCodeWindow.value = false
    passwordChange.value = false
}

// all email validations hear
const sendVerification = () => {
    emailWindow.value = false
    secreateCodeWindow.value = true
    errormessage.value = false
}

// all verification code validation here
const verifyCode = () => {
    secreateCodeWindow.value = false
    passwordChange.value = true
    errormessage.value = false
}

// all password confirmation validation hear
const confirmPassword = () => {
    sitestore.passwordReset = false
    sitestore.membersPopup = true
    errormessage.value = false
    passwrodChangeRefReset()
}

// close password change windows 
const closeWindow = () => {
    sitestore.passwordReset = false
    sitestore.membersPopup = false
    passwrodChangeRefReset()
}

</script>
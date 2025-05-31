<template>
    <div class="flex flex-col justify-center items-center fixed border top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] h-full"  v-if="sitestore.membersPopup">
        <!-- members form -->
        <div class="flex flex-col w-auto h-auto bg-white rounded-lg p-5" ref="membersWindow">
            <!-- form heading ( signin / signup) -->
            <div class="grid grid-cols-2 gap-1 pb-10">
                <button class="border-2 border-black px-12 py-2 rounded-sm bg-black text-white" @click="membersToggle('singin')" id="signinButton">SingIn</button>
                <button class="border-2 border-gray-300 px-12 py-2 rounded-sm text-black bg-white" @click="membersToggle('signup')" id="signupButton">SingUp</button>
            </div>
            <!-- form content -->
            <div class="h-auto">
                <!-- signIn content -->
                <div class="flex flex-col gap-2" v-if="sitestore.signintoggle">
                    <input type="text" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="Email">
                    <input type="password" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="password">
                    <button class="border-2  hover:bg-black hover:text-white hover:border-black rounded-sm py-2">Login</button>
                    <p class="text-xs self-end hover:underline hover:cursor-pointer" @click="sitestore.membersPopup = false, sitestore.passwordReset = true">Foget password ?</p>
                    <!-- error messages -->
                    <div class="flex flex-row justify-between items-center px-2 bg-[rgba(247,55,79,0.8)] border-3 border-[rgba(247,55,79,1)] py-1 text-white rounded-md mt-4" v-if="errormessage"> 
                        <p class="">Credencials are not match</p>
                        <i class="fi fi-rr-circle-xmark text-xl hover:text-black " @click="errormessage = !errormessage"></i>
                    </div>
                </div>
                <!-- signUp content -->
                <div class="flex flex-col gap-2" v-if="!sitestore.signintoggle">
                    <input type="text" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="First name">
                    <input type="text" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="Email">
                    <input type="password" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="Password">
                    <input type="password" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="Confirm password">
                    <button class="border hover:bg-black hover:text-white hover:border-black rounded-sm py-2">Register</button>
                    <!-- error messages -->
                    <div class="flex flex-row justify-between items-center px-2 bg-[rgba(247,55,79,0.8)] border-3 border-[rgba(247,55,79,1)] py-1 text-white rounded-md mt-4" v-if="errormessage"> 
                        <p class="">Credencials are not match</p>
                        <i class="fi fi-rr-circle-xmark text-xl hover:text-black " @click="errormessage = !errormessage"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { siteStore } from '@/stores/sitedata';
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

const sitestore = siteStore()

// const signintoggle = ref(true) // true menan signin
const errormessage = ref(true)

const membersWindow = ref(null) //reffer to members content window for click-outside-close

// close the members window when click the outside of the members shadow area
onClickOutside(membersWindow, () => {
    sitestore.signintoggle = true
    sitestore.membersPopup = false
})

// toggle betwen signin and singup
const membersToggle = (action) => {
    const signinButton = document.querySelector('#signinButton')
    const signupButton = document.querySelector('#signupButton')

    if(action === 'singin'){
        sitestore.signintoggle = true
        // signin button styles
        signinButton.classList.replace('text-black', 'text-white')
        signinButton.classList.replace('bg-white', 'bg-black')
        signinButton.classList.replace('border-gray-300', 'border-black')
        // signup button styles
        signupButton.classList.replace( 'text-white','text-black')
        signupButton.classList.replace( 'bg-black','bg-white')
        signupButton.classList.replace( 'border-black','border-gray-300')
    }else if(action === 'signup'){
        sitestore.signintoggle = false
        // signin button styles
        signinButton.classList.replace('text-white', 'text-black')
        signinButton.classList.replace('bg-black', 'bg-white')
        signinButton.classList.replace('border-black', 'border-gray-300')
        // signup button styles
        signupButton.classList.replace( 'text-black','text-white')
        signupButton.classList.replace( 'bg-white','bg-black')
        signupButton.classList.replace('border-gray-300', 'border-black')
    }
    // when toggle between signin and signup close message close automatically
    // errormessage.value = false
}

</script>
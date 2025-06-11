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
                    <input type="text" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="Email" v-model="userstore.userData.email">
                    <input type="password" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="password" v-model="userstore.userData.password">
                    <button class="border-2  hover:bg-black hover:text-white hover:border-black rounded-sm py-2" @click="login">Login</button>
                    <p class="text-xs self-end hover:underline hover:cursor-pointer" @click="passwordResetProcess">Foget password ?</p>
                    <!-- error messages -->
                    <div class="flex flex-row justify-between items-center px-2 bg-[rgba(247,55,79,0.8)] border-3 border-[rgba(247,55,79,1)] py-1 text-white rounded-md mt-4" v-if="errormessage"> 
                        <p class="" id="errorText"></p>
                        <i class="fi fi-rr-circle-xmark text-xl hover:text-black " @click="errormessage = !errormessage"></i>
                    </div>
                </div>
                <!-- signUp content -->
                <div class="flex flex-col gap-2" v-if="!sitestore.signintoggle">
                    <input type="text" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="First name" v-model="userstore.userData.name">
                    <input type="text" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="Email" v-model="userstore.userData.email">
                    <input type="password" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="Password" v-model="userstore.userData.password">
                    <input type="password" class="border-2 border-gray-300 focus:outline-none px-4 py-1 rounded-sm" placeholder="Confirm password" v-model="userstore.userData.passwordTwo">
                    <button class="border hover:bg-black hover:text-white hover:border-black rounded-sm py-2" @click="registerUser">Register</button>
                    <!-- error messages -->
                    <div class="flex flex-row justify-between items-center px-2 bg-[rgba(247,55,79,0.8)] border-3 border-[rgba(247,55,79,1)] py-1 text-white rounded-md mt-4" v-if="errormessage"> 
                        <p class="max-w-[240px]" id="errorText"></p>
                        <i class="fi fi-rr-circle-xmark text-xl hover:text-black " @click="errormessage = !errormessage"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import router from '@/router';
import { siteStore } from '@/stores/sitedata';
import { userStore } from '@/stores/user';
import { onClickOutside } from '@vueuse/core';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';


const sitestore = siteStore()
const userstore = userStore()

// const signintoggle = ref(true) // true menan signin
const errormessage = ref(false)
const membersWindow = ref(null) //reffer to members content window for click-outside-close

// close the members window when click the outside of the members shadow area
onClickOutside(membersWindow, () => {
    sitestore.signintoggle = true
    sitestore.membersPopup = false
    resetUserData()
})

const showErrorMessage = (errorText) => {
    errormessage.value = true
    setTimeout(() => {
        document.querySelector('#errorText').innerHTML = errorText
    }, 100)
}

const resetUserData = () => {
    userstore.userData = null
}

const login = () => {
    // call API endpoint
    axios.post(`${import.meta.env.VITE_site}/auth/login`, userstore.userData)
        .then(function(response){
            sitestore.membersPopup = false
            router.push({name : 'my'})
        })
        .catch(function(error){
            if(error.status == 404){
                // show error code
                showErrorMessage("invalied credentials!")
            }
        })
}

const initiateNewUserData = () => {
    userstore.userData = {
            "email": "",
            "password": "",
            "passwordTwo": "",
            "firstName": ""
            }
}

const initiateLoginData = () => {
    userstore.userData = {
        'email' : "",
        'password' : ""
    }
}


// toggle betwen signin and singup
const membersToggle = (action) => {
    const signinButton = document.querySelector('#signinButton')
    const signupButton = document.querySelector('#signupButton')

    if(action === 'singin'){
        initiateLoginData()
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
        initiateNewUserData() //this is for create new user's data blueprint

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

const registerUser = () => {
    // validate passwords are same
    if(userstore.userData.password != userstore.userData.passwordTwo){
        showErrorMessage("Passwords are not match")
        return
    }else if(userstore.userData.password.length < 6){
        showErrorMessage("Minimum length of the password is 6")
        return
    }else{
        // call to api
        const userDataCopy = { ...userstore.userData} //create shallow coppy of the userData
        delete userDataCopy.passwordTwo //remove coppy of the password 
        axios.post(`${import.meta.env.VITE_site}/auth/create-user`, userstore.userData)
            .then(function(response){
                sitestore.signintoggle = true //change in to loging screan
                initiateNewUserData() //reset new user data
            })
            .catch(function(error){
                if(error.status !== 200){
                    initiateNewUserData()
                    showErrorMessage("try again latter ! ")
                }
            })
    }
}

const passwordResetProcess = () => {
    sitestore.membersPopup = false, sitestore.passwordReset = true
    sitestore.emailWindow = true
    userstore.userData = {
        "email" : ''
    }
}

</script>
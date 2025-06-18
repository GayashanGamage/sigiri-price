<template>
    <div class="w-full h-screen">
        <Menubar></Menubar>
        <div class="flex flex-col w-full xl:px-[0px] px-[20px] py-6 min-h-[calc(100vh-110px)]">
            <div class="flex flex-col gap-[40px] justify-center mx-auto max-w-[1200px] min-w-[300px] w-full">
                <!-- toggle menu -->
                <div class="flex flex-row gap-2 border-b px-2 pt-2">
                    <button class="border xl:px-10 xl:py-2 md:px-5 md:py-1 px-4 py-1 rounded-t-md hover:bg-[var(--button-hover)] hover:text-white hover:border-[var(--button-hover)] hover:cursor-pointer text-white bg-black border-black" @click="myToggle('setting')" id="favorites">Loved products</button>
                    <button class="border xl:px-10 xl:py-2 md:px-5 md:py-1 px-4 py-1 rounded-t-md hover:bg-[var(--button-hover)] hover:text-white hover:border-[var(--button-hover)] hover:cursor-pointer text-black bg-white border-black" @click="myToggle('favorit')" id="setting">Settings</button>
                </div>
                <!-- toggle content -->
                <div class="">
                    <!-- dynamically add favorites & setting view in hear thatnks to vue-routes -->
                    <router-view>
                    </router-view>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '@/components/parts/footer.vue';
import Menubar from '@/components/parts/menubar.vue';
import router from '@/router';
import { siteStore } from '@/stores/sitedata';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const sitedata = siteStore()

// toggle betwen signin and singup
const myToggle = (toggleTo) => {
    const signinButton = document.querySelector('#favorites')
    const signupButton = document.querySelector('#setting')

    if(toggleTo === 'setting'){
        router.push({'name' : 'favorites'})
        // sitestore.signintoggle = true
        // signin button styles
        signinButton.classList.replace('text-black', 'text-white')
        signinButton.classList.replace('bg-white', 'bg-black')
        signinButton.classList.replace('border-gray-300', 'border-black')
        // signup button styles
        signupButton.classList.replace( 'text-white','text-black')
        signupButton.classList.replace( 'bg-black','bg-white')
        signupButton.classList.replace( 'border-black','border-gray-300')
    }else if(toggleTo === 'favorit'){
        router.push({'name' : 'settings'})
        // sitestore.signintoggle = false
        // signin button styles
        signinButton.classList.replace('text-white', 'text-black')
        signinButton.classList.replace('bg-black', 'bg-white')
        signinButton.classList.replace('border-black', 'border-gray-300')
        // signup button styles
        signupButton.classList.replace( 'text-black','text-white')
        signupButton.classList.replace( 'bg-white','bg-black')
        signupButton.classList.replace('border-gray-300', 'border-black')
    }
}

onMounted(() => {
    const currentRoute = useRoute().name
    if(currentRoute == 'favorites'){
        myToggle('setting')
    }else if(currentRoute == 'settings'){
        myToggle('favorit')
    }
})

</script>
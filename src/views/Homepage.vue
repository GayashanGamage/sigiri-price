<template>
    <div class="w-full h-screen relative bg-[var(--background-color-one)]">
        <Menubar></Menubar>
        <!-- Introduction part -->
        <div class="flex flex-col w-full xl:px-[0px] px-[20px]">
            <div class="flex flex-col gap-[40px] justify-center mx-auto max-w-[1200px] min-w-[300px] w-full">
                <div class="flex flex-col gap-[80px] max-h-[1000px] min-h-[calc(100vh-70px)] justify-center">
                    <h1 class="font-black xl:text-6xl sm:text-5xl text-4xl text-center text-shadow-sm">Allert on price<br>of your<br>next loved product</h1>
                    <!-- <p class="text-center md:w-[50%] w-[90%] mx-auto xl:text-2xl md:text-xl text-lg font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero nostrum totam impedit quam nulla temporibus numquam earum consequatur porro repellat.</p> -->
                    <p class="text-center md:w-[50%] w-[90%] mx-auto xl:text-2xl md:text-xl text-lg font-light">Are you tired on finding  cheep price for your loved product on online shopping ? we automate this process for you. once the tracking product match your price you will get notification.</p>
                    <!-- action button list -->
                    <div class="grid md:grid-cols-3 grid-cols-2 gap-2 mx-auto">
                        <button class="border px-8 py-2 rounded-sm max-w-[200px] min-w-[100px] w-full hover:bg-[var(--button-one)] hover:text-white hover:border-[var(--button-one)] active:bg-[var(--button-two)] active:border-[var(--button-two)] hover:cursor-pointer" @click="directto('howthiswork')">How this work</button>
                        <button class="border px-8 py-2 rounded-sm max-w-[200px] min-w-[100px] w-full hover:bg-[var(--button-one)] hover:text-white hover:border-[var(--button-one)] hover:cursor-pointer active:bg-[var(--button-two)] active:border-[var(--button-two)]" @click="directto('qanda')">Q and A</button>
                        <button class="border px-8 py-2 rounded-sm w-full hover:cursor-pointer md:col-span-1 col-span-2 bg-[var(--button-one)] text-white border-[var(--button-one)] hover:bg-[var(--button-two)] active:bg-[var(--button-three)]" @click="directto('productview')">track product</button>
                    </div>
                </div>
                <!-- How this work section -->
                <div class="flex flex-col gap-10 py-10" id="howthiswork">
                    <subheading>How this works ?</subheading>
                    <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-6">
                        <div class="flex flex-col gap-4 text-center border-1 border-[var(--background-color-two)] bg-[var(--background-color-zero)] p-6 rounded-md hover:bg-[var(--background-color-one)] hover:border-gray-200" v-for="(item, index) in siteData.howThisWork">
                            <div class="flex flex-row gap-4 justify-center items-center">
                                <h4 class="font-black uppercase text-3xl"><i :class="item.step"></i></h4>
                                <h4 class="font-bold uppercase text-lg"> Step</h4>
                            </div>
                            <p class="text-md font-normal">{{ item.description }}</p>
                        </div>
                    </div>
                </div>  
                <!-- Q&A section -->
                <div class="flex flex-col gap-10 py-10" id="qanda">
                    <subheading>Questions and Answares</subheading>
                    <div class="">
                        <div class="border-b border-b-gray-300 py-3" v-for="(item, index) in siteData.qanda" :id="'qanda' + index">
                            <!-- question -->
                            <div class="flex flex-row justify-between items-center md:px-10 px-2 font-medium cursor-pointer" @click="qandafunction(index)">
                                <p class="text-xl">{{ item.q }}</p>
                                <span class="text-2xl block" :id="'hidden' + index">+</span>
                                <span class="text-2xl hidden" :id="'show' + index">-</span>
                            </div>
                            <!-- answare -->
                            <p class="md:mx-10 mx-2 p-4 rounded-sm font-normal hidden bg-[var(--background-color-one)] text-lg" :id="'answare' + index">{{ item.a }}</p>
                        </div>
                    </div>
                </div>
                <!-- product view component -->
                <div class="flex flex-col gap-10 pt-10 pb-30" id="productview">
                    <subheading>Seach product</subheading>
                    <!-- search box -->
                    <div class="flex sm:flex-row flex-col gap-4 mx-auto w-full justify-center">
                        <input type="text" class="border-2 border-neutral-300 rounded-sm h-10 focus:outline-none px-2 sm:max-w-[455px] max-w-[580px] min-w-[300px] w-full" placeholder="Product URL">
                        <button class="border px-10 py-2 rounded-sm hover:bg-[var(--button-one)] hover:text-white hover:border-[var(--button-one)] active:bg-[var(--button-two)] active:border-[var(--button-two)] hover:cursor-pointer">Search</button>
                    </div>
                    <!-- product view -->
                    <div class="flex sm:flex-row flex-col gap-10 max-w-[600px] min-w-[300px] w-full mx-auto border-3 p-4 rounded-sm border-neutral-200 shadow-lg bg-gray-50 relative">
                        <div class="sm:w-[50%] w-[100%] min-h-[290px] rounded-sm bg-white"></div>
                        <div class="flex flex-col gap-4 sm:w-[50%] w-full">
                            <h3 class="text-2xl font-medium">Title of the product</h3>
                            <p class="">
                                <span class="bg-emerald-500 px-4 py-1 text-white rounded-full">Available</span>
                                <span class="bg-orange-700 px-4 py-1 text-white rounded-full hidden">Not Avaialable</span>
                            </p>
                            <p class="">Code : 00X34</p>
                            <p class="">Price : Rs. <span class="font-semibold text-2xl">8000</span>.00</p>
                            <div class="flex flex-col gap-2 p-2 rounded-sm bg-white w-full border-3 border-neutral-200">
                                <div class="grid grid-cols-2 items-center gap-2">
                                    <label for="offer">My Offer Rs.</label>
                                    <input type="text" id="offer" name="offer" class="border-3 border-neutral-300 rounded-sm h-10 focus:outline-none px-2"  placeholder="3500">
                                </div>
                                <button class="border-2 border-neutral-300 px-10 py-2 rounded-sm hover:bg-black hover:text-white hover:border-black hover:cursor-pointer w-full">Track me</button>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center w-full h-full border-1 absolute top-0 left-0 right-0 bottom-0 bg-white-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-gray-100">
                            <p class="bg-black text-white px-10 py-2 rounded-full">No Product</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <Passwordreset></Passwordreset>
    </div>
</template>

<script setup>
import Footer from "@/components/parts/footer.vue";
import Menubar from "@/components/parts/menubar.vue";
import subheading from "@/components/parts/subheading.vue"
import Passwordreset from "@/components/popups/passwordreset.vue";
import { siteStore } from "@/stores/sitedata";
import { ref } from "vue";

const siteData = siteStore()

const showQandA = ref([]) //unfolded questions index number list

const qandafunction = (qandaindex) => {
    const a = showQandA.value.includes(qandaindex)
    
    if(a === true){ // open the answare
        document.querySelector(`#answare${qandaindex}`).classList.replace('block', 'hidden') //answare
        document.querySelector(`#hidden${qandaindex}`).classList.replace('hidden', 'block') // +icon
        document.querySelector(`#show${qandaindex}`).classList.replace('block', 'hidden')// -icon
        showQandA.value.pop()
        
    }else if(a !== true){ // close the answare
        document.querySelector(`#answare${qandaindex}`).classList.replace('hidden', 'block') //answare
        document.querySelector(`#hidden${qandaindex}`).classList.replace('block', 'hidden') // + icon
        document.querySelector(`#show${qandaindex}`).classList.replace('hidden', 'block') // - icon 
        showQandA.value.push(qandaindex)
    }
}

// home page internal link building
const directto = (locationId) => {
    window.location.href = `#${locationId}`
}

</script>
<template>
    <div class="w-full h-screen">
        <!-- menu bar -->
        <div class="flex flex-col py-4 w-full h-auto border-b xl:px-[0px] px-[20px]">
            <div class="flex flex-row justify-between mx-auto max-w-[1200px] min-w-[300px] w-full">
                <h1 class="text-2xl font-black">SIGIRI Price</h1>
                <button class="border px-10 py-2 rounded-sm hover:bg-black hover:text-white hover:border-black hover:cursor-pointer">Members</button>
            </div>
        </div>
        <!-- Introduction part -->
        <div class="flex flex-col w-full xl:px-[0px] px-[20px]">
            <div class="flex flex-col gap-[40px] justify-center mx-auto max-w-[1200px] min-w-[300px] w-full">
                <div class="flex flex-col gap-[80px] max-h-[1000px] min-h-[calc(100vh-70px)] justify-center">
                    <h1 class="font-black xl:text-6xl sm:text-5xl text-4xl text-center">Allert on price<br>of your<br>next loved product</h1>
                    <p class="text-center md:w-[50%] w-[90%] mx-auto xl:text-2xl md:text-xl text-lg font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero nostrum totam impedit quam nulla temporibus numquam earum consequatur porro repellat.</p>
                    <!-- action button list -->
                    <div class="grid md:grid-cols-3 grid-cols-2 gap-6 mx-auto">
                        <button class="border px-8 py-2 rounded-sm max-w-[200px] min-w-[100px] w-full hover:bg-black hover:text-white hover:border-black hover:cursor-pointer" @click="directto('howthiswork')">How this work</button>
                        <button class="border px-8 py-2 rounded-sm max-w-[200px] min-w-[100px] w-full hover:bg-black hover:text-white hover:border-black hover:cursor-pointer" @click="directto('qanda')">Q and A</button>
                        <button class="border px-8 py-2 rounded-sm w-full hover:bg-black hover:text-white hover:border-black hover:cursor-pointer md:col-span-1 col-span-2" @click="directto('productview')">track product</button>
                    </div>
                </div>
                <!-- How this work section -->
                <div class="flex flex-col gap-10 py-10" id="howthiswork">
                    <subheading>How this works ?</subheading>
                    <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        <div class="flex flex-col gap-4 text-center border-2 border-gray-300 p-6 rounded-md hover:bg-gray-200 hover:border-gray-200 hover:shadow-lg hover:shadow-neutral-100" v-for="(item, index) in siteData.howThisWork">
                            <div class="flex flex-row gap-4 justify-center items-center">
                                <h4 class="font-black uppercase text-3xl"><i :class="item.step"></i></h4>
                                <h4 class="font-bold uppercase text-lg"> Step</h4>
                            </div>
                            <p class="text-lg font-medium">{{ item.description }}</p>
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
                            <p class="md:mx-10 mx-2 p-4 rounded-sm font-light hidden bg-gray-100 text-lg" :id="'answare' + index">{{ item.a }}</p>
                        </div>
                    </div>
                </div>
                <!-- product view component -->
                <div class="flex flex-col gap-10 pt-10 pb-30" id="productview">
                    <subheading>Seach product</subheading>
                    <!-- search box -->
                    <div class="flex sm:flex-row flex-col gap-4 mx-auto w-full justify-center">
                        <input type="text" class="border-2 border-neutral-300 rounded-sm h-10 focus:outline-none px-2 sm:max-w-[455px] max-w-[580px] min-w-[300px] w-full" placeholder="Product URL">
                        <button class="border px-10 py-2 rounded-sm hover:bg-black hover:text-white hover:border-black hover:cursor-pointer">Search</button>
                    </div>
                    <!-- product view -->
                    <div class="flex sm:flex-row flex-col gap-10 max-w-[600px] min-w-[300px] w-full mx-auto border-3 p-4 rounded-sm border-neutral-200 shadow-lg bg-gray-50">
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
                    </div>
                </div>
            </div>
        </div>
        <!-- footer section -->
        <div class="flex flex-col py-2 w-full h-auto border-t xl:px-[0px] px-[20px]">
            <div class="flex flex-row justify-center mx-auto max-w-[1200px] min-w-[300px] w-full">
                <p class="font-light font-mono">Develop by <span class="font-black text-gray-400"><a href="https://gamage.dev" target="_blank">Gamage.dev</a></span></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import subheading from "@/components/parts/subheading.vue"
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
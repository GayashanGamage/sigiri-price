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
                        <input type="text" class="border-2 border-neutral-300 rounded-sm h-10 focus:outline-none px-2 sm:max-w-[455px] max-w-[580px] min-w-[300px] w-full" placeholder="Product URL" v-model="productstore.productURL">
                        <button class="border px-10 py-2 rounded-sm hover:bg-[var(--button-one)] hover:text-white hover:border-[var(--button-one)] active:bg-[var(--button-two)] active:border-[var(--button-two)] hover:cursor-pointer" @click="getProduct">Search</button>
                        <!-- <button class="border px-10 py-2 rounded-sm hover:bg-[var(--button-one)] hover:text-white hover:border-[var(--button-one)] active:bg-[var(--button-two)] active:border-[var(--button-two)] hover:cursor-pointer" @click="getProductFake">Search</button> -->
                    </div>
                    <!-- product view -->
                    <div class="flex sm:flex-row flex-col gap-10 max-w-[600px] min-w-[300px] w-full mx-auto border-3 p-4 rounded-sm border-neutral-200 shadow-lg bg-gray-50 relative">
                        <img class="sm:w-[50%] w-[100%] min-h-[290px] rounded-sm bg-white object-contain" :src="productstore.searchProduct.product.img" v-if="productstore.searchProduct"></img>
                        <div class="sm:w-[50%] w-[100%] min-h-[290px] rounded-sm bg-white" v-if="!productstore.searchProduct"></div>
                        <div class="flex flex-col gap-4 sm:w-[50%] w-full">
                            <h3 class="text-2xl font-medium">{{ productstore.searchProduct ? productstore.searchProduct.product.title : 'Product title' }}</h3>
                            <p class="" v-if="!errorShadow">
                                <span class="bg-emerald-500 px-4 py-1 text-white rounded-full" v-if="productstore.searchProduct.product.availability == true">Available</span>
                                <span class="bg-orange-700 px-4 py-1 text-white rounded-full"  v-if="productstore.searchProduct.product.availability != true">Not Avaialable</span>
                            </p>
                            <p class="">Code : {{ productstore.searchProduct ? productstore.searchProduct.product.code : '000xxx' }}</p>
                            <p class="">Price : <span class="font-semibold text-2xl">{{ productstore.searchProduct ? productstore.searchProduct.product.price : 'Rs. 00.00' }}</span></p>
                            <div class="flex flex-col gap-2 p-2 rounded-sm bg-white w-full border-3 border-neutral-200">
                                <div class="grid grid-cols-2 items-center gap-2">
                                    <label for="offer">My Offer Rs.</label>
                                    <input type="text" id="offer" name="offer" class="border-3 border-neutral-300 rounded-sm h-10 focus:outline-none px-2"  placeholder="3500" v-if="!errorShadow" v-model.number="productstore.searchProduct.tracking.myPrice">
                                </div>
                                <button class="border-2 border-neutral-300 px-10 py-2 rounded-sm hover:bg-black hover:text-white hover:border-black hover:cursor-pointer w-full" @click="trackProcut">Track me</button>
                            </div>
                        </div>
                        <!-- error message -->
                        <div class="flex flex-col justify-center items-center w-full h-full border-1 absolute top-0 left-0 right-0 bottom-0 bg-white-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-gray-100" v-if="errorShadow">
                            <p class="bg-black text-white px-10 py-2 rounded-full" id="errorMessage">No Product</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <Passwordreset></Passwordreset>
        <NotificationMessage></NotificationMessage>
    </div>
</template>

<script setup>
import Footer from "@/components/parts/footer.vue";
import Menubar from "@/components/parts/menubar.vue";
import NotificationMessage from "@/components/parts/notificationMessage.vue";
import subheading from "@/components/parts/subheading.vue"
import Passwordreset from "@/components/popups/passwordreset.vue";
import { productStore } from "@/stores/product";
const productstore = productStore()
import { siteStore } from "@/stores/sitedata";
import { userStore } from "@/stores/user";
import axios from "axios";
import { onMounted, ref } from "vue";

const siteData = siteStore()
const userstore = userStore()

const errorShadow = ref(true)

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

const showErrorMessage = (status, errorText) => {
    const errorMessage = document.querySelector('#errorMessage')
    // if there is a error
    if(status == true){
        errorShadow.value = true
        setTimeout(() => {
            const errorMessage = document.querySelector('#errorMessage')
            errorMessage.textContent = errorText
        }, 100)
    }
    // if there is no error
    else if(status == false){
        // errorMessage = ''
        errorShadow.value = false

    }
}

const getProduct = () => {
    // evaluate user input lenght
    if(productstore.productURL == null || productstore.productURL.length == 0){
        showErrorMessage(true, "Enter valied URL")
    }else{
        axios.get(`${import.meta.env.VITE_site}/product/`, { params: {
        "url" : productstore.productURL
        }})
        .then((success) => {
            productstore.searchProduct = {
                "product": {
                    "productLink": productstore.productURL,
                    "price": success.data.prodcut['price'],
                    "title": success.data.prodcut['title'],
                    "code": success.data.prodcut['code'],
                    "availability": success.data.prodcut['availability'],
                    "img": success.data.prodcut['image'],
                },
                "tracking": {
                    "defaultPrice": success.data.prodcut['price'],
                    "myPrice": undefined,
                }
            }
            errorShadow.value = false
            productstore.productURL = null
        })
        .catch((error) => {
            productstore.searchProduct = null
            productstore.productURL = null
            showErrorMessage(true, "product not available")
            productstore.productURL = null
        })
    }
}

const searchProductVisibility = () => {
    productstore.searchProduct = null
    errorShadow.value = true
}

const membersPopup = () => {
    siteData.membersPopup = true
    userstore.userData = {
        "email" : '',
        "password" : ''
    }
}

const storeProduct = () => {
    console.log(productstore.searchProduct)
    axios.post(`${import.meta.env.VITE_site}/product/track`, productstore.searchProduct, {
                headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${userstore.token}`
                }
            })
        .then((success) => {
            console.log('store successfull')
            searchProductVisibility()
        })
        .catch((error) => {
            console.log(error.status)
            if(error.status == 404){
                console.log('unauthorized access')
                membersPopup()
            }else if(error.status == 400){
                console.log('Product duplication found')
                searchProductVisibility()
            }else if(error.status == 500){
                console.log('Something went wrong. try again letter')
            }
        })
}

const trackProcut = () => {
    if(productstore.searchProduct.product.price == undefined || productstore.searchProduct.product.price == 0 || !isNaN(productstore.searchProduct.product.price)){
        console.log('set identicle price for this product')
    }else if(userstore.token == null){
        const restoretoken = userstore.restoreToken()
        if(restoretoken == false){
            // shot login popup
            membersPopup()
        }else if(restoretoken == true){
            // request to scrape product
            productstore.searchProduct.product.myPrice = parseInt(productstore.searchProduct.product.myPrice)
            storeProduct()
        }
    }else if (userstore.token != null){
        // request to scrape product
        storeProduct()
    }
}

</script>
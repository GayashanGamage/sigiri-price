<template>
    <div class="flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] h-full sm:p-0 p-4" v-if="sitedata.productView">
        <div class="flex flex-col h-auto gap-8 bg-white rounded-lg p-5 max-w-[400px] min-w-[200px] w-full overflow-auto" ref="productWindow">
            <!-- heading section -->
            <div class="grid grid-cols-3 gap-2">
                <button class="border-2 border-[var(--button-select)] px-auto py-1 rounded-sm bg-[var(--button-select)] text-white hover:bg-[var(--button-hover)] hover:text-white hover:border-[var(--button-hover)] active:bg-[var(--button-activate)]" @click="ProductView('product')" id="productTab">Product</button>
                <button class="border-2 border-gray-300 px-auto py-1 rounded-sm bg-white text-black hover:bg-[var(--button-hover)] hover:text-white hover:border-[var(--button-hover)] active:bg-[var(--button-activate)]" @click="ProductView('price')" id="priceTab">Price</button>
                <button class="border-2 border-gray-300 px-auto py-1 rounded-sm bg-white text-black hover:bg-[var(--button-hover)] hover:text-white hover:border-[var(--button-hover)] active:bg-[var(--button-activate)]" @click="ProductView('chart')" id="chartTab">Chart</button>
            </div>
            <!-- body section -->
            <div class="">
                <!-- productview -->
                <div class="flex flex-col gap-4" v-if="product">
                    <!-- <div class="border rounded-sm h-[250px]"></div> -->
                    <img :src="productstore.selectedProduct.details.img" alt="" class="rounded-sm h-[250px] object-cover">
                    <div class="flex flex-col gap-1">
                        <div class="flex flex-row justify-between">
                            <!-- <p class="text-sm font-semibold">Name</p> -->
                            <p class="text-sm font-semibold">{{ productstore.selectedProduct.details.title }}</p>
                        </div>
                        <div class="flex flex-row justify-between">
                            <p class="text-sm font-semibold">Product code</p>
                            <p class="">{{ productstore.selectedProduct.details.code }}</p>
                        </div>
                        <div class="flex flex-row justify-between">
                            <p class="text-sm font-semibold">Availability</p>
                            <!-- <p>{{ productstore.selectedProduct.details.availability }}</p> -->
                            <p class="">
                                <span class="bg-emerald-400 px-6 py-1 rounded-full text-white text-sm" v-if="productstore.selectedProduct.details.availability == true">Available</span>
                                <span class="bg-red-400 px-6 py-1 rounded-full text-white text-sm" v-if="productstore.selectedProduct.details.availability == false">Not Available</span>
                            </p>
                        </div>
                        <div class="bg-gray-200 py-1 px-3 mt-2 rounded-sm">
                            <div class="flex flex-row justify-between">
                                <p class="text-sm font-semibold">My price</p>
                                <p class="text-sm font-light">Rs. <span class="font-black text-2xl">{{ productstore.selectedProduct.myPrice }}</span>.00</p>
                            </div>
                            <div class="flex flex-row justify-between">
                                <p class="text-sm font-semibold">Current price</p>
                                <p class="text-sm font-light">Rs. <span class="font-black text-2xl">{{ productstore.selectedProduct.details.price }}</span>.00</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between items-center">
                        <div class="flex flex-col text-left">
                            <p class=""><span class="text-xs text-gray-400 mr-2">Last Update :</span><span class="text-xs text-gray-400">{{ productstore.selectedProduct.details.lastUpdate }}</span></p>
                        </div>
                        <p class="hover:underline hover:cursor-pointer" @click="liveProduct(productstore.selectedProduct.details.productLink)"><span class="">live Product</span><i class="fi fi-rr-arrow-up-right-from-square ml-2"></i></p>
                    </div>
                    <button :class="{'border-2 rounded-sm font-semibold text-sm py-2' : productstore.selectedProduct.emailNotification == false || productstore.selectedProduct.allEmailNotification == false, 'border-2 rounded-sm font-semibold text-sm py-2 bg-black text-white border-black' : productstore.selectedProduct.allEmailNotification == true && productstore.selectedProduct.emailNotification == true  }" @click="notificationFreezOne">{{ productstore.selectedProduct.allEmailNotification == true && productstore.selectedProduct.emailNotification == true  ? 'UnFreeze Notification' : 'Freeze notification' }}</button>
                </div>
                <!-- tracked price -->
                <div class="flex flex-col gap-2" v-if="price">
                    <div class="w-full h-[250px] border border-gray-200 rounded-sm overflow-y-auto">
                        <div class="flex flex-row justify-between px-2 py-1" v-for="item in productstore.lovedProducts[productstore.selectedProductIndex].priceHistry">
                            <p class="">{{ item.date }}</p>
                            <p class="">Rs. {{ item.price }}.00</p>
                        </div>
                    </div>
                    <div class="flex flex-row gap-2">
                        <button class="border py-1 px-3 text-sm rounded-sm hover:bg-[var(--button-hover)] hover:text-white active:text-white active:bg-[var(--button-activate)] hover:border-[var(--button-activate)] border-gray-300">Download CSV</button>
                        <button class="border py-1 px-3 text-sm rounded-sm hover:bg-[var(--button-hover)] hover:text-white active:text-white active:bg-[var(--button-activate)] hover:border-[var(--button-activate)] border-gray-300">Download XL</button>
                    </div>
                </div>
                <!-- chart -->
                <div class="" v-if="chart">
                    <div class="w-full h-[300px] " id="graphview">
                        <canvas ref="chartCanvas" height="350" width="450"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>      
</template>

<script setup>
import { productStore } from '@/stores/product';
import { siteStore } from '@/stores/sitedata';
import { userStore } from '@/stores/user';
import { onClickOutside } from '@vueuse/core';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import { ref, watch } from 'vue';

// pinia stors 
const sitedata = siteStore()
const productstore = productStore()
const userstore = userStore()

const product = ref(false)
const price = ref(false)
const chart = ref(false)

const productWindow = ref(null)

onClickOutside(productWindow, () => {
    productstore.selectedProduct = null
    productstore.selectedProductIndex = null
    sitedata.productView = false

    // set default window as product in next open
    product.value = false
    price.value = false
    chart.value = false
})

const loadPriceData = () => {
    if(!('priceHistry' in productstore.lovedProducts[productstore.selectedProductIndex])){
        // call the API, get the data and append to product details
        productstore.lovedProducts[productstore.selectedProductIndex].priceHistry = priceHistry.value
    }
}


const chartCanvas = ref(null)

const loadChart = () => {
    new Chart(chartCanvas.value, {
        type: 'line',
        data: {
            labels: [2,3,54,5,20],
            datasets: [{
                label: [10, 20, 30, 40, 50],
                data: [65, 59, 80, 81, 56],
                fill: false,
                borderColor: 'rgb(0,0,0)',
                tension: 0.4
            }]
            }
    })
}


const ProductView = (subView) => {

    const productTab = document.querySelector('#productTab')
    const priceTab = document.querySelector('#priceTab')
    const chartTab = document.querySelector('#chartTab')

    if(subView == 'product'){
        // change visibility of tab
        product.value = true
        price.value = false
        chart.value = false

        // change button styling
        // product button
        productTab.classList.replace('text-black', 'text-white')
        productTab.classList.replace('bg-white', 'bg-[var(--button-select)]')
        productTab.classList.replace('border-gray-300', 'border-[var(--button-select)]')
        // price button
        priceTab.classList.replace( 'text-white','text-black')
        priceTab.classList.replace( 'bg-[var(--button-select)]','bg-white')
        priceTab.classList.replace('border-[var(--button-select)]', 'border-gray-300')
        // chart button
        chartTab.classList.replace( 'text-white','text-black')
        chartTab.classList.replace( 'bg-[var(--button-select)]','bg-white')
        chartTab.classList.replace('border-[var(--button-select)]', 'border-gray-300')
        
    }else if(subView == 'price'){
        // change visibility of tab
        product.value = false
        price.value = true
        chart.value = false
        
        // change button styling
        // product button
        productTab.classList.replace( 'text-white','text-black')
        productTab.classList.replace( 'bg-[var(--button-select)]','bg-white')
        productTab.classList.replace('border-[var(--button-select)]', 'border-gray-300')
        // product button
        priceTab.classList.replace('text-black', 'text-white')
        priceTab.classList.replace('bg-white', 'bg-[var(--button-select)]')
        priceTab.classList.replace('border-gray-300', 'border-[var(--button-select)]')
        // chart button
        chartTab.classList.replace( 'text-white','text-black')
        chartTab.classList.replace( 'bg-[var(--button-select)]','bg-white')
        chartTab.classList.replace('border-[var(--button-select)]', 'border-gray-300')

        // load price data from API
        loadPriceData()
        
    }else{
        // change visibility of tab
        product.value = false
        price.value = false
        chart.value = true
        
        // change button styling
        // product button
        productTab.classList.replace( 'text-white','text-black')
        productTab.classList.replace( 'bg-[var(--button-select)]','bg-white')
        productTab.classList.replace('border-[var(--button-select)]', 'border-gray-300')
        
        // product button
        priceTab.classList.replace( 'text-white','text-black')
        priceTab.classList.replace( 'bg-[var(--button-select)]','bg-white')
        priceTab.classList.replace('border-[var(--button-select)]', 'border-gray-300')
        
        // chart button
        chartTab.classList.replace('text-black', 'text-white')
        chartTab.classList.replace('bg-white', 'bg-[var(--button-select)]')
        chartTab.classList.replace('border-gray-300', 'border-[var(--button-select)]')
        
        // generate linechart after create the dom element - canvas element
        setTimeout(() => {
            loadChart()
        }, 200)
    }
}

const priceHistry = ref([
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
    {
        'date' : '2-3-2025',
        'price': '8000'
    },
])

const logout = () => {
    sitedata.productView = false
    productstore.selectedProduct = null
    productstore.selectedProductIndex = null
}

const requestProductDetails = () => {
    axios.get(`${import.meta.env.VITE_site}/product/details`, 
        {
            params : {
                'id' : productstore.selectedProduct._id
            },
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userstore.token}`
            }
        }
    )
    .then((success) => {
        productstore.selectedProduct['details'] = success.data.data
        product.value = true
    })
    .catch((error) => {
        console.log(error.status)
    }) 
}

const productDetails = () => {
    console.log('execute this function')
    if(userstore.token == null){
        restore = userstore.restoreToken()
        if(restore == true){
            requestProductDetails()
        }else if(restore == false){
            logout()
        }
    }else if(userstore.token != null){
        requestProductDetails()
    }   
}

watch(() => sitedata.productView, (newVal, oldval) => {
    // this if for trigger productDetails() function when open the productView compoent
    if(newVal == true){
        productDetails()
    }
})

const liveProduct = (url) => {
    // this is for open new refferencing product page
    window.open(url, '_blank')
}

const freezeAction = () => {
    axios.patch(`${import.meta.env.VITE_site}/user/setnotification`, null, 
        {
            params : {
                'trakingId' : productstore.selectedProduct._id,
                'trackingStatus' : productstore.selectedProduct.emailNotification,
                'allTrackingStatus' : productstore.selectedProduct.allEmailNotification
            },
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userstore.token}`
            }
        }
    )
    .then((success) => {
        productstore.selectedProduct.emailNotification = !productstore.selectedProduct.emailNotification
    })
    .catch((error) => {
        console.log(error.status)
    })
}

const notificationFreezOne = () => {
    if(userstore.token == null){
        restore = userstore.restoreToken()
        if(restore == true){
            freezeAction()
        }else if(restore == false){
            logout()
        }
    }else if(userstore.token != null){
        freezeAction()
    }   
}

</script>
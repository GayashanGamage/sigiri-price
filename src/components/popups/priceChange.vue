<template>
    <div class="flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] h-full" v-if="sitedata.priceChangePopup">
        <div class="flex flex-col h-auto gap-8 bg-white rounded-lg p-5  max-w-[350px] min-w-[200px] w-full">
            <!-- head section -->
            <div class="">
                <h3 class="font-bold text-2xl text-center">Change tracking price</h3>
            </div>
            <!-- body section -->
            <div class="flex flex-col gap-3">
                <p class=""><span class="font-bold mr-25">Name : </span>{{ productstore.selectedProduct.title }}</p>
                <p class=""><span class="font-bold mr-11">Current price : </span>Rs. {{ productstore.selectedProduct.defaultPrice }}</p>
                <div class="grid grid-cols-2">  
                    <p class="font-bold mr-12">My new Price</p>
                    <input type="text" class="border-3 border-neutral-300 rounded-sm h-10 focus:outline-none px-2" v-model="productstore.selectedProduct.myPrice" :placeholder="productstore.selectedProduct.myPrice">
                </div>
            </div>
            <!-- footer section -->
            <div class="grid grid-cols-2 gap-2">
                <button class="border px-10 py-2 rounded-sm hover:border-[var(--delete-button-hover)] hover:bg-[var(--delete-button-hover)] active:bg-[var(--delete-button-activate)] active:border-[var(--delete-button-activate)] hover:text-white border-[var(--delete-button-hover)] text-[var(--delete-button-hover)]" @click="discardNewPrice">Discard</button>
                <button class="border px-10 py-2 rounded-sm hover:bg-[var(--button-hover)] hover:text-white hover:border-[var(--button-hover)] hover:cursor-pointer active:bg-[var(--button-activate)] active:border-[var(--button-activate)]" @click="confirmNewPrice">Confirm</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { productStore } from '@/stores/product';
import { siteStore } from '@/stores/sitedata';
import { userStore } from '@/stores/user';
import axios from 'axios';

const sitedata = siteStore()
const userstore = userStore()
const productstore =  productStore()

// discard new price 
const discardNewPrice = () => {
    productstore.selectedProduct = null
    sitedata.priceChangePopup = false
}

const updatePrice = () => {
    axios.patch(`${import.meta.env.VITE_site}/product/updateprice`, {
        'id' : productstore.selectedProduct._id,
        'myPrice' : productstore.selectedProduct.myPrice
        }, 
        {'headers' : {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${userstore.token}`
        }} 
    )
        .then((success) => {
            sitedata.priceChangePopup = false
            productstore.selectedProduct = null
            productstore.selectedProductIndex = null
        })
        .catch((error) => {
            console.log(error.status)
            sitedata.priceChangePopup = false
            productstore.selectedProduct = null
            productstore.selectedProductIndex = null
        })
}

// save new price as new tracking price
const confirmNewPrice = () => {
    const price = productstore.selectedProduct.myPrice
    if(isNaN(price) || price <= 0){
        alert('enter valied price')
    }else if(!isNaN(price) && price >= 1){
        if(userstore.token != null){
            updatePrice()
        }else if(userstore.token == null){
            const tokenLoad = userstore.restoreToken()
            if(tokenLoad == true){
                updatePrice()
            }else if(tokenLoad == false){
                productstore.selectedProductIndex = null
                productstore.selectedProduct = null
                sitedata.priceChangePopup = false
                router.push('/')
            }
        }
    }
}

</script>
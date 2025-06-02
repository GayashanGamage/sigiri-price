<template>
    <div class="flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] h-full" v-if="sitedata.priceChangePopup">
        <div class="flex flex-col h-auto gap-8 bg-white rounded-lg p-5  max-w-[350px] min-w-[200px] w-full">
            <!-- head section -->
            <div class="">
                <h3 class="font-bold text-2xl text-center">Change tracking price</h3>
            </div>
            <!-- body section -->
            <div class="flex flex-col gap-3">
                <p class=""><span class="font-bold mr-25">Name : </span>{{ productstore.selectedProduct.name }}</p>
                <p class=""><span class="font-bold mr-11">Current price : </span>Rs. {{ productstore.selectedProduct.current_price }}</p>
                <div class="grid grid-cols-2">  
                    <p class="font-bold mr-12">My new Price</p>
                    <input type="text" class="border-3 border-neutral-300 rounded-sm h-10 focus:outline-none px-2" v-model="productstore.selectedProduct.my_price" :placeholder="productstore.selectedProduct.my_price">
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
import { productStore } from '@/stores/product';
import { siteStore } from '@/stores/sitedata';

const sitedata = siteStore()
const productstore =  productStore()

// discard new price 
const discardNewPrice = () => {
    productstore.selectedProduct = null
    sitedata.priceChangePopup = false
}

// save new price as new tracking price
const confirmNewPrice = () => {
    productstore.lovedProducts[productstore.selectedProductIndex] = productstore.selectedProduct
    productstore.selectedProduct =  null
    productstore.selectedProductIndex = null
    sitedata.priceChangePopup = false
}

</script>
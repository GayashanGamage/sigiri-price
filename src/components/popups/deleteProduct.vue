<template>
    <div class="flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] h-full" v-if="sitedata.productDeletePopup">
        <div class="flex flex-col h-auto gap-8 bg-white rounded-lg p-5  max-w-[350px] min-w-[200px] w-full">
            <!-- head section -->
            <div class="">
                <h3 class="font-bold text-2xl text-center">Delete product</h3>
            </div>
            <!-- boddy section -->
            <div class="flex flex-col gap-2">
                <p class=""><span class="font-bold mr-20">Name :</span>{{ productstore.selectedProduct.name }}</p>
                <p class=""><span class="font-bold mr-4">Traking started :</span>{{ productstore.selectedProduct.added_date }}</p>
            </div>
            <!-- footer section -->
            <div class="grid grid-cols-2 gap-2">
                <button class="border px-10 py-2 rounded-sm hover:border-[var(--delete-button-hover)] hover:bg-[var(--delete-button-hover)] active:bg-[var(--delete-button-activate)] active:border-[var(--delete-button-activate)] hover:text-white border-[var(--delete-button-hover)] text-[var(--delete-button-hover)]" @click="deleteConfirm">Yes</button>
                <button class="border px-10 py-2 rounded-sm hover:bg-[var(--button-hover)] hover:text-white hover:border-[var(--button-hover)] hover:cursor-pointer active:bg-[var(--button-activate)] active:border-[var(--button-activate)]" @click="deleteCancel">No</button>
            </div>
        </div>
    </div>  
</template>

<script setup>
import { productStore } from '@/stores/product';
import { siteStore } from '@/stores/sitedata';
const productstore = productStore()

const sitedata = siteStore()

const deleteCancel = () => {
    productstore.selectedProduct = null
    productstore.selectedProductIndex = null
    sitedata.productDeletePopup = false
}

const deleteConfirm = () => {
    productstore.lovedProducts.splice(productstore.selectedProductIndex, 1)
    productstore.selectedProduct = null
    productstore.selectedProductIndex = null
    sitedata.productDeletePopup = false
}

</script>
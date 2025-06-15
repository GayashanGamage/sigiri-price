<template>
    <div class="flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] h-full" v-if="sitedata.productDeletePopup">
        <div class="flex flex-col h-auto gap-8 bg-white rounded-lg p-5  max-w-[350px] min-w-[200px] w-full">
            <!-- head section -->
            <div class="">
                <h3 class="font-bold text-2xl text-center">Delete product</h3>
            </div>
            <!-- boddy section -->
            <div class="flex flex-col gap-2">
                <p class=""><span class="font-bold mr-20">Name :</span>{{ productstore.selectedProduct.title }}</p>
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
import router from '@/router';
import { productStore } from '@/stores/product';
import { siteStore } from '@/stores/sitedata';
import { userStore } from '@/stores/user';
import axios from 'axios';
const productstore = productStore()

const sitedata = siteStore()
const userstore = userStore()

const deleteCancel = () => {
    productstore.selectedProduct = null
    productstore.selectedProductIndex = null
    sitedata.productDeletePopup = false
}

const autoLogout = () => {
    productstore.selectedProductIndex = null
    productstore.selectedProduct = null
    sitedata.productDeletePopup = false
    router.push('/')

}

const deleteRequest = () => {
    axios.delete(`${import.meta.env.VITE_site}/product/delete`, {
        params : {
            'id' : productstore.selectedProduct._id
        },
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userstore.token}`
        }
    })
    .then((success) => {
        if(success.status == 200){
            productstore.selectedProduct = null
            productstore.selectedProductIndex = null
            sitedata.productDeletePopup = false
            productstore.summeryRefresh = true
        }
    })
    .catch((error) => {
        if(error.status == 404){
            autoLogout()
        }else if(error.status == 400){
            console.log('request all data from product summery endpoint')
        }else{
            console.log('show error message')
        }
    })
}

const deleteConfirm = () => {
    if(userstore.token != null){
        deleteRequest()
    }else if(userstore.token == null){
        loadToken = userstore.restoreToken()
        if(loadToken == false){
            autoLogout()
        }else if(loadToken != false){
            deleteRequest()
        }
    }
}

</script>

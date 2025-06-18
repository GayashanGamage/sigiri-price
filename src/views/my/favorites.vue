<template>
    <div class="">
        <div class="overflow-auto sm:shadow shadow-none rounded-md">
        <table class="w-full border-collapse">
            <thead class="sm:table-header-group hidden bg-gray-100">
                <tr class="text-left">
                    <th class="max-w-[500px] min-w-[200px] w-[500px] pl-4 py-2">Name</th>
                    <th class="max-w-[300px] min-w-[200px] w-[200px]">Traking status</th>
                    <th class="min-w-[130px] w-[150px]">Current price</th>
                    <th class="min-w-[130px] w-[150px]">My price</th>
                    <th class="min-w-[130px] w-[300px]"></th>
                </tr>
            </thead>
            <tbody class="sm:table-row-group flex flex-col gap-4" >
                <!-- <tr v-if="productstore.lovedProducts.length == 0"> -->
                <tr v-if="productstore.lovedProducts == null">
                    <td class="text-center py-4" colspan="5"><span class="bg-red-500 text-white px-10 py-1 rounded-full shadow-sm shadow-red-500">Still you not add any item</span></td>
                </tr>
                <tr class="sm:table-row flex flex-col sm:border-1 sm:border-b sm:border-gray-200 border-2 border-gray-200 sm:even:bg-gray-50 sm:odd:bg-white bg-gray-50 hover:bg-gray-100 sm:p-0 p-4 sm:rounded-none rounded-md" v-for="(item, index) in productstore.lovedProducts" :key="item._id">
                    <td class="sm:table-cell sm:pl-4 flex flex-row"><span class="sm:hidden block font-bold mr-18">Name :</span>{{ item.title }}</td>
                    <td class="sm:table-cell flex flex-row">
                        <div class="flex flex-row">
                            <div :class="{'w-6 h-6 bg-red-400 rounded-full border-2 border-red-500' : item.emailNotification == false || item.allEmailNotification == false, 'w-6 h-6 bg-green-400 rounded-full border-2 border-green-500' : item.emailNotification == true && item.allEmailNotification == true }"></div>
                        </div>
                    </td>
                    <td class="sm:table-cell flex flex-row"><span class="sm:hidden block font-bold mr-4">Current price :</span>{{ item.defaultPrice }}</td>
                    <td class="sm:table-cell flex flex-row"><span class="sm:hidden block font-bold mr-13">My price :</span>{{ item.myPrice }}</td>
                    <td class="sm:flex sm:flex-row sm:items-center sm:w-fit grid grid-cols-3 w-full gap-2 py-4 pr-2">
                        <button class="border px-4 rounded-sm hover:border-[var(--button-hover)] hover:bg-[var(--button-hover)] active:bg-[var(--button-activate)] active:border-[var(--button-activate)] hover:text-white text-xs sm:py-1 py-2 font-semibold uppercase whitespace-nowrap" @click="changePrice(index)">New price</button>
                        <button class="border px-4 rounded-sm hover:border-[var(--button-hover)] hover:bg-[var(--button-hover)] hover:text-white  active:bg-[var(--button-activate)] active:border-[var(--button-activate)] text-xs sm:py-1 py-2 font-semibold uppercase" @click="productView(index)">View</button>
                        <button class="border px-4 rounded-sm hover:border-[var(--delete-button-hover)] hover:bg-[var(--delete-button-hover)] active:bg-[var(--delete-button-activate)] active:border-[var(--delete-button-activate)] hover:text-white text-xs sm:py-1 py-2 font-semibold uppercase border-[var(--delete-button-hover)] text-[var(--delete-button-hover)]" @click="productDelete(index)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <PriceChange></PriceChange>
    <DeleteProduct></DeleteProduct>
    <ProductView></ProductView>
    </div>
</template>

<script setup>
import DeleteProduct from '@/components/popups/deleteProduct.vue';
import PriceChange from '@/components/popups/priceChange.vue';
import ProductView from '@/components/popups/productView.vue';
import router from '@/router';
import { productStore } from '@/stores/product';
import { siteStore } from '@/stores/sitedata';
import { userStore } from '@/stores/user';
import axios from 'axios';
import { onBeforeMount, onMounted, ref } from 'vue';

// site related states store
const sitedata = siteStore()
// product related states store
const productstore = productStore()
// user related pinia store
const userstore = userStore()

const changePrice = (selectedIndex) => {
    // store selected item in a caching way to end of the process
    productstore.selectedProduct = productstore.lovedProducts[selectedIndex]
    productstore.selectedProductIndex = selectedIndex
    // close price change popup window
    sitedata.priceChangePopup = true
}

const productDelete = (selectedIndex) => {
    productstore.selectedProductIndex = selectedIndex
    productstore.selectedProduct = productstore.lovedProducts[selectedIndex]
    sitedata.productDeletePopup = true
}

const productView = (selectedIndex) => {
    console.log(selectedIndex)
    productstore.selectedProductIndex = selectedIndex
    productstore.selectedProduct = productstore.lovedProducts[productstore.selectedProductIndex]
    sitedata.productView = true
}

// const fakeTable = ref([
//     {
//         id : '001',
//         name : 'samsung gallaxy s2',
//         product_code : 'EIU002',
//         current_price : '1000.00',
//         my_price : '800.00'
//     },
//     {
//         id : '001',
//         name : 'samsung gallaxy s2',
//         product_code : 'EIU002',
//         current_price : '1000.00',
//         my_price : '800.00'
//     },
//     {
//         id : '001',
//         name : 'samsung gallaxy s2',
//         product_code : 'EIU002',
//         current_price : '1000.00',
//         my_price : '800.00'
//     },
//     {
//         id : '001',
//         name : 'samsung gallaxy s2',
//         product_code : 'EIU002',
//         current_price : '1000.00',
//         my_price : '800.00'
//     },
//     {
//         id : '001',
//         name : 'samsung gallaxy s2',
//         product_code : 'EIU002',
//         current_price : '1000.00',
//         my_price : '800.00'
//     },
// ])

onMounted(() => {
    // check loved poducts are available or not
    // if not request from API
    if(productstore.lovedProducts == null){
        productstore.productSummery()
        // axios.get(`${import.meta.env.VITE_site}/product/summery`, {
        //     headers: {
        //         'Content-Type': 'application/json', 
        //         'Authorization': `Bearer ${userstore.token}`
        //     }
        // })
        //     .then((success) => {
        //         console.log('try to execute API endpoint')
        //         // console.log(success.status)
        //         productstore.lovedProducts = success.data.data
        //     })
        //     .catch((erro) => {
        //         console.log(erro.status)
        //     })
        // }
            }
        }
    )
    
onBeforeMount(() => {
    console.log('try to execute token protection validation')
    if(userstore.token == null){
        const restore =  userstore.restoreToken()
        console.log(restore)
        if(restore == false){
            console.log('exit from my page one')
            router.push({'name' : 'productview2'})
            return
        }
    }
    if(productstore.chageSettingFreeze == true){
        productstore.productSummery()
    }
})

</script>
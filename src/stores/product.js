import axios from 'axios';
import { defineStore } from 'pinia'
import { ref, watch } from 'vue';
import { userStore } from './user';

export const productStore = defineStore('productStore', () => {
  // this is for store 'newPrice' and 'view' in favorites page - this is only for temparary until selection is discard
  const userstore = userStore()
  const productURL = ref(null)
  const searchProduct = ref(null)
  const selectedProduct = ref(null)
  const selectedProductIndex = ref(null)
  const lovedProducts = ref(null)

  // ditect changes on lovedProduct list
  const summeryRefresh = ref(false)
  const chageSettingFreeze = ref(false)


  const productSummery = () => {
    axios.get(`${import.meta.env.VITE_site}/product/summery`, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${userstore.token}`
            }
        })
            .then((success) => {
                // console.log('try to execute API endpoint')
                // console.log(success.status)
                lovedProducts.value = success.data.data
            })
            .catch((erro) => {
                console.log(erro.status)
            })
        }
  
  watch(() => summeryRefresh.value, (newVal, oldVal) => {
    if(newVal == true){
      productSummery()
      console.log('fire product summery refresh')
      summeryRefresh.value = false
    }
  })

  // const lovedProducts = ref([
  //     {
  //         id : '001',
  //         name : 'samsung gallaxy s2',
  //         product_code : 'EIU002',
  //         current_price : '1000.00',
  //         my_price : '800.00',
  //         added_date : '2-3-2025',
  //         availability : true
  //       },
  //       {
  //         id : '001',
  //         name : 'samsung gallaxy s2',
  //         product_code : 'EIU002',
  //         current_price : '1000.00',
  //         my_price : '800.00',
  //         added_date : '2-3-2025',
  //         availability : false
  //       },
  //       {
  //         id : '001',
  //         name : 'samsung gallaxy s2',
  //         product_code : 'EIU002',
  //         current_price : '1000.00',
  //         my_price : '800.00',
  //         added_date : '2-3-2025',
  //         availability : true
  //       },
  //       {
  //         id : '001',
  //         name : 'samsung gallaxy s2',
  //         product_code : 'EIU002',
  //         current_price : '1000.00',
  //         my_price : '800.00',
  //         added_date : '2-3-2025',
  //         availability : true
  //       },
  //       {
  //         id : '001',
  //         name : 'samsung gallaxy s2',
  //         product_code : 'EIU002',
  //         current_price : '1000.00',
  //         my_price : '800.00',
  //         added_date : '2-3-2025',
  //         availability : false
  //     },
  // ])

  return{ selectedProduct, lovedProducts, selectedProductIndex, productURL, searchProduct, summeryRefresh, productSummery, chageSettingFreeze }
})

// import { ref, computed, onBeforeMount } from "vue";
// import { defineStore } from "pinia";

// export const productStore = defineStore("productStore", {
//   state: () => ({
//     image: null,
//     title: null,
//     availability: null,
//     code: null,
//     price: null,
//   }),
//   getters: {},
//   actions: {
//     // set data
//     setData(image, title, availability, code, price) {
//       this.image = image;
//       this.title = title;
//       this.availability = availability;
//       this.code = code;
//       this.price = price;
//     },
//     // remove data
//     removeProduct() {
//       this.image = null;
//       this.title = null;
//       this.availability = null;
//       this.code = null;
//       this.price = null;
//     },
//   },
// });

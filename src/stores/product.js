import { defineStore } from 'pinia'
import { ref } from 'vue';

export const productStore = defineStore('productStore', () => {
  // this is for store 'newPrice' and 'view' in favorites page - this is only for temparary until selection is discard
  const productURL = ref(null)
  const searchProduct = ref(null)
  const selectedProduct = ref(null)
  const selectedProductIndex = ref(null)
  const lovedProducts = ref([
      {
          id : '001',
          name : 'samsung gallaxy s2',
          product_code : 'EIU002',
          current_price : '1000.00',
          my_price : '800.00',
          added_date : '2-3-2025',
          availability : true
        },
        {
          id : '001',
          name : 'samsung gallaxy s2',
          product_code : 'EIU002',
          current_price : '1000.00',
          my_price : '800.00',
          added_date : '2-3-2025',
          availability : false
        },
        {
          id : '001',
          name : 'samsung gallaxy s2',
          product_code : 'EIU002',
          current_price : '1000.00',
          my_price : '800.00',
          added_date : '2-3-2025',
          availability : true
        },
        {
          id : '001',
          name : 'samsung gallaxy s2',
          product_code : 'EIU002',
          current_price : '1000.00',
          my_price : '800.00',
          added_date : '2-3-2025',
          availability : true
        },
        {
          id : '001',
          name : 'samsung gallaxy s2',
          product_code : 'EIU002',
          current_price : '1000.00',
          my_price : '800.00',
          added_date : '2-3-2025',
          availability : false
      },
  ])

  return{ selectedProduct, lovedProducts, selectedProductIndex, productURL, searchProduct }
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

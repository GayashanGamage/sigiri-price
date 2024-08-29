<template>
  <div class="c-level-one-container">
    <div class="c-level-two-container">
      <table class="product-table" v-if="table">
        <tr class="table-hedding">
          <th>Name</th>
          <th>Original price</th>
          <th>Your price</th>
        </tr>
        <tbody v-for="item in allProducts" :key="item">
          <tr v-for="i in item['products']" :key="i">
            <td class="product-title">{{ i["title"] }}</td>
            <td>{{ i["price"] }}</td>
            <td>{{ item["product"]["price"] }}</td>
            <td class="button-cell">
              <button
                class="delete-button"
                @click="popup_menu(allProducts.indexOf(item))"
              >
                More
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!table">here is no any product in your tracks</p>
    </div>
    <!-- popup menu -->
    <div class="popup-menu" v-if="popup">
      <div class="product-box">
        <div class="product-part head">
          <span
            class="material-symbols-outlined popup-close-button"
            @click="popup = false"
          >
            cancel
          </span>
        </div>
        <div class="product-part p-img">
          <img
            :src="selectedProduct['products'][0]['image']"
            class="product-img"
          />
        </div>
        <div class="product-part p-name">
          <span class="popup-title">Name</span>
          <br />
          <span class="product-content">{{
            selectedProduct["products"][0]["title"]
          }}</span>
          <hr class="product-content-divider" />
        </div>
        <div class="product-part p-name">
          <span class="popup-title">Code</span>
          <br />
          <span class="product-content">{{
            selectedProduct["products"][0]["code"]
          }}</span>
          <hr class="product-content-divider" />
        </div>
        <div class="product-part p-name">
          <span class="popup-title">Availability</span>
          <br />
          <span class="product-content">{{
            selectedProduct["products"][0]["availability"]
          }}</span>
          <hr class="product-content-divider" />
        </div>
        <div class="product-part p-name">
          <span class="popup-title">Price</span>
          <br />
          <span class="product-content">{{
            selectedProduct["products"][0]["price"]
          }}</span>
          <hr class="product-content-divider" />
        </div>
        <div class="product-part p-name">
          <span class="popup-title">Your price</span>
          <br />
          <!-- <span class="product-content">{{
            selectedProduct["product"]["price"]
          }}</span> -->
          <input
            type="text"
            v-model="selectedProduct['product']['price']"
            class="product-content"
          />
          <hr class="product-content-divider" />
        </div>
        <div class="product-part p-btn">
          <button
            class="popup-button"
            @click="
              updatePrice(
                selectedProduct['product']['price'],
                selectedProduct['product']['product_id']
              )
            "
          >
            Update price
          </button>
          <button
            class="popup-button"
            @click="originalProduct(selectedProduct['products'][0]['link'])"
          >
            Live product
          </button>
          <button
            class="popup-button"
            @click="deleteProduct(selectedProduct['product']['product_id'])"
          >
            Delete product
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { onBeforeMount, ref, watch } from "vue";

name: "ProductCom";
const allProducts = ref([]);
const selectedProduct = ref();
const popup = ref(false);
const table = ref(false);

onBeforeMount(() => {
  let allCookie = document.cookie.split("; ");
  let selectedCookie = "";
  for (let i = 0; i < allCookie.length; i++) {
    if (allCookie[i].startsWith("token=")) {
      selectedCookie = allCookie[i].slice(6);
    }
  }
  axios
    .get(`${import.meta.env.VITE_site}/get-products`, {
      headers: {
        Authorization: `Bearer ${selectedCookie}`,
      },
    })
    .then((response) => {
      allProducts.value = response.data;
      // enable product table view if data available
      if (allProducts.value.length > 0) {
        table.value = true;
      }
    })
    .catch((error) => {
      console.log(error.data);
    });
});

const deleteProduct = (product_id) => {
  let allCookie = document.cookie.split("; ");
  let selectedCookie = "";
  for (let i = 0; i < allCookie.length; i++) {
    if (allCookie[i].startsWith("token=")) {
      selectedCookie = allCookie[i].slice(6);
    }
  }
  axios
    .delete(`${import.meta.env.VITE_site}/remove-product/${product_id}`, {
      headers: {
        Authorization: `Bearer ${selectedCookie}`,
      },
    })
    .then((response) => {
      popup.value = false;
      allProducts.value.forEach((element) => {
        if (element["product"]["product_id"] == product_id) {
          allProducts.value.splice(allProducts.value.indexOf(element), 1);
          if (allProducts.value.length == 0) {
            table.value = false;
          }
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const originalProduct = (link) => {
  window.open(link);
};

const popup_menu = (item) => {
  selectedProduct.value = allProducts.value[item];
  popup.value = true;
};
</script>

<style scoped>
.c-level-one-container {
  display: flex;
  justify-content: center;
  height: 85vh;
}
.c-level-two-container {
  margin-top: 80px;
}
.product-table {
  width: 90vw;
}
th,
td {
  text-align: center;
  border-bottom: 1px solid grey;
  padding: 8px 0px;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
.button-cell {
  background-color: white;
  border: 0px;
  padding: 0px;
  margin: 0px;
  width: min-content;
}
.delete-button {
  padding: 4px 25px;
  font-size: 18px;
  font-weight: 300;
  border: 0px;
  border-radius: 4px;
  background-color: #7fa1c3;
  color: #ffffff;
}
.delete-button:hover {
  background-color: #6482ad;
  font-weight: 350;
}
.table-hedding {
  background-color: #7fa1c3;
  color: white;
}
.popup-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(23, 59, 69, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-box {
  width: 43vw;
  height: 60vh;
  border-radius: 6px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(8, 2fr);
  grid-template-columns: 2fr 2fr;
  grid-template-areas:
    "head head"
    "img title"
    "img code"
    "img availability"
    "img price"
    "img update"
    "img offer"
    ".  button";
}
.head {
  grid-area: head;
}
.p-img {
  grid-area: img;
}
.product-img {
  width: 90%;
  height: 90%;
}
.product-content {
  font-weight: 200;
  font-size: 18px;
}
.product-content-divider {
  width: 80%;
  color: rgba(104, 109, 118, 0.2);
}
.popup-title {
  font-weight: 700;
  font-size: 18px;
}
.popup-button {
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 14px;
  font-weight: 300;
}
.popup-close-button {
  font-weight: 250;
  font-size: 30px;
  float: inline-end;
  margin: 10px;
  cursor: pointer;
}
.popup-close-button:hover {
  color: red;
}
.product-title {
  color: green;
}
</style>

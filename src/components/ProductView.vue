<template>
  <div class="c-level-one-container" id="product-view">
    <div class="c-level-two-container search">
      <input
        type="text"
        class="url-input"
        v-model="productUrl"
        @focusout="limitLenth()"
        @focusin="fullLenth()"
        id="url-input"
      />
      <button class="find-button" @click="getProduct">Show Product</button>
    </div>
    <div class="c-level-two-container product" v-if="widget">
      <div class="c-level-three-container">
        <div class="close-container">
          <span class="material-symbols-outlined close" @click="removeProduct">
            cancel
          </span>
        </div>
        <div class="product-details" id="img">
          <img :src="store.image" alt="" class="product-image" />
        </div>
        <div class="product-details" id="title">
          {{ store.title.toUpperCase() }}
        </div>
        <div class="product-details" id="availability">
          <p class="availability-text">{{ store.availability }}</p>
        </div>
        <div class="c-level-four-container">
          <div class="c-level-five-container">
            <p class="field-title">PRODUCT CODE</p>
            <p class="field-title">PRICE</p>
            <p class="field-title">MY OFFER Rs.</p>
          </div>
          <div class="c-level-five-container">
            <p class="product-details common" id="code">
              {{ store.code }}
            </p>
            <p class="product-details common" id="price">
              {{ store.price }}
            </p>
            <input
              type="text"
              placeholder="9950"
              id="offer-input"
              class="product-details common"
              v-model="offer"
            />
          </div>
        </div>
        <div class="product-details">
          <button class="track-button" @click="storeProduct">TRACK ME</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { productStore } from "@/stores/product";
import axios from "axios";
import { onBeforeMount, onMounted, onUpdated, ref } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const store = productStore();
const toast = useToast();
const productUrl = ref(null);
const widget = ref(false);
const offer = ref();

// scrape product and show in front end
const getProduct = () => {
  // check url and verify sinhagiri.lk
  if (productUrl.value.toLowerCase().search("singhagiri.lk") === -1) {
    toast.error("URL looks like not from singhagiri.lk");
  } else {
    // request to end point
    axios
      .get(`${import.meta.env.VITE_site}/product`, {
        params: { link: productUrl.value },
      })
      .then(function (response) {
        // increase height of the productview component
        document.getElementById("product-view").style.height = "100vh";
        // available product widget
        widget.value = true;

        let image = response.data["image"];
        let title = response.data["title"];
        let availability = response.data["availability"];
        let code = response.data["code"];
        let price = response.data["price"];

        // store in response product data in localStore
        sessionStorage.setItem("image", image);
        sessionStorage.setItem("title", title);
        sessionStorage.setItem("availability", availability);
        sessionStorage.setItem("code", code);
        sessionStorage.setItem("price", price);
        sessionStorage.setItem("link", productUrl.value);

        // store response product in pinia store
        store.setData(image, title, availability, code, price);

        // remove search productUrl
        productUrl.value = "";
      })
      // error handling
      .catch(function (error) {
        console.log(error);
      });
  }
};

// store product in database
const storeProduct = () => {
  // select wanted cookie
  let allCookie = document.cookie.split("; ");
  let selectedCookie = null;
  for (let i = 0; i < allCookie.length; i++) {
    if (allCookie[i].startsWith("token=")) {
      selectedCookie = allCookie[i].slice(6);
    }
  }
  // loging requred message if not login
  if (selectedCookie === null) {
    toast.info("first you have to login");
    // else store product
  } else {
    // request to API
    axios
      .post(
        `${import.meta.env.VITE_site}/store`,
        {
          link: sessionStorage.getItem("link"),
          price: sessionStorage.getItem("price"),
          title: sessionStorage.getItem("title"),
          track_price: parseInt(offer.value),
          code: sessionStorage.getItem("code"),
          availability: sessionStorage.getItem("availability"),
          image: sessionStorage.getItem("image"),
        },
        {
          // include cookie
          headers: {
            Authorization: `Bearer ${selectedCookie}`,
          },
        }
      )
      .then((response) => {
        // show toast notification - successfull
        toast.success("your product added successfully");
        // clearn session storage
        sessionStorage.clear();
        // hide product widget
        widget.value = false;
        // set all product values in pinia
        store.productStore = {
          image: null,
          title: null,
          availability: null,
          code: null,
          price: null,
        };
      })
      // error handling
      .catch((error) => {
        toast.error("something go wrong");
      });
  }
};

// before mount the component
onBeforeMount(() => {
  // check 'code' available in local storage
  let a = sessionStorage.getItem("code");
  // if 'code' is available
  if (a !== null) {
    let price = sessionStorage.getItem("price");
    let image = sessionStorage.getItem("image");
    let title = sessionStorage.getItem("title");
    let availability = sessionStorage.getItem("availability");
    let code = sessionStorage.getItem("code");

    // pass details to pinia store
    store.setData(image, title, availability, code, price);
  }
});

// when the component is mounted
onMounted(() => {
  // check product data availability in pinia store
  if (store.title !== null) {
    // activate product widget
    widget.value = true;

    // increase height of the productview component
    document.getElementById("product-view").style.height = "100vh";
  } else {
    // activate product widget
    widget.value = false;

    // increase height of the productview component
    document.getElementById("product-view").style.height = "30vh";
  }
});

// remove product data from frontend
const removeProduct = () => {
  // clear session storage
  sessionStorage.clear();
  // clear product data from pinia store
  store.removeProduct();
  // remove product widget
  widget.value = false;
  // back to normal size of this product
  document.getElementById("product-view").style.height = "30vh";
  // reset offer/tracking price
  offer.value = null;
};
const limitLenth = () => {
  if (productUrl.value.length > 10) {
    document.getElementById("url-input").value =
      productUrl.value.slice(0, 25) + "...";
  }
};

const fullLenth = () => {
  document.getElementById("url-input").value = productUrl.value;
};
</script>
<style scoped>
.c-level-one-container {
  width: 100vw;
  height: 25vh;
  margin: 0px !important;
  padding: 0px;
  position: 0;
  background-color: #f6f6f6;
}
.c-level-two-container {
  width: 99vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
}

.product {
  height: 45vh;
}
.c-level-three-container {
  width: 40vw;
  height: 100%;
  /* border: 1px solid black; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 25px;
  grid-template-areas:
    "img title"
    "img availability"
    "img code"
    "img price"
    "img offer"
    "img btn";
}
#img {
  grid-area: img;
}
.product-details {
  /* border: 1px solid black; */
  font-size: 18px;
  font-weight: 300;
}
.availability-text {
  background-color: #399918;
  color: white;
  width: fit-content;
  padding: 3px 20px;
  border-radius: 20px;
}
.product-image,
#img {
  /* border: 0.1px solid black; */
  border-radius: 6px;
  width: 100%;
  height: 100%;
  box-shadow: 4px 4px 13px 4px #f5eded;
}
#offer-input {
  font-size: 22px;
  font-weight: 300;
  padding-left: 6px;
  outline: none;
  width: 150px;
}
.common {
  margin-bottom: 12px;
}
.field-title {
  font-weight: 900;
  margin-right: 20px;
  margin-bottom: 16px;
}
#title {
  font-weight: 900;
}
#offer-input {
  border-radius: 3px;
  border: 1px solid black;
}
#offer-input::placeholder {
  color: #939185;
}
.c-level-four-container {
  display: flex;
}
.track-button {
  width: 100%;
  height: 40px;
  font-size: 20px;
  font-weight: 300;
}
.url-input {
  width: 30vw;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #b5c0d0;
  outline: none;
  font-family: "League Spartan", sans-serif;
  font-weight: 200;
  letter-spacing: 1px;
  font-size: 22px;
  padding: 0px 10px;
}
.find-button {
  width: 200px;
  height: 30px;
  font-family: "League Spartan", sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 20px;
  border: 0px;
  margin: 20px;
  border-radius: 4px;
}
.search {
  height: 24vh;
}
.close-container {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: right;
  align-items: center;
}
.close {
  font-size: 30px;
}
.close:hover {
  font-size: 35px;
  color: red;
}
</style>

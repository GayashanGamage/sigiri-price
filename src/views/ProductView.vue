<template>
  <div class="v-level-one-container">
    <MenubarCom></MenubarCom>
    <div class="v-level-two-container search">
      <input type="text" class="url-input" v-model="url" />
      <button class="find-button" @click="getProduct">Show Product</button>
    </div>
    <div class="v-level-two-container product" v-if="widget">
      <div class="v-level-three-container">
        <div class="product-details" id="img">
          <img :src="productData.image" alt="" class="product-image" />
        </div>
        <div class="product-details" id="title">
          {{ productData.title.toUpperCase() }}
        </div>
        <div class="product-details" id="availability">
          <p class="availability-text">{{ productData.availability }}</p>
        </div>
        <div class="v-level-four-container">
          <div class="v-level-five-container">
            <p class="field-title">PRODUCT CODE</p>
            <p class="field-title">PRICE</p>
            <p class="field-title">MY OFFER Rs.</p>
          </div>
          <div class="v-level-five-container">
            <p class="product-details common" id="code">
              {{ productData.code }}
            </p>
            <p class="product-details common" id="price">
              {{ productData.price }}
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
  <FooterCom></FooterCom>
</template>

<script setup>
import FooterCom from "@/components/FooterCom.vue";
import MenubarCom from "@/components/MenubarCom.vue";
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const toast = useToast();
const url = ref();
const widget = ref(false);
const offer = ref();
const productData = ref({
  image: "",
  title: "",
  availability: "",
  code: "",
  price: "",
});

const getProduct = () => {
  axios
    .get(`${import.meta.env.VITE_site}/product`, {
      params: { link: url.value },
    })
    .then(function (response) {
      widget.value = true;
      productData.value["image"] = response.data["image"];
      productData.value["title"] = response.data["title"];
      productData.value["availability"] = response.data["availability"];
      productData.value["code"] = response.data["code"];
      productData.value["price"] = response.data["price"];

      sessionStorage.setItem("image", response.data["image"]);
      sessionStorage.setItem("title", response.data["title"]);
      sessionStorage.setItem("availability", response.data["availability"]);
      sessionStorage.setItem("code", response.data["code"]);
      sessionStorage.setItem("price", response.data["price"]);
      sessionStorage.setItem("link", url.value);

      url.value = "";
    })
    .catch(function (error) {
      console.log(error);
    });
};

const storeProduct = () => {
  let allCookie = document.cookie.split("; ");
  let selectedCookie = "";
  for (let i = 0; i < allCookie.length; i++) {
    if (allCookie[i].startsWith("token=")) {
      selectedCookie = allCookie[i].slice(6);
    }
  }
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
        headers: {
          Authorization: `Bearer ${selectedCookie}`,
        },
      }
    )
    .then((response) => {
      toast.success("your product added successfully");
      sessionStorage.clear();
      widget.value = false;
      productData.value = {
        image: "",
        title: "",
        availability: "",
        code: "",
        price: "",
      };
    })
    .catch((error) => {
      toast.error("something go wrong");
    });
};

onBeforeMount(() => {
  let a = sessionStorage.getItem("code");
  if (a !== null) {
    productData.value["price"] = sessionStorage.getItem("price");
    productData.value["image"] = sessionStorage.getItem("image");
    productData.value["title"] = sessionStorage.getItem("title");
    productData.value["availability"] = sessionStorage.getItem("availability");
    productData.value["code"] = sessionStorage.getItem("code");
    widget.value = true;
  }
});
</script>
<style scoped>
.v-level-one-container {
  width: 100vw;
  height: 93vh;
  margin: 0px !important;
  padding: 0px;
  position: 0;
}
.v-level-two-container {
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
.v-level-three-container {
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
.v-level-four-container {
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
</style>

import { ref, computed, onBeforeMount } from "vue";
import { defineStore } from "pinia";

export const productStore = defineStore("productStore", {
  state: () => ({
    image: null,
    title: null,
    availability: null,
    code: null,
    price: null,
  }),
  getters: {},
  actions: {
    // set data
    setData(image, title, availability, code, price) {
      this.image = image;
      this.title = title;
      this.availability = availability;
      this.code = code;
      this.price = price;
    },
    // remove data
    removeProduct() {
      this.image = null;
      this.title = null;
      this.availability = null;
      this.code = null;
      this.price = null;
    },
  },
});

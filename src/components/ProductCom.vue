<template>
  <div class="c-level-one-container">
    <div class="c-level-two-container">
      <table class="product-table">
        <tr class="table-hedding">
          <th>Name</th>
          <th>Original price</th>
          <th>Your price</th>
          <th>Code</th>
        </tr>
        <tbody v-for="item in allProducts" :key="item">
          <tr v-for="i in item['products']" :key="i">
            <td>{{ i["title"] }}</td>
            <td>{{ i["price"] }}</td>
            <td>{{ item["product"]["price"] }}</td>
            <td>{{ i["code"] }}</td>
            <td class="button-cell">
              <button class="delete-button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { onBeforeMount, ref } from "vue";

name: "ProductCom";
const allProducts = ref();

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
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.data);
    });
});
</script>

<style scoped>
.c-level-one-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}
.c-level-two-container {
  display: flex;
  flex-direction: row;
}
.product-table {
  width: 80vw;
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
}
.delete-button {
  padding: 2px 20px;
}
.table-hedding {
  background-color: #c8a1e0;
  color: white;
}
</style>

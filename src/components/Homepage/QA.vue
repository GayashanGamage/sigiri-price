<template>
  <div class="c-level-one-container">
    <div class="c-level-two-container">
      <h2 class="title">Q and A</h2>
    </div>
    <div class="c-level-two-container">
      <div
        class="c-level-three-container qa-container"
        v-for="item in qlist"
        :key="item.no"
      >
        <p @click="showAnsware(item.no)" class="question">
          {{ item.q
          }}<span class="togle-icon" id="toggle-icon">{{ item.icon }}</span>
        </p>
        <p v-if="item.visibility" class="answare">
          {{ item.a }}
        </p>
      </div>
      <div class="c-level-three-container"></div>
      <div class="c-level-three-container"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const qlist = ref([
  {
    no: 0,
    q: "How to see my tracked product",
    a: "yes. it's totaly free",
    visibility: false,
    icon: "+",
  },
  {
    no: 1,
    q: "is this free service",
    a: "yes. it's totaly free",
    visibility: false,
    icon: "+",
  },
  {
    no: 2,
    q: "what are the other e-commerce webapplication I can track",
    a: "currently it's only sinhagiri.lk only. ",
    visibility: false,
    icon: "+",
  },
  {
    no: 3,
    q: "how many product track per user account ?",
    a: "unlimitet products",
    visibility: false,
    icon: "+",
  },
  {
    no: 4,
    q: "when I get email about the my tracked product ?",
    a: "if product price change toword to your price, then you will get an email notification. one email for a day. all product cover withing one email",
    visibility: false,
    icon: "+",
  },
  {
    no: 5,
    q: "if this is free, then how to cover cost of the cervice as a web application",
    a: "this develop as a my pet project. not tried to monitize.",
    visibility: false,
    icon: "+",
  },
]);

const a = { a: "wjeofijwiojf", b: "ojeoifwofj", c: "roijh" };

// toggle answare and toggle icon in question
const showAnsware = (item) => {
  for (let index = 0; index < qlist.value.length; index++) {
    // if selected item and loop index eaqual
    if (item === index) {
      // toggle answare visibility
      qlist.value[item].visibility = !qlist.value[item].visibility;
      // toggle between icon
      if (qlist.value[item].visibility === false) {
        qlist.value[item].icon = "+";
      } else {
        qlist.value[item].icon = "-";
      }
    } else {
      qlist.value[index].visibility = false;
    }
  }
};
</script>

<style scoped>
.c-level-one-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  padding-bottom: 50px;
}
.title {
  margin: 30px;
  color: #6482ad;
}
.question {
  font-size: 22px;
  font-weight: 200;
  background-color: #ffffff;
  box-shadow: 4px 4px 13px 4px #f5eded;
  width: 75vw;
  padding: 5px;
  border-radius: 8px;
  margin: 10px;
  font-weight: 300;
}
.togle-icon {
  font-weight: 500;
  font-size: 30px;
  float: right;
  cursor: pointer;
  margin-right: 15px;
}
.answare {
  width: 75vw;
  margin: 15px 0 15px 25px;
}
</style>

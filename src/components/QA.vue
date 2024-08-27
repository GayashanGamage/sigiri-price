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
    q: "oiwejfo w ojiowe foweoj",
    a: "iowjef ov weiueywe  qiu",
    visibility: false,
    icon: "+",
  },
  {
    no: 1,
    q: "og eorpo eoifinf e",
    a: "roeg erekj erf oi",
    visibility: false,
    icon: "+",
  },
  {
    no: 2,
    q: "og eorpo eoifinf e",
    a: "roeg erekj erf oi",
    visibility: false,
    icon: "+",
  },
  {
    no: 3,
    q: "og eorpo eoifinf e",
    a: "roeg erekj erf oi",
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

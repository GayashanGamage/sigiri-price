<template>
  <div class="c-level-one-container">
    <div class="c-level-two-container title">
      <h2>How to work this ?</h2>
    </div>
    <div class="c-level-two-container steps">
      <div class="levels">
        <h3 class="sub-title">First step</h3>
        <p class="description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At nostrum
          delectus hic architecto beatae sit illum eaque sapiente fuga?
          Provident?
        </p>
      </div>
      <div class="levels">
        <h3 class="sub-title">Second step</h3>
        <p class="description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At nostrum
          delectus hic architecto beatae sit illum eaque sapiente fuga?
          Provident?
        </p>
      </div>
      <div class="levels">
        <h3 class="sub-title">Third step</h3>
        <p class="description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At nostrum
          delectus hic architecto beatae sit illum eaque sapiente fuga?
          Provident?
        </p>
      </div>
      <div class="levels">
        <h3 class="sub-title">Fourth step</h3>
        <p class="description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At nostrum
          delectus hic architecto beatae sit illum eaque sapiente fuga?
          Provident?
        </p>
      </div>
      <div class="levels">
        <h3 class="sub-title">Fifth step</h3>
        <p class="description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At nostrum
          delectus hic architecto beatae sit illum eaque sapiente fuga?
          Provident?
        </p>
      </div>
      <div class="levels">
        <h3 class="sub-title">Six step</h3>
        <p class="description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At nostrum
          delectus hic architecto beatae sit illum eaque sapiente fuga?
          Provident?
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.c-level-one-container {
  background-color: #f6f6f6;
}
.c-level-two-container {
  padding: 30px 0px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  margin: 0px 12.5vw;
}
.levels {
  padding: 40px 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 4px 4px 13px 4px #f5eded;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title {
  display: flex;
  justify-content: center;
  padding-top: 30px;
  color: #6482ad;
  font-size: 20px;
}
.sub-title {
  font-size: 22px;
  padding: 0 0 30px 0;
}
.description {
  font-size: 22px;
  font-weight: 200;
  text-align: center;
}
</style>

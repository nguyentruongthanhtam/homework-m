<script setup lang="ts">
import BoardCell from './BoardCell.vue'
</script>

<template>
  <section class="wrapper">
    <div class="board">
      <BoardCell v-for="i in 63" :content="i"/>
    </div>
  </section>
</template>

<style>
.wrapper {
  width: 80vw;
  height: 80vh;
  padding: 1em;
  .board {
    width: 100%;
    height: 100%;
    border: 1px solid #333;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

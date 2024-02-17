<script setup lang="ts">
import { ref } from 'vue'
import BoardCell from './BoardCell.vue'
import payload from '../assets/assigment.json'
console.log(payload)
const boardSize = payload.width * payload.height
const items = payload.items
const chosenCell = ref(-1)
const cellProps = {
  css: {
    width: payload.width,
    height: payload.height
  }
}

function setChosenCell(cellIndex: number) {
  console.log(cellIndex)

  chosenCell.value = cellIndex
}
</script>

<template>
  <section class="wrapper">
    <div class="board">
      <BoardCell
        v-for="(n, index) in boardSize"
        :key="index"
        :data="cellProps"
        :isActive="index === chosenCell"
        @on-active="setChosenCell(index)"
      >
        <template #image>
          <div>{{ items[index]?.itemType }}</div>
        </template>
      </BoardCell>
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

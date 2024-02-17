<script setup lang="ts">
import { ref } from 'vue'
import BoardCell from './BoardCell.vue'
import { store } from '../store'

const props = defineProps(['payload'])
const payload = props.payload
const boardSize = payload.width * payload.height
const items = payload.items
// const chosenCell = ref(-1)
const cellProps = {
  css: {
    width: payload.width,
    height: payload.height
  }
}

function setChosenCell(cellIndex: number) {
  store.chosenCell = cellIndex
}
</script>

<template>
  <section class="wrapper">
    <div class="board">
      <BoardCell
        v-for="(n, index) in boardSize"
        :key="index"
        :data="cellProps"
        :isActive="index === store.chosenCell"
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
  width: 100%;
  height: 100%;
  padding: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .board {
    width: 100%;
    height: 100%;

    border: 1px solid #333;
    display: flex;
    flex-wrap: wrap;
  }
}
@media (min-width: 1024px) {
  .wrapper {
    /* flex-direction: row; */
    .board {
      padding: 1em;
      width: 1000px;
      height: 1000px;
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { store } from '../store'
import BoardCell from './BoardCell.vue'
import AddModal from './AddModal.vue'
const data = store.data
const boardSize = data.width * data.height
const items = data.items
const isModalOn = ref(false)
const cellProps = {
  css: {
    width: data.width,
    height: data.height
  }
}

function setChosenCell(cellIndex: number) {
  store.chosenCell = cellIndex
  isModalOn.value = false
  if (store.isCellEmpty()) {
    showAddModal()
  }
}

function showAddModal() {
  store.toggleModal()
}
</script>

<template>
  <section class="wrapper" @click="store.chosenCell = -1">
    <div class="board">
      <BoardCell
        v-for="(n, index) in boardSize"
        :key="index"
        :data="cellProps"
        :isActive="index === store.chosenCell"
        :isNotVisible="store.data.items[index]?.visibility === 'hidden'"
        :isInsideBubble="store.data.items[index]?.isInsideBubble"
        @on-active="setChosenCell(index)"
      >
        <template #image>
          <div>{{ items[index]?.itemType }}</div>
        </template>
      </BoardCell>
    </div>
    <Teleport to="#app">
      <AddModal></AddModal>
    </Teleport>
  </section>
</template>

<style>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .board {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    border: 3px solid #333;
    border-radius: 0.5em;
    box-shadow: 4px 4px 10px 1px #888;
  }
}
@media (min-width: 1024px) {
  .wrapper {
    .board {
      width: 1000px;
      height: 1000px;
    }
  }
}
</style>

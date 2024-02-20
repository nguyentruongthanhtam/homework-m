<script setup lang="ts">
import { ref } from 'vue'
import { store, type Item } from '../store'
import BoardCell from './BoardCell.vue'
import AddModal from './AddModal.vue'
import { getAssetPath } from '../assetService'
const data = store.data
const items = data.items
const isModalOn = ref(false)
const cellProps = {
  css: {
    width: data.width,
    height: data.height
  }
}
interface DragPayload {
  item: Item
  originIndex: number
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

function handleDragStart(event: DragEvent, index: number) {
  const payload: DragPayload = {
    item: store.data.items[index]!,
    originIndex: index
  }
  event.dataTransfer?.setData('application/json', JSON.stringify(payload))
}
function handleDrop(event: DragEvent, targetIndex: number) {
  // When target cell is empty
  const payload: DragPayload = JSON.parse(event.dataTransfer?.getData('application/json') as string)
  if (!store.data.items[targetIndex]) {
    store.addItemToBoard(payload.item, targetIndex)
    store.removeItem(payload.originIndex)
  }
  // When target cell is not empty
  else {
    const temp: Item = store.data.items[targetIndex]!
    store.addItemToBoard(payload.item, targetIndex)
    store.addItemToBoard(temp, payload.originIndex)
  }
  store.chosenCell = targetIndex
}
</script>

<template>
  <section class="wrapper" @click="store.chosenCell = -1">
    <div class="board">
      <BoardCell
        v-for="(item, index) in items"
        :key="index"
        :data="cellProps"
        :isActive="index === store.chosenCell"
        :isNotVisible="item?.visibility === 'hidden'"
        :isInsideBubble="item?.isInsideBubble"
        :draggable="item && item.visibility === 'visible' ? true : false"
        @on-active="setChosenCell(index)"
        @dragstart="handleDragStart($event, index)"
        @drop="handleDrop($event, index)"
        @dragover.prevent
      >
        <template #image v-if="item">
          <div
            class="game-asset"
            :style="{ 'background-image': getAssetPath(item.itemType) }"
          ></div>
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
    .game-asset {
      width: 100%;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
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

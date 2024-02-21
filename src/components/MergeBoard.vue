<script setup lang="ts">
import { computed } from 'vue'
import { store, type Item } from '../store'
import BoardCell from './BoardCell.vue'
import AddModal from './AddModal.vue'
import { getAssetPath } from '../assetService'
const data = store.data
const items = data.items
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
  if (store.isCellEmpty()) {
    store.toggleAddModal()
  }
  // }
}

function handleDragStart(event: DragEvent, index: number) {
  const payload: DragPayload = {
    item: items[index]!,
    originIndex: index
  }
  event.dataTransfer?.setData('application/json', JSON.stringify(payload))
  setChosenCell(index)
}

function handleDrop(event: DragEvent, targetIndex: number) {
  const targetItem = items[targetIndex]
  // When target cell is empty
  const payload: DragPayload = JSON.parse(event.dataTransfer?.getData('application/json') as string)
  if (!items[targetIndex]) {
    store.addItemToBoard(payload.item, targetIndex)
    store.removeItem(payload.originIndex)
  }
  // When target cell is not empty
  else {
    const temp: Item = items[targetIndex]!
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
        :draggable="true"
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
    border: 2px solid burlywood;
    padding: 1em;
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

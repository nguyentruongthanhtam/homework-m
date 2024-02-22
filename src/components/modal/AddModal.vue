<script lang="ts" setup>
import { store, type Item } from '@/store'
import { getAssetPath } from '@/assetService'

let newItemList: Item[] = []
const possibleItemTypes = [
  'BroomCabinet_01',
  'BroomCabinet_02',
  'BroomCabinet_03',
  'BroomCabinet_04',
  'BroomCabinet_05',
  'BroomCabinet_06',
  'BroomCabinet_07',
  'BroomCabinet_08',
  'BroomCabinet_09',
  'BroomCabinet_10'
]
possibleItemTypes.forEach((itemType) => {
  const itemLevel = Number(itemType.split('_')[1]) || 0
  const item: Item = {
    itemType,
    chainId: 'BroomCabinet',
    itemLevel,
    visibility: 'visible',
    isInsideBubble: false
  }
  newItemList.push(item)
})

function addNewItem(item: Item) {
  store.addItemToBoard(item, store.chosenCell)
  store.toggleAddModal()
}
</script>

<template>
  <Transition name="modal" appear>
    <div class="modal-wrapper" v-if="store.isAddModalOn">
      <div class="overlay" v-if="store.isAddModalOn" @click.stop="store.toggleAddModal()"></div>
      <div class="add-modal">
        <h2>Add item</h2>
        <div class="new-item-container">
          <div
            v-for="item in newItemList"
            class="new-item-cell has-tooltip"
            @click="addNewItem(item)"
            :style="{
              'background-image': getAssetPath(item.itemType)
            }"
            :data-tooltip="item.itemType"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.add-modal {
  align-self: center;
  place-self: center;
  width: 80%;
  display: flex;
  flex-direction: column;
  border: 3px solid green;
  border-radius: 0.5em;
  background-color: #f1f1f1;
  z-index: 2;
  transition: all 0.3s ease;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
  gap: 1em;
  .new-item-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
    width: 100%;
    .new-item-cell {
      width: 100px;
      height: 100px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      border: solid 3px #ddd;
      position: relative;
      &:hover {
        border: solid 3px #333;
        transition: border 0.3s;
      }
    }
  }
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3333338c;
  z-index: 1;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .add-modal,
.modal-leave-to .add-modal {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
@media (min-width: 1024px) {
  .add-modal {
    width: 50%;
  }
}
</style>

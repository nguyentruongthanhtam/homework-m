<script lang="ts" setup>
import { store } from '@/store'
import EditModal from './modal/EditModal.vue'
import ChainModal from './modal/ChainModal.vue'
import removeIcon from '@/assets/trash.svg'
import editIcon from '@/assets/pen.svg'
import infoIcon from '@/assets/info.svg'
const items = store.data.items
function removeItem(index: number) {
  store.removeItem(index)
}
</script>
<template>
  <div class="panel-wrapper">
    <div v-if="items[store.chosenCell]" class="panel-container">
      <div class="text-wrapper">
        <h2>{{ items[store.chosenCell]?.itemType }} is at</h2>
        <h1>Level {{ items[store.chosenCell]?.itemLevel }}</h1>
      </div>
      <div class="button-wrapper">
        <div>
          <h2>Remove</h2>
          <button class="button styled-button red" @click="removeItem(store.chosenCell)">
            <img :src="removeIcon" alt="remove button" class="icon" width="32" height="32" />
          </button>
        </div>
        <div>
          <h2>Edit</h2>
          <button class="button styled-button blue" @click="store.toggleEditModal()">
            <img :src="editIcon" alt="remove button" class="icon" width="32" height="32" />
          </button>
        </div>
      </div>
      <button class="button-info small-styled-button" @click="store.toggleModal()">
        <img :src="infoIcon" alt="info button" class="icon" width="24" height="24" />
      </button>
    </div>
    <div v-else class="panel-container">
      <h2>Click on an item to see information about it here</h2>
    </div>
    <Teleport to="#app">
      <EditModal v-if="store.isEditModalOn"></EditModal>
    </Teleport>
    <Teleport to="#app">
      <ChainModal v-if="store.isModalOn"></ChainModal>
    </Teleport>
  </div>
</template>

<style scoped>
.panel-wrapper {
  position: relative;
  border: 3px solid burlywood;
  border-radius: 0.5em;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  box-shadow: 4px 4px 10px 1px #888;
  .panel-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .text-wrapper {
      min-width: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      h1 {
        color: #28a745;
        font-weight: bold;
        font-size: 2em;
      }
    }
    .button-wrapper {
      display: flex;
      align-items: center;
      gap: 1em;
      h2 {
        text-align: center;
      }
      .button {
        align-self: end;
      }
    }
    .button-info {
      position: absolute;
      right: -1em;
      top: -1em;
    }
  }
  h2 {
    text-align: center;
  }
}
@media (min-width: 1024px) {
  .panel-wrapper {
    height: 100%;
    max-width: 1000px;
    margin: 0 auto;
    .panel-container {
      flex-direction: row;
      width: 80%;
      .button-wrapper {
        .remove-btn {
          align-self: center;
          padding: 1em 2em;
        }
      }
    }
  }
}
</style>

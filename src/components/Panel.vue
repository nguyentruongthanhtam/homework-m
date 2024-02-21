<script lang="ts" setup>
import { store } from '../store'
import EditModal from './EditModal.vue'
function removeItem(index: number) {
  store.removeItem(index)
}
</script>
<template>
  <div class="panel-wrapper">
    <div v-if="store.data.items[store.chosenCell]">
      Item Level {{ store.data.items[store.chosenCell]?.itemLevel }}
      <button class="btn" @click="removeItem(store.chosenCell)">Remove</button>
      <button class="btn" @click="store.toggleEditModal()">Edit</button>
    </div>
    <Teleport to="#app">
      <EditModal></EditModal>
    </Teleport>
  </div>
</template>

<style scoped>
.panel-wrapper {
  border: 3px solid burlywood;
  border-radius: 0.5em;
  height: 100%;
  display: flex;
  justify-content: space-around;
  gap: 1em;
  box-shadow: 4px 4px 10px 1px #888;
  div {
    display: flex;
    .btn {
      align-self: end;
      padding: 1em;
    }
  }
  section {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0.5em;
    div {
      display: flex;
      flex-direction: column;
      min-width: 100px;
      &.checkbox-wrapper {
        flex-direction: row;
      }
    }
  }
}
@media (min-width: 1024px) {
  .panel-wrapper {
    height: 100%;
    max-width: 1000px;
    margin: 0 auto;
    div {
      .remove-btn {
        align-self: center;
        padding: 1em 2em;
      }
    }
    section {
      flex-direction: column;
      align-items: start;
      justify-content: center;
      gap: 1em;
    }
  }
}
</style>

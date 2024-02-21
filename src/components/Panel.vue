<script lang="ts" setup>
import { store } from '../store'
import EditModal from './EditModal.vue'
import removeIcon from '@/assets/trash.svg'
import editIcon from '@/assets/pen.svg'
function removeItem(index: number) {
  store.removeItem(index)
}
</script>
<template>
  <div class="panel-wrapper">
    <div v-if="store.data.items[store.chosenCell]" class="panel-container">
      <div class="text-wrapper">
        <h2>{{ store.data.items[store.chosenCell]?.itemType }} is at</h2>
        <h1>Level {{ store.data.items[store.chosenCell]?.itemLevel }}</h1>
      </div>
      <div class="button-wrapper">
        <div>
          <h2>Remove</h2>
          <button class="button game-button red" @click="removeItem(store.chosenCell)">
            <img :src="removeIcon" alt="remove button" class="icon" width="32" height="32" />
          </button>
        </div>
        <div>
          <h2>Edit</h2>
          <button class="button game-button blue" @click="store.toggleEditModal()">
            <img :src="editIcon" alt="remove button" class="icon" width="32" height="32" />
          </button>
        </div>
      </div>
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
        padding: 0.5em;
        min-width: 100px;
        &.game-button {
          /* Base Properties */
          display: inline-block;
          border: 2px solid #ddd;
          border-radius: 1em;
          font-size: 16px;
          text-align: center;
          cursor: pointer;

          /* Red Glossy Effect */
          /* background: linear-gradient(to bottom, #ffefef, #fda5a5, #ff6868, #ff3434, #ff1919); */
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease-in-out;

          /* Red Light Shadow */
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

          /* Hover State (Optional) */
          &:hover {
            background: linear-gradient(to bottom, #f5f5f5, #f3f3f3, #f1f1f1, #efefef);
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
            transform: translateY(1px); /* Optional subtle hover animation */
          }
          &.red {
            background: radial-gradient(circle at 50% 50%, #f7f7f7 0%, #d00000 100%);
          }
          &.blue {
            background: radial-gradient(circle at 50% 50%, #c6f6d5 0%, #28a745 100%);
          }
        }
      }
    }
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

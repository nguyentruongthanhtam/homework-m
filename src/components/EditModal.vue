<script lang="ts" setup>
import { computed } from 'vue'
import { store, type Item, type ItemType } from '../store'

function handleChange(event: Event, type: ItemType) {
  let newValue: string | number | boolean
  switch (type) {
    case 'visibility':
      newValue = (event.target as HTMLInputElement).checked ? 'visible' : 'hidden'
      break

    case 'isInsideBubble':
      newValue = (event.target as HTMLInputElement).checked
      break

    default:
      newValue = (event.target as HTMLInputElement).value
      break
  }
  store.updateValue(type, newValue)
}
const pausedUntilDate = computed(() => {
  const pausedUntil = store.data.items[store.chosenCell]?.pausedUntil || ''
  const dateObject = new Date(pausedUntil)
  if (!pausedUntil) return ''
  const formattedDate = dateObject.toISOString().slice(0, -1)
  return formattedDate
})
const createdAtDate = computed(() => {
  const createdAt = store.data.items[store.chosenCell]?.createdAt || ''
  const dateObject = new Date(createdAt)
  if (!createdAt) return ''
  const formattedDate = dateObject.toISOString().slice(0, -1)
  return formattedDate
})
</script>

<template>
  <Transition name="modal">
    <div class="modal-wrapper" v-if="store.isEditModalOn">
      <div class="overlay" v-if="store.isEditModalOn" @click.stop="store.toggleEditModal()"></div>
      <div class="edit-modal">
        <h2>Edit item</h2>

        <section
          v-if="store.chosenCell > -1 && store.data.items[store.chosenCell]"
          class="form-container"
        >
          <div>
            <label for="itemId">Item Id</label>
            <input
              type="number"
              min="0"
              name="itemId"
              :value="store.data.items[store.chosenCell]?.itemId"
              @change="handleChange($event, 'itemId')"
            />
          </div>
          <div>
            <label for="itemLevel">Item Level</label>
            <input
              type="number"
              min="0"
              name="itemLevel"
              :value="store.data.items[store.chosenCell]?.itemLevel"
              @change="handleChange($event, 'itemLevel')"
            />
          </div>
          <div>
            <label for="itemType">Item Type</label>
            <input
              type="text"
              name="itemType"
              :value="store.data.items[store.chosenCell]?.itemType"
              @change="handleChange($event, 'itemType')"
            />
          </div>
          <div>
            <label for="chainId">Chain Id</label>
            <input
              type="text"
              name="chainId"
              :value="store.data.items[store.chosenCell]?.chainId"
              @change="handleChange($event, 'chainId')"
            />
          </div>
          <div>
            <label for="pausedUntil">Paused Until</label>
            <input
              type="datetime-local"
              name="pausedUntil"
              :value="pausedUntilDate"
              @change="handleChange($event, 'pausedUntil')"
            />
          </div>
          <div>
            <label for="createdAt">Created At</label>
            <input
              type="datetime-local"
              name="createdAt"
              :value="createdAtDate"
              @change="handleChange($event, 'createdAt')"
            />
          </div>

          <div class="checkbox-wrapper">
            <input
              type="checkbox"
              name="visibility"
              :checked="store.data.items[store.chosenCell]?.visibility === 'visible'"
              @change="handleChange($event, 'visibility')"
            />
            <label for="visibility">Visibility</label>
          </div>
          <div class="checkbox-wrapper">
            <input
              type="checkbox"
              name="isInsideBubble"
              :checked="store.data.items[store.chosenCell]?.isInsideBubble"
              @change="handleChange($event, 'isInsideBubble')"
            />
            <label for="isInsideBubble">Is Inside Bubble</label>
          </div>
        </section>
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

.edit-modal {
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
  align-items: center;
  padding: 2em;
  gap: 1em;
  .form-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1em;
    height: 50%;
    width: 100%;
    /* .new-item-cell {
      width: 100px;
      height: 100px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      border: solid 3px #ddd;
      &:hover {
        border: solid 3px #333;
        transition: border 0.3s;
      }
    } */
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
  .edit-modal {
    width: 40%;
    height: 50%;
    .form-container {
      /* width: 40% !important; */
      height: 50% !important;
    }
  }
}
</style>

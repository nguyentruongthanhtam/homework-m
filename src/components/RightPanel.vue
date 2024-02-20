<script lang="ts" setup>
import { computed } from 'vue'
import { store, type ItemType } from '../store'

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
function removeItem(index: number) {
  store.removeItem(index)
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
  <div class="panel-wrapper">
    <section v-if="store.chosenCell > -1 && store.data.items[store.chosenCell]">
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
        <label for="visibility">Visibility</label>
        <input
          type="checkbox"
          name="visibility"
          :checked="store.data.items[store.chosenCell]?.visibility === 'visible'"
          @change="handleChange($event, 'visibility')"
        />
        <label for="isInsideBubble">Is Inside Bubble</label>
        <input
          type="checkbox"
          name="isInsideBubble"
          :checked="store.data.items[store.chosenCell]?.isInsideBubble"
          @change="handleChange($event, 'isInsideBubble')"
        />
      </div>
    </section>
    <div v-if="store.data.items[store.chosenCell]">
      Item Level {{ store.data.items[store.chosenCell]?.itemLevel }}
      <button class="remove-btn" @click="removeItem(store.chosenCell)">Remove</button>
    </div>
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
    .remove-btn {
      align-self: end;
      padding: 1em;
    }
  }
  section {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    div {
      display: flex;
      flex-direction: column;
      min-width: 100px;
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

<script lang="ts" setup>
import { ref, toRef, computed } from 'vue'
import { store, type Item, type ItemType } from '../store'

function handleChange(event: Event, type: ItemType) {
  const newValue: string = (event.target as HTMLInputElement).value
  store.updateValue(type, store.chosenCell, newValue)
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
          true-value="visible"
          false-value="hidden"
          @change="handleChange($event, 'visibility')"
        />
      </div>
      <div>
        <label for="isInsideBubble">Is Inside Bubble</label>
        <input
          type="checkbox"
          name="isInsideBubble"
          :checked="store.data.items[store.chosenCell]?.isInsideBubble"
          @change="handleChange($event, 'isInsideBubble')"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.panel-wrapper {
  border: 1px solid blue;
  height: 100%;
  section {
    height: 100%;
    display: flex;

    flex-wrap: wrap;
    div {
      display: flex;
      flex-direction: column;
    }
  }
}
@media (min-width: 1024px) {
  .panel-wrapper {
    border: 1px solid blue;
    height: 100%;
    section {
      align-items: center;
      justify-content: center;
      max-width: 800px;
      margin: 0 auto;
      gap: 1em;
    }
  }
}
</style>

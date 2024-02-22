<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { store, type Item } from '@/store'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const state = reactive({
  itemType: store.data.items[store.chosenCell]?.itemType,
  itemLevel: store.data.items[store.chosenCell]?.itemLevel,
  itemId: store.data.items[store.chosenCell]?.itemId,
  chainId: store.data.items[store.chosenCell]?.chainId,
  createdAt: store.data.items[store.chosenCell]?.createdAt,
  pausedUntil: store.data.items[store.chosenCell]?.pausedUntil,
  visibility: store.data.items[store.chosenCell]?.visibility,
  isInsideBubble: store.data.items[store.chosenCell]?.isInsideBubble
})
const rules = computed(() => ({
  itemType: { required },
  itemLevel: { required },
  itemId: {},
  chainId: { required },
  createdAt: {},
  pausedUntil: {},
  visibility: {},
  isInsideBubble: {}
}))
const v$ = useValidate(rules, state)

function submitForm() {
  v$.value.$validate()
  if (!v$.value.$invalid) {
    const formValue = v$.value
    console.log(v$.value)
    const item: Item = {
      chainId: state.chainId!,
      itemType: state.itemType!,
      itemLevel: state.itemLevel!,
      itemId: state.itemId!,
      createdAt: state.createdAt!,
      pausedUntil: state.pausedUntil!,
      isInsideBubble: state.isInsideBubble!,
      visibility: state.visibility!
    }
    store.setValue(item)
  }
}
</script>

<template>
  <Transition name="modal">
    <div class="modal-wrapper" v-if="store.isEditModalOn">
      <div class="overlay" v-if="store.isEditModalOn" @click.stop="store.toggleEditModal()"></div>
      <div class="edit-modal">
        <h2>Edit item</h2>
        <form
          v-if="store.chosenCell > -1 && store.data.items[store.chosenCell]"
          class="form-container"
        >
          <div class="input-wrapper">
            <label for="itemId">Item Id</label>
            <input type="number" min="0" name="itemId" v-model="state.itemId" />
          </div>
          <div class="input-wrapper">
            <label for="itemLevel">Item Level</label>
            <input type="number" min="1" name="itemLevel" v-model="state.itemLevel" />
            <span v-if="v$.itemLevel.$error"> {{ v$.itemLevel.$errors[0].$message }} </span>
          </div>
          <div class="input-wrapper">
            <label for="itemType">Item Type</label>
            <input type="text" name="itemType" v-model="state.itemType" />
            <span v-if="v$.itemType.$error"> {{ v$.itemType.$errors[0].$message }} </span>
          </div>
          <div class="input-wrapper">
            <label for="chainId">Chain Id</label>
            <input type="text" name="chainId" v-model="state.chainId" />
            <span v-if="v$.chainId.$error"> {{ v$.chainId.$errors[0].$message }} </span>
          </div>
          <div class="input-wrapper">
            <label for="pausedUntil">Paused Until</label>
            <VueDatePicker v-model="state.pausedUntil"></VueDatePicker>
          </div>
          <div class="input-wrapper">
            <label for="createdAt">Created At</label>
            <VueDatePicker v-model="state.createdAt"></VueDatePicker>
          </div>
          <div class="checkbox-wrapper">
            <input
              type="checkbox"
              name="visibility"
              v-model="state.visibility"
              true-value="visible"
              false-value="hidden"
            />
            <label for="visibility">Visibility</label>
          </div>
          <div class="checkbox-wrapper">
            <input type="checkbox" name="isInsideBubble" v-model="state.isInsideBubble" />
            <label for="isInsideBubble">Is Inside Bubble</label>
          </div>
          <button type="submit" class="styled-button green" @click.prevent="submitForm()">
            Save
          </button>
        </form>
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
    gap: 0.5em;
    .input-wrapper {
      display: flex;
      align-items: start;
      flex-direction: column;
      /* apply to only other inputs which are not datepickers */
      > input {
        height: 2em;
        min-width: 300px;
      }
      span {
        color: red;
      }
    }
    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 5px;
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
  .edit-modal {
    width: 30%;
    height: 65%;
  }
}
</style>

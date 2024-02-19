<script lang="ts" setup>
import { store } from '../store'
</script>

<template>
  <Teleport to="#app">
    <div class="modal-wrapper" v-if="store.isModalOn">
      <div class="overlay" v-if="store.isModalOn" @click.stop="store.toggleModal()"></div>
      <div class="add-modal">
        <div v-for="n in 10" class="new-item-cell">item {{ n }}</div>
      </div>
    </div>
  </Teleport>
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
}
.add-modal {
  align-self: center;
  place-self: center;
  padding: 2em;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  border: 3px solid green;
  background-color: #f1f1f1;
  z-index: 2;
  gap: 1em;
  .new-item-cell {
    width: 50px;
    height: 50px;
    border: solid 1px red;
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

@media (min-width: 1024px) {
  .add-modal {
    width: 50%;
  }
}
</style>

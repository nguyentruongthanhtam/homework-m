<script lang="ts" setup>
import { store, type Item } from '@/store'
</script>

<template>
  <Transition name="modal" appear>
    <div class="modal-wrapper" v-if="store.isModalOn">
      <div class="overlay" v-if="store.isModalOn" @click.stop="store.toggleModal()"></div>
      <div class="modal">
        <h2><slot name="title"></slot></h2>

        <slot name="content"></slot>
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
  .modal {
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
    padding: 1em;
    gap: 1em;
    max-height: 90%;
    overflow: auto;
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
  .modal {
    width: 50%;
    padding: 2em;
  }
}
</style>

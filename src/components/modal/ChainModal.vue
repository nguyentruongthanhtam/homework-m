<script lang="ts" setup>
import { ref } from 'vue'
import { store, type Item } from '@/store'
import { getAssetPath } from '@/assetService'
import caretRightIcon from '@/assets/caret-right.svg'
import Modal from './Modal.vue'
const chainArray: (Item | null | undefined)[] | null = store.getMaxLevelOfByItemChain(
  store.data.items[store.chosenCell]?.chainId
)

function selectCell(level: number) {
  if (level) {
    store.chosenLevel = level
  }
}
</script>

<template>
  <Modal v-if="store.chosenCell > -1 && store.data.items[store.chosenCell] && chainArray">
    <template #title>
      {{ store.data.items[store.chosenCell]?.chainId }}
    </template>
    <template #content>
      <div class="chain-wrapper">
        <div v-for="(level, index) in chainArray" class="level-icon">
          <div class="arrow">
            <img :src="caretRightIcon" alt="remove button" class="icon" width="24" height="24" />
          </div>
          <div
            class="level-cell game-asset"
            :style="{ 'background-image': level ? getAssetPath(level.itemType) : 'none' }"
            @click="selectCell(level?.itemLevel!)"
          >
            <div class="level-number">{{ index + 1 }}</div>
            <div
              class="border"
              v-show="level?.itemLevel && store.chosenLevel === level?.itemLevel"
            ></div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>
<style>
.chain-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 4em 5px;
  padding: 1em;
  /* offset for the arrow space */
  margin-left: -24px;
  .level-icon {
    display: flex;
    align-items: center;

    &:first-of-type {
      .arrow {
        visibility: hidden;
      }
    }
    .arrow {
      margin-right: 5px;
    }
    .level-cell {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 10px;
      background-color: #ddd;
      .level-number {
        color: #666;
        font-size: 1em;
        position: absolute;
        width: 100%;
        text-align: center;
        bottom: -1.5em;
      }
      .border {
        border: 3px dashed #333;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        transition: all 0.2s;
        transform: scale(1);
      }
    }
  }
}
@media (min-width: 1024px) {
  .chain-wrapper {
    max-width: 40%;
    padding: 4em;
    .level-icon {
      .level-cell {
        width: 100px;
        height: 100px;
        .level-number {
          font-size: 2em;
        }
      }
    }
  }
}
</style>

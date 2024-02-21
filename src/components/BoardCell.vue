<script lang="ts" setup>
import { ref, toRef } from 'vue'
const props = defineProps(['data', 'isActive', 'isNotVisible', 'isInsideBubble'])
const css = props.data.css
const isActive = toRef(props, 'isActive')
const isNotVisible = toRef(props, 'isNotVisible')
const isInsideBubble = toRef(props, 'isInsideBubble')
const isHover = ref(false)
const cssProps = {
  '--board-width': css.width,
  '--board-height': css.height
}
function tooltipText() {
  if (isNotVisible.value) {
    return 'Item is hidden'
  } else if (isInsideBubble.value) {
    return 'Item is not yet available'
  }

  return undefined
}
</script>
<template>
  <div
    class="cell has-tooltip"
    :style="cssProps"
    :class="{ active: isActive, hidden: isNotVisible }"
    @click.stop="$emit('onActive')"
    :data-tooltip="tooltipText()"
  >
    <slot name="image"></slot>
    <div class="bubble-wrapper" v-show="isInsideBubble">
      <div class="bubble"></div>
    </div>
    <!-- This extra will prevent layout shifting when a cell is active -->
    <div class="border"></div>
    <!-- <button class="deleteBtn" v-if="isHover && isActive" @click="onRemove()">X</button> -->
  </div>
</template>

<style scoped>
.cell {
  position: relative;
  width: calc(100% / var(--board-width));
  height: calc(100% / var(--board-height));
  word-break: break-all;
  user-select: none;
  border: 1px solid #eee;
  padding: 0.2em;
  .border {
    border: 3px dashed transparent;
    transform: scale(0.8);
  }
  :slotted(.game-asset) {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  &.active {
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
    :slotted(.game-asset) {
      animation: spring 0.3s ease-in-out;
    }
  }
  &.hidden {
    background-color: #666;
    color: white;
    :slotted(.game-asset) {
      opacity: 0;
    }
  }
  .bubble-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .bubble {
      height: 100%;
      aspect-ratio: 1 / 1;
      background: radial-gradient(100% 115% at 25% 25%, #fff, transparent 33%),
        radial-gradient(15% 15% at 75% 75%, #80dfff, transparent),
        radial-gradient(100% 100% at 50% 25%, transparent, #66d9ff 98%);
      border: 1px solid #b3ecff;
      border-radius: 100%;
    }
  }
}
@media (min-width: 1024px) {
}
</style>

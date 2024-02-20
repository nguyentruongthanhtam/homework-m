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
</script>
<template>
  <div
    class="cell"
    :style="cssProps"
    :class="{ active: isActive, visible: isNotVisible }"
    @click.stop="$emit('onActive')"
  >
    <slot name="image"></slot>
    <div class="bubble" v-show="isInsideBubble"></div>
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
  border: 3px solid rgba(55, 55, 55, 0.2);
  &.active {
    border: 3px dotted red;
  }
  &.visible {
    opacity: 0.5;
    background-color: #444;
    color: white;
  }
  .bubble {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(100% 115% at 25% 25%, #fff, transparent 33%),
      radial-gradient(15% 15% at 75% 75%, #80dfff, transparent),
      radial-gradient(100% 100% at 50% 25%, transparent, #66d9ff 98%);
    border: 1px solid #b3ecff;
    border-radius: 100%;
  }
  .deleteBtn {
    position: absolute;
    top: -10px;
    right: -10px;
    padding: 2px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background-color: red;
    color: white;
    z-index: 1;
  }
}
@media (min-width: 1024px) {
}
</style>

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

function onHover() {
  isHover.value = !isHover.value
}
function onRemove() {
  console.log('remove')
}
</script>
<template>
  <div
    class="cell"
    :style="cssProps"
    :class="{ active: isActive, visible: isNotVisible }"
    @click.stop="$emit('onActive')"
    @mouseenter="onHover()"
    @mouseleave="onHover()"
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
    border: 3px solid red;
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
    border: 3px solid cyan;
    border-radius: 50%;
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

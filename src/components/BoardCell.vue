<script lang="ts" setup>
import { ref, toRef } from 'vue'
const props = defineProps(['data', 'isActive'])
const css = props.data.css
const isActive = toRef(props, 'isActive')
const cssProps = {
  '--board-width': css.width,
  '--board-height': css.height
}
</script>
<template>
  <div class="cell" :style="cssProps" :class="{ active: isActive }" @click="$emit('onActive')">
    <slot name="image"></slot>
  </div>
</template>

<style scoped>
.cell {
  width: calc(100% / var(--board-width));
  height: calc(100% / var(--board-height));
  word-break: break-all;
  user-select: none;
  &.active {
    border: 1px solid red;
  }
}
@media (min-width: 1024px) {
}
</style>

<script lang="ts" setup>
import { ref, toRef } from 'vue'
import { store } from '../store'

const props = defineProps(['data'])
</script>
<template>
  <div class="panel">
    Right Panel
    <div>
      {{ store.chosenCell }}
    </div>
  </div>
</template>

<style scoped>
.panel {
  border: 1px solid blue;
  height: 100%;
}
@media (min-width: 1024px) {
}
</style>

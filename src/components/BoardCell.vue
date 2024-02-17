<script lang="ts" setup>
const props = defineProps(['content'])

console.log(props.content)
</script>
<template>
  <div class="cell">{{ content }}</div>
</template>

<style scoped>
.cell {
  border: 1px solid red;
  width: calc(100% / 7);
  height: calc(100% / 9);
}
@media (min-width: 1024px) {
}
</style>

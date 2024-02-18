<script setup lang="ts">
import MergeBoard from '../components/MergeBoard.vue'
import RightPanel from '@/components/RightPanel.vue'
</script>

<template>
  <main>
    <section class="board">
      <MergeBoard />
    </section>
    <aside class="panel">
      <RightPanel />
    </aside>
  </main>
</template>

<style>
main {
  height: calc(100% - 50px);
  .board {
    height: 80%;
  }
  .panel {
    height: 20%;
  }
}
</style>

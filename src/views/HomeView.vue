<script setup lang="ts">
import MergeBoard from '../components/MergeBoard.vue'
import RightPanel from '@/components/RightPanel.vue'
</script>

<template>
  <main>
    <aside class="panel-container">
      <RightPanel />
    </aside>
    <section class="board-container">
      <MergeBoard />
    </section>
  </main>
</template>

<style>
main {
  height: calc(100% - 50px);
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .panel-container {
    height: 25%;
  }
  .board-container {
    height: 70%;
  }
}
@media (min-width: 1024px) {
  main {
    .panel-container {
      height: 20%;
    }
    .board-container {
      height: 75%;
    }
  }
}
</style>

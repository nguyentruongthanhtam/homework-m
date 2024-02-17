<script setup lang="ts">
import MergeBoard from '../components/MergeBoard.vue'
import RightPanel from '@/components/RightPanel.vue'

import jsonData from '../assets/assigment.json'
console.log(jsonData)
</script>

<template>
  <main>
    <section>
      <MergeBoard :payload="jsonData" />
    </section>
    <aside>
      <RightPanel :payload="jsonData" />
    </aside>
  </main>
</template>

<style>
main {
  height: calc(100% - 50px);
  section {
    height: 80%;
  }
  aside {
    height: 20%;
  }
}
</style>

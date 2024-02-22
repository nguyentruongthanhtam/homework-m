<script setup lang="ts">
import MergeBoard from '@/components/MergeBoard.vue'
import Panel from '@/components/Panel.vue'
import SplashView from './SplashView.vue'
import { ref } from 'vue'
const shownSplashScreen = ref(true)

setTimeout(() => {
  shownSplashScreen.value = false
}, 1000)
</script>

<template>
  <Transition name="dd" appear>
    <main v-if="!shownSplashScreen">
      <aside class="panel">
        <Panel />
      </aside>
      <section class="board">
        <MergeBoard />
      </section>
    </main>
    <SplashView v-else></SplashView>
  </Transition>
</template>

<style>
main {
  height: calc(100% - 50px);
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .panel {
    height: 25%;
  }
  .board {
    height: 70%;
  }
}
@media (min-width: 1024px) {
  main {
    .panel {
      height: 20%;
    }
    .board {
      height: 75%;
    }
  }
}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="65" />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  height: 50px;
  display: flex;
  align-items: center;
}

.logo {
  display: block;
  margin: 0 auto;
}

@media (min-width: 1024px) {
}
</style>

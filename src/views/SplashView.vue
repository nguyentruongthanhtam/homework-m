<script setup lang="ts">
import logo from '@/assets/logo.png'
</script>

<template>
  <div class="splash-view">
    <img :src="logo" alt="metacore logo" class="logo" width="200" />
  </div>
</template>

<style>
.splash-view {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

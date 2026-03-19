<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<style>
/* Remove margin for #app since full viewport is handled inside RouterView/Tailwind */
#app {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>

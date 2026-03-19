<template>
  <div class="absolute bottom-6 right-2 flex flex-col gap-2 z-10">
    <button @click="zoomIn" class="w-8 h-8 bg-white shadow rounded flex items-center justify-center hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 font-bold">+</button>
    <button @click="zoomOut" class="w-8 h-8 bg-white shadow rounded flex items-center justify-center hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 font-bold">-</button>
  </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue'
import type Map from 'ol/Map'

const map = inject<Ref<Map | null>>('olMap')

function zoomIn() {
  if (!map?.value) return
  const view = map.value.getView()
  view.setZoom((view.getZoom() || 0) + 1)
}

function zoomOut() {
  if (!map?.value) return
  const view = map.value.getView()
  view.setZoom((view.getZoom() || 0) - 1)
}
</script>

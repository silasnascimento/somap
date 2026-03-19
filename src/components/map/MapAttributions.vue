<template>
  <div class="absolute bottom-0 left-0 bg-white/80 dark:bg-gray-900/80 px-2 py-0.5 text-xs text-gray-700 dark:text-gray-300 z-10 transition-colors">
    <span v-for="(attr, idx) in activeAttributions" :key="idx">
      {{ attr }}<span v-if="idx < activeAttributions.length - 1"> | </span>
    </span>
    <span v-if="activeAttributions.length === 0">WebGIS</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLayersStore } from '../../stores/layers'

const layersStore = useLayersStore()

const activeAttributions = computed(() => {
  const attrs = new Set<string>()
  layersStore.layers.forEach(l => {
    if (l.visible && l.attribution) {
      attrs.add(l.attribution)
    }
  })
  return Array.from(attrs)
})
</script>

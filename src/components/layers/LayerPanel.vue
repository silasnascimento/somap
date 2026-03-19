<template>
  <div class="flex flex-col h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
    <div class="p-4 font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
      Camadas
      <button class="text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 p-1 px-2 rounded font-bold" title="Adicionar WMS">+</button>
    </div>
    
    <div class="flex-1 overflow-y-auto p-4">
      <VueDraggableNext
        v-model="draggableLayers"
        class="flex flex-col"
        handle=".cursor-move"
        animation="150"
      >
        <LayerItem
          v-for="layer in draggableLayers"
          :key="layer.id"
          :layer="layer"
          @update="handleLayerUpdate"
        />
      </VueDraggableNext>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import LayerItem from './LayerItem.vue'
import { useLayersStore } from '../../stores/layers'
import type { LayerConfig } from '../../types'

const layersStore = useLayersStore()

const draggableLayers = computed({
  get: () => [...layersStore.layers].reverse(),
  set: (val) => {
    layersStore.reorderLayers([...val].reverse())
  }
})

function handleLayerUpdate(id: string, updates: Partial<LayerConfig>) {
  layersStore.updateLayer(id, updates)
}
</script>

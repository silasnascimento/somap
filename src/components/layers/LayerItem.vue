<template>
  <div class="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 mb-2 shadow-sm flex flex-col gap-2 cursor-move">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="visible" class="w-4 h-4 text-teal-600 accent-teal-600 rounded border-gray-300" />
        <span class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate pr-2">{{ layer.name }}</span>
      </div>
      <div class="flex gap-1 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    
    <div class="flex items-center gap-2">
      <span class="text-xs text-gray-500 w-10 text-right">{{ Math.round(opacity * 100) }}%</span>
      <input type="range" min="0" max="1" step="0.01" v-model="opacity" class="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LayerConfig } from '../../types'

const props = defineProps<{ layer: LayerConfig }>()
const emit = defineEmits<{
  (e: 'update', id: string, changes: Partial<LayerConfig>): void
}>()

const visible = computed({
  get: () => props.layer.visible,
  set: (val) => emit('update', props.layer.id, { visible: val })
})

const opacity = computed({
  get: () => props.layer.opacity,
  set: (val) => emit('update', props.layer.id, { opacity: Number(val) })
})
</script>

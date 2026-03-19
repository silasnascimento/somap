<template>
  <div class="relative w-full h-full">
    <div id="ol-map-target" class="w-full h-full bg-gray-100 dark:bg-gray-800"></div>
    <MapControls />
    <MapAttributions />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useMap } from '../../composables/useMap'
import { useLayer } from '../../composables/useLayer'
import MapControls from './MapControls.vue'
import MapAttributions from './MapAttributions.vue'

const { map } = useMap('ol-map-target')
useLayer(map)

provide('olMap', map)
</script>

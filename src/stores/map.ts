import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('map', () => {
  const center = ref<[number, number]>([-5653863, -3030864])
  const zoom = ref(7)
  const projection = ref('EPSG:3857')

  return { center, zoom, projection }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { routeService } from '../services/routeService'

export const useRouteStore = defineStore('route', () => {
  const startPoint = ref<[number, number] | null>(null)
  const endPoint = ref<[number, number] | null>(null)
  const routeData = ref<any>(null)
  const isLoading = ref(false)
  const isActive = ref(false)
  const totalCost = ref<number | null>(null)
  const errorMessage = ref<string | null>(null)
  const nextPoint = ref<'A' | 'B'>('A')

  function toggleActive() {
    isActive.value = !isActive.value
    if (!isActive.value) {
      clearRoute()
    }
  }

  async function setPoint(coords: [number, number]) {
    if (nextPoint.value === 'A') {
      startPoint.value = coords
      endPoint.value = null
      routeData.value = null
      totalCost.value = null
      errorMessage.value = null
      nextPoint.value = 'B'
    } else {
      endPoint.value = coords
      nextPoint.value = 'A'
      await fetchRoute()
    }
  }

  async function fetchRoute() {
    if (!startPoint.value || !endPoint.value) return

    isLoading.value = true
    errorMessage.value = null
    try {
      const result = await routeService.getRoute(startPoint.value, endPoint.value)
      if (result.success) {
        routeData.value = result.data
        totalCost.value = result.total_cost || null
      } else {
        errorMessage.value = result.message || 'Erro ao calcular rota'
      }
    } catch (error: any) {
      console.error('Error fetching route:', error)
      errorMessage.value = error.data?.message || error.message || 'Erro na requisição'
    } finally {
      isLoading.value = false
    }
  }

  function clearRoute() {
    startPoint.value = null
    endPoint.value = null
    routeData.value = null
    totalCost.value = null
    errorMessage.value = null
    nextPoint.value = 'A'
  }

  return {
    startPoint,
    endPoint,
    routeData,
    isLoading,
    isActive,
    totalCost,
    errorMessage,
    nextPoint,
    setPoint,
    fetchRoute,
    clearRoute,
    toggleActive
  }
})

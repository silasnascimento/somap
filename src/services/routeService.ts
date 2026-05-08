import { apiFetch } from './api'

export interface RouteResponse {
  success: boolean
  data: any // FeatureCollection
  total_cost?: number
  message?: string
}

export const routeService = {
  async getRoute(start: [number, number], end: [number, number]): Promise<RouteResponse> {
    console.log('Fetching route with:', { start, end })
    // Revertendo para [lon, lat] (padrão GeoJSON) já que o erro anterior era de tabela inexistente no backend
    return apiFetch<RouteResponse>('/v1/routes', {
      method: 'POST',
      body: JSON.stringify({
        start_point: start,
        end_point: end
      })
    })
  }
}

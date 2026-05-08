import type { NominatimResult } from '../types/geocoding'

const API_URL = import.meta.env.VITE_GEOCODING_API_URL || 'http://192.168.0.243:8088'

export const geocodingService = {
  /**
   * Converte um endereço em coordenadas geográficas.
   * @param query O endereço ou termo de busca
   * @returns Lista de resultados do Nominatim
   */
  async search(query: string): Promise<NominatimResult[]> {
    const params = new URLSearchParams({
      q: query,
      format: 'jsonv2',
      addressdetails: '1',
      countrycodes: 'br', // Limitado ao Brasil
      limit: '5'
    })

    try {
      const response = await fetch(`${API_URL}/search?${params.toString()}`, {
        headers: {
          'Accept-Language': 'pt-BR'
        }
      })

      if (!response.ok) {
        throw new Error(`Erro na busca: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao realizar geocodificação:', error)
      throw error
    }
  },

  /**
   * Converte coordenadas em um endereço legível.
   * @param lat Latitude
   * @param lon Longitude
   * @param zoom Nível de detalhe (0-18)
   * @returns Resultado único do Nominatim
   */
  async reverse(lat: number, lon: number, zoom?: number): Promise<NominatimResult> {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      format: 'jsonv2',
      addressdetails: '1'
    })

    if (zoom !== undefined) {
      params.append('zoom', zoom.toString())
    }

    try {
      const response = await fetch(`${API_URL}/reverse?${params.toString()}`, {
        headers: {
          'Accept-Language': 'pt-BR'
        }
      })

      if (!response.ok) {
        throw new Error(`Erro na busca reversa: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao realizar geocodificação reversa:', error)
      throw error
    }
  }
}

import { watch } from 'vue'
import type OLMap from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import XYZ from 'ol/source/XYZ'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import BaseLayer from 'ol/layer/Base'
import { useLayersStore } from '../stores/layers'
import { useLayerStyle } from './useLayerStyle'
import type { LayerConfig } from '../types'

export function useLayer(mapRef: { value: OLMap | null }) {
  const layersStore = useLayersStore()
  const { getStyle } = useLayerStyle()
  
  const olLayers = new Map<string, BaseLayer>()

  function createOLLayer(config: LayerConfig): BaseLayer | null {
    if (config.type === 'xyz') {
      return new TileLayer({
        source: new XYZ({
          url: config.source.url,
          attributions: config.attribution
        }),
        zIndex: config.zIndex,
        opacity: config.opacity,
        visible: config.visible
      })
    }
    
    if (config.type === 'wms') {
      return new TileLayer({
        source: new TileWMS({
          url: config.source.url,
          params: {
            'LAYERS': config.source.layers,
            ...config.source.params
          },
          attributions: config.attribution
        }),
        zIndex: config.zIndex,
        opacity: config.opacity,
        visible: config.visible
      })
    }

    if (config.type === 'geojson') {
      return new VectorLayer({
        source: new VectorSource({
          url: config.source.url,
          format: new GeoJSON()
        }),
        style: getStyle(config),
        zIndex: config.zIndex,
        opacity: config.opacity,
        visible: config.visible
      })
    }

    return null
  }

  watch(() => [layersStore.layers, mapRef.value] as const, ([layers, map]) => {
    if (!map) return

    const currentLayerIds = new Set(layers.map(l => l.id))
    for (const [id, olLayer] of olLayers.entries()) {
      if (!currentLayerIds.has(id)) {
        map.removeLayer(olLayer)
        olLayers.delete(id)
      }
    }

    for (const config of layers) {
      const existingLayer = olLayers.get(config.id)
      
      if (!existingLayer) {
        const newLayer = createOLLayer(config)
        if (newLayer) {
          olLayers.set(config.id, newLayer)
          map.addLayer(newLayer)
        }
      } else {
        existingLayer.setVisible(config.visible)
        existingLayer.setOpacity(config.opacity)
        existingLayer.setZIndex(config.zIndex)
      }
    }
  }, { deep: true })
}

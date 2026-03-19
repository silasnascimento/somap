import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style'
import type { LayerConfig } from '../types'

export function useLayerStyle() {
  function getStyle(config: LayerConfig) {
    if (!config.style) return undefined

    const fill = new Fill({ color: config.style.fillColor || 'rgba(255, 255, 255, 0.4)' })
    const stroke = new Stroke({
      color: config.style.strokeColor || '#3399CC',
      width: config.style.strokeWidth || 1.25
    })

    return new Style({
      fill,
      stroke,
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: config.style.color || '#E24B4A' }),
        stroke: new Stroke({ color: config.style.strokeColor || '#A32D2D', width: 1 })
      })
    })
  }

  return { getStyle }
}

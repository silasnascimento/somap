<script setup lang="ts">
import { inject, onMounted, onUnmounted, watch, type Ref } from 'vue'
import type Map from 'ol/Map'
import { useRouteStore } from '../../stores/route'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Stroke, Icon } from 'ol/style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { toLonLat, fromLonLat } from 'ol/proj'
import type { MapBrowserEvent } from 'ol'

const map = inject<Ref<Map | null>>('olMap')
const routeStore = useRouteStore()

// Camada para a linha da rota
const routeSource = new VectorSource()
const routeLayer = new VectorLayer({
  source: routeSource,
  zIndex: 90,
  style: new Style({
    stroke: new Stroke({
      color: '#3388ff',
      width: 5,
    }),
  }),
})

// Camada para os marcadores A e B
const markerSource = new VectorSource()
const markerLayer = new VectorLayer({
  source: markerSource,
  zIndex: 100,
})

// Estilos dos marcadores
const styleA = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    scale: 0.5,
  }),
})

const styleB = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    scale: 0.5,
  }),
})

// Manipulador de clique no mapa
const handleMapClick = (event: MapBrowserEvent<any>) => {
  if (!routeStore.isActive) return
  
  const coords = toLonLat(event.coordinate)
  routeStore.setPoint(coords as [number, number])
}

// Atualizar marcadores e rota quando o estado mudar
watch(() => [routeStore.startPoint, routeStore.endPoint, routeStore.routeData], () => {
  markerSource.clear()
  routeSource.clear()

  if (routeStore.startPoint) {
    const featA = new Feature({
      geometry: new Point(fromLonLat(routeStore.startPoint)),
    })
    featA.setStyle(styleA)
    markerSource.addFeature(featA)
  }

  if (routeStore.endPoint) {
    const featB = new Feature({
      geometry: new Point(fromLonLat(routeStore.endPoint)),
    })
    featB.setStyle(styleB)
    markerSource.addFeature(featB)
  }

  if (routeStore.routeData) {
    const format = new GeoJSON()
    const features = format.readFeatures(routeStore.routeData, {
      featureProjection: map?.value?.getView().getProjection() || 'EPSG:3857',
    })
    routeSource.addFeatures(features)
    
    // Zoom na rota
    if (features.length > 0 && map?.value) {
      const extent = routeSource.getExtent()
      if (extent) {
        map.value.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 1000 })
      }
    }
  }
}, { deep: true })

// Cursor loading
watch(() => routeStore.isLoading, (loading) => {
  if (map?.value) {
    const viewport = map.value.getViewport()
    viewport.style.cursor = loading ? 'wait' : ''
  }
})

onMounted(() => {
  watch(map!, (newMap) => {
    if (newMap) {
      newMap.addLayer(routeLayer)
      newMap.addLayer(markerLayer)
      newMap.on('click', handleMapClick)
    }
  }, { immediate: true })
})

onUnmounted(() => {
  if (map?.value) {
    map.value.removeLayer(routeLayer)
    map.value.removeLayer(markerLayer)
    map.value.un('click', handleMapClick)
  }
})
</script>

<template>
  <!-- Este componente não renderiza nada diretamente no DOM -->
  <div v-if="false"></div>
</template>

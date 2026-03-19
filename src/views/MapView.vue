<template>
  <div class="flex flex-col h-screen overflow-hidden bg-gray-100 dark:bg-gray-950 transition-colors">
    <AppToolbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="flex flex-1 overflow-hidden relative">
      <AppSidebar :is-open="sidebarOpen" class="absolute md:relative z-30 h-full shadow-2xl md:shadow-none" />
      
      <div v-if="sidebarOpen" class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-20 md:hidden transition-opacity" @click="sidebarOpen = false"></div>
      
      <main class="flex-1 relative w-full h-full">
        <MapContainer />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppToolbar from '../components/ui/AppToolbar.vue'
import AppSidebar from '../components/ui/AppSidebar.vue'
import MapContainer from '../components/map/MapView.vue'

const sidebarOpen = ref(true)
</script>

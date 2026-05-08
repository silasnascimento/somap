<template>
  <div class="absolute bottom-6 right-14 z-10 flex flex-col items-end gap-3">
    <!-- Botão de Ativação (se inativo) -->
    <button 
      v-if="!routeStore.isActive"
      @click="routeStore.toggleActive"
      class="bg-white dark:bg-gray-900 shadow-xl rounded-full px-5 py-3 flex items-center gap-3 hover:scale-105 transition-all border border-gray-100 dark:border-gray-800 group"
    >
      <div class="p-2 bg-blue-500 rounded-full text-white group-hover:rotate-12 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      </div>
      <span class="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-tight">Roteirização</span>
    </button>

    <!-- Painel de Roteirização Ativo -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-4 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 scale-100"
      leave-to-class="transform translate-y-4 opacity-0 scale-95"
    >
      <div 
        v-if="routeStore.isActive" 
        class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-6 py-5 shadow-2xl rounded-2xl border border-white/20 dark:border-gray-700/50 min-w-[320px] max-w-[400px]"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
            <h3 class="text-xs font-black text-gray-800 dark:text-white uppercase tracking-widest">Modo Roteiro</h3>
          </div>
          <button 
            @click="routeStore.toggleActive" 
            class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-red-500"
            title="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <!-- Status / Instruções -->
          <div class="text-sm text-gray-600 dark:text-gray-300">
            <div v-if="!routeStore.startPoint && !routeStore.isLoading" class="flex items-center gap-3 py-2">
              <div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 font-bold text-xs">A</div>
              <span class="font-medium">Clique no mapa ou busque o Ponto de Partida</span>
            </div>

            <div v-else-if="routeStore.startPoint && !routeStore.endPoint && !routeStore.isLoading" class="flex items-center gap-3 py-2">
              <div class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 font-bold text-xs">B</div>
              <span class="font-medium animate-pulse">Agora selecione o Ponto de Destino</span>
            </div>
            
            <div v-else-if="routeStore.isLoading" class="flex items-center gap-3 py-4 justify-center bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div class="flex space-x-1.5">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
            </div>

            <!-- Erro -->
            <div v-else-if="routeStore.errorMessage" class="py-2">
              <div class="flex items-center gap-3 py-3 px-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/50">
                <div class="p-1.5 bg-red-100 dark:bg-red-800 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="text-[11px] font-bold text-red-700 dark:text-red-300 leading-tight">{{ routeStore.errorMessage }}</span>
              </div>
            </div>

            <!-- Resultado -->
            <div v-else-if="routeStore.totalCost !== null" class="flex flex-col gap-3">
              <div class="flex items-center gap-4 py-3 px-4 bg-blue-500 shadow-lg shadow-blue-500/30 rounded-2xl text-white">
                <div class="flex-1">
                  <p class="text-[10px] opacity-80 font-bold uppercase tracking-widest mb-0.5">Custo Total</p>
                  <p class="text-2xl font-black">{{ formatCost(routeStore.totalCost) }}</p>
                </div>
                <div class="p-2 bg-white/20 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Pontos (Debug/Info) -->
          <div v-if="routeStore.startPoint" class="flex flex-col gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-gray-400 font-bold uppercase">Origem</span>
              <span class="text-gray-600 dark:text-gray-400 tabular-nums">{{ routeStore.startPoint.map(c => c.toFixed(5)).join(', ') }}</span>
            </div>
            <div v-if="routeStore.endPoint" class="flex items-center justify-between text-[11px]">
              <span class="text-gray-400 font-bold uppercase">Destino</span>
              <span class="text-gray-600 dark:text-gray-400 tabular-nums">{{ routeStore.endPoint.map(c => c.toFixed(5)).join(', ') }}</span>
            </div>
          </div>

          <!-- Botão de Limpar -->
          <button 
            v-if="routeStore.startPoint"
            @click="routeStore.clearRoute" 
            class="w-full py-2.5 text-xs font-bold text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Limpar Rota
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useRouteStore } from '../../stores/route'

const routeStore = useRouteStore()

function formatCost(cost: number) {
  if (cost > 1000) {
    return `${(cost / 1000).toFixed(2)} km`
  }
  return `${cost.toFixed(1)} m`
}
</script>

<style scoped>
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}
</style>

<style scoped>
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}
</style>

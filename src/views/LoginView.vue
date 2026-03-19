<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
    <div class="max-w-sm w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-black/20 border border-gray-100 dark:border-gray-700/50">
      <div>
        <div class="mx-auto w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-lg mb-6 flex items-center justify-center text-white font-bold text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
        </div>
        <h2 class="mt-2 text-center text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          WebGIS Enterprise
        </h2>
        <p class="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
          Acesse com suas credenciais mock
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <div class="space-y-4">
          <div>
            <label for="email-address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required v-model="email"
                   class="appearance-none block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all sm:text-sm shadow-sm" placeholder="admin@somap.com">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required v-model="password"
                   class="appearance-none block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all sm:text-sm shadow-sm" placeholder="••••••••">
          </div>
        </div>

        <div v-if="error" class="text-sm text-red-600 dark:text-red-400 text-center font-medium bg-red-50 dark:bg-red-900/20 py-2 rounded-lg">{{ error }}</div>

        <div>
          <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/30 transition-all shadow-md hover:shadow-lg">
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('admin@somap.com')
const password = ref('password')
const error = ref('')

const auth = useAuthStore()
const router = useRouter()

async function onSubmit() {
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    router.push('/map')
  } catch (err: any) {
    error.value = 'Falha no login. Verifique o servidor.'
  }
}
</script>

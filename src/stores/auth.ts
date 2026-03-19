import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types'
import { apiFetch } from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('webgis_token'))
  const user = ref<User | null>(null)

  async function login(email: string, password: string) {
    const res = await apiFetch<{ token: string, user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    token.value = res.token
    user.value = res.user
    localStorage.setItem('webgis_token', res.token)
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('webgis_token')
  }

  return { token, user, login, logout }
})

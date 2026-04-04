import { useAuthStore } from '../stores/auth'

export class ApiError extends Error {
  constructor(public status: number, public data: any) {
    super(`API Error ${status}`)
  }
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const authStore = useAuthStore()
  const token = authStore.token
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? ''
  const res = await fetch(`${baseUrl}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })
  if (!res.ok) throw new ApiError(res.status, await res.json().catch(() => null))
  return res.json()
}

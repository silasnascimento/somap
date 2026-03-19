import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCKS !== 'false' && process.env.NODE_ENV !== 'production') {
    const { worker } = await import('./mocks/browser')
    return worker.start({ onUnhandledRequest: 'bypass' })
  }
}

enableMocking().then(() => {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
})

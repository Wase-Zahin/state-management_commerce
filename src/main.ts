import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { key, store } from './store'
import { initStripe } from 'vue-stripe-js'

const app = createApp(App)

app.use(store, key).use(router).mount('#app')



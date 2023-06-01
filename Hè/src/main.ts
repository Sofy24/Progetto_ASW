import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import PrimeVue from 'primevue/config'
import "primevue/resources/themes/lara-light-indigo/theme.css"    
import "primevue/resources/primevue.min.css"


const app = createApp(App)

app.use(router)
app.use(VueApexCharts)
app.use(PrimeVue)


app.mount('#app')

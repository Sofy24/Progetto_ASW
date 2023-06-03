import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import PrimeVue from 'primevue/config'
import "primevue/resources/themes/lara-light-indigo/theme.css"    
import "primevue/resources/primevue.min.css"

/*
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

//export const SocketInstance = socketio('http://localhost:3001');


import { io, Socket } from 'socket.io-client';


const SocketInstance: Socket = io('http://localhost:3001');

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}
*/
const app = createApp(App)


//app.config.globalProperties.$socket = SocketInstance;
//app.use(VueSocketIO, SocketInstance)
app.use(router)
app.use(VueApexCharts)
app.use(PrimeVue)


app.mount('#app')

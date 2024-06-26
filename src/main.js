import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import DraggableDiv from './components/DraggableDiv.vue'

const app = createApp(App);
app.component('DraggableDiv', DraggableDiv);
app.mount('#app');

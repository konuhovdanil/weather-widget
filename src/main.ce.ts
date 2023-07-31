import App from './App.ce.vue'
import { defineCustomElement } from 'vue'

const WeatherWidget = defineCustomElement(App)

customElements.define('weather-widget', WeatherWidget)

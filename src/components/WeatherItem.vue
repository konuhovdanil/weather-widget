<template>
  <div class="weather-item" v-if="weatherInfo.name">
    <div class="weather-item__title head">{{ weatherInfo.name }}, {{ weatherInfo.sys.country }}</div>
    <div class="weather-item__image">
      <img :src="weatherIcon" alt="icon">
      <span>{{ formatTemp(props.weatherInfo.main.temp) }}</span>
    </div>
    <div class="weather-item__info">
      <div class="weather-item__data">
        Feels like {{ formatTemp(weatherInfo.main.feels_like) }}, {{ weatherInfo.weather[0].main }},
        {{ weatherInfo.weather[0].description }}
      </div>
      <div class="weather-item__metrics">
        <div class="metrics__data speed" v-if="weatherInfo.wind.speed">
          <span class="metrics__title icon">&#11164;</span>
          {{ weatherInfo.wind.speed }}m/s {{ convertDegreeToCompassPoint }}
        </div>
        <div class="metrics__data pressure" v-if="weatherInfo.main.pressure">
          <span class="metrics__title icon">&#8960;</span>
          {{ weatherInfo.main.pressure }} hPa
        </div>
        <div class="metrics__data humidity" v-if="weatherInfo.main.humidity">
          <span class="metrics__title">Humidity:</span>
          {{ weatherInfo.main.humidity }}
        </div>
        <div class="metrics__data visibility" v-if="weatherInfo.visibility">
          <span class="metrics__title">Visibility:</span>
          {{ convertVisibilityToShortForm }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, ComputedRef } from "vue";
import { IWeather } from "@/types/weather";

const compassPoints = [
  "N", "NNE", "NE", "ENE",
  "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW",
  "W", "WNW", "NW", "NNW"
]
const props = defineProps({
  weatherInfo: {
    type: Object as PropType<IWeather>,
    required: true
  }
})

const weatherIcon: ComputedRef<string> = computed(() => {
  if (props.weatherInfo && props.weatherInfo?.weather.length > 0) {
    return `http://openweathermap.org/img/w/${ props.weatherInfo.weather[0].icon }.png`
  }

  return ''
})

const convertDegreeToCompassPoint: ComputedRef<string> = computed(() => {
  const rawPosition = Math.floor((props.weatherInfo.wind.deg / 22.5) + 0.5)
  const arrayPosition = (rawPosition % 16)

  return compassPoints[arrayPosition]
})

const convertVisibilityToShortForm: ComputedRef<string> = computed(() => {
  if (props.weatherInfo.visibility) {
    return props.weatherInfo.visibility > 1000 ? `${ (props.weatherInfo.visibility / 1000).toFixed(2) }km` : `${ props.weatherInfo.visibility }m`
  }

  return ''
})

const formatTemp = (temp: number): string => {
  return temp.toFixed(0) + '℃'
}
</script>
<template>
  <div class="app">
    <a v-if="!(cities.length > 0 && !isSettingsShown)" class="app__settings-btn" href="#" @click.prevent="isSettingsShown = !isSettingsShown">
      <span class="cross" v-if="isSettingsShown">&#215;</span>
      <span class="gear" v-else>&#9881;</span>
    </a>
    <settings-view
        v-if="isSettingsShown"
        :cities="cities"
        @update:cities="updateCities"
        @sort:cities="sortCities"
        @delete:city="deleteCity"
    />
    <weather-view
        v-else
        :local-weather="localWeather"
        :weather="selectedCitiesWeather"
        :cities="cities"
        @fetch:weather="fetchWeather"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import WeatherView from "@/views/WeatherView.ce.vue";
import SettingsView from "@/views/SettingsView.ce.vue";
import { ICity } from "@/types/city";
import { IWeather } from "@/types/weather";
import { getCurrentWeatherByPosition, getCurrentWeatherByCities } from "@/api/weather";

const saveToLocalStorage = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data))
}
const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key)

  return data ? JSON.parse(data) : null
}

const isSettingsShown: Ref<boolean> = ref(false)
const cities: Ref<ICity[]> = ref(getFromLocalStorage('cities') ?? [])
// eslint-disable-next-line no-undef
const localWeather: Ref<IWeather | null> = ref(null)
const selectedCitiesWeather: Ref<IWeather[]> = ref([])
const fetchFlag: Ref<boolean> = ref(false)

const sortCities = ({ itemIdx, targetIdx }: { itemIdx: number, targetIdx: number }) => {
  const forwardSort = <T, >(array: T[]): T[] => [...array.slice(0, itemIdx), ...array.slice(itemIdx + 1, targetIdx + 1), array[itemIdx], ...array.slice((targetIdx + 1))].filter(item => item)
  const backwardSort = <T, >(array: T[]): T[] => [...array.slice(0, targetIdx), array[itemIdx], ...array.slice(targetIdx, itemIdx), ...array.slice(itemIdx + 1)].filter(item => item)

  if (targetIdx > itemIdx) {
    cities.value = forwardSort(cities.value)
    selectedCitiesWeather.value = forwardSort(selectedCitiesWeather.value)
  } else {
    cities.value = backwardSort(cities.value)
    selectedCitiesWeather.value = backwardSort(selectedCitiesWeather.value)
  }

  saveToLocalStorage('cities', cities.value)
}

const updateCities = (city: ICity) => {
  cities.value.push(city)
  saveToLocalStorage('cities', cities.value)
  fetchFlag.value = true
}

const deleteCity = (city: ICity) => {
  cities.value = cities.value.filter(item => item.lat !== city.lat && item.lon !== city.lon)
  saveToLocalStorage('cities', cities.value)
  fetchFlag.value = true
}

const fetchLocalWeather = async (latitude: number, longitude: number) => {
  localWeather.value = await getCurrentWeatherByPosition(latitude, longitude)
}

const fetchWeather = async () => {
  if (fetchFlag.value) selectedCitiesWeather.value = await getCurrentWeatherByCities(cities.value)
  fetchFlag.value = false
}

onMounted(async () => {
  if (cities.value.length === 0) {
    navigator.geolocation.getCurrentPosition(
        // eslint-disable-next-line no-undef
        async (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords

          await fetchLocalWeather(latitude, longitude)
        },
        err => console.log('geolocation err', err)
    )
    return
  }

  selectedCitiesWeather.value = await getCurrentWeatherByCities(cities.value)
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Golos+Text&display=swap');

@import "@/assets/scss/main.scss";
@import "@/assets/scss/settings.scss";
@import "@/assets/scss/weather-item.scss";
@import "@/assets/scss/cities-form.scss";
@import "@/assets/scss/cities-item.scss";
</style>

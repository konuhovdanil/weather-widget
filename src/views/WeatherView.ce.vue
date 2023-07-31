<template>
  <div class="weather">
    <div class="weather__local" v-if="isShowLocalWeather">
      <div class="weather__local__alert" v-if="!localWeather">Perhaps there is no access to geolocation!</div>
      <weather-item
        v-else
        :weather-info="localWeather"
      />
    </div>
    <div class="weather__cities" v-else>
      <div v-if="weather">
        <weather-item
            v-for="info in weather"
            :key="info.id"
            :weather-info="info"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted } from "vue";
import { IWeather } from "@/types/weather";
import WeatherItem from "@/components/WeatherItem.vue";
import { ICity } from "@/types/city";

const props = defineProps({
  localWeather: {
    type: null as unknown as PropType<IWeather | null>,
    required: true
  },
  weather: {
    type: Array as PropType<IWeather[]>,
    required: true
  },
  cities: {
    type: Array as PropType<ICity[]>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'fetch:weather'): void
}>()

const isShowLocalWeather = computed(() => props.cities.length === 0)

onMounted(() => {
  if (props.cities.length > 0) emit('fetch:weather')
})
</script>
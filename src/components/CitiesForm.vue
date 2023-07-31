<template>
  <div class="settings-form">
    <div class="settings-form__title head">Add Location</div>
    <div class="settings-form__field">
      <input type="text" v-model="searchQuery" @input="showVariants" class="settings-form__input">
      <ul v-if="variants.length > 0" class="settings-form__cities-pool">
        <li v-for="city in variants" :key="city.lat + ':' + city.lon" @click="updateCity(city)">
          {{ city.name }}, {{ city.country }} <span v-if="city.state && city.name !== city.state">({{ city.state }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, Ref } from "vue";
import { ICity } from "@/types/city";
import { getAvailableCities } from "@/api/city";

const props = defineProps({
  cities: {
    type: Array as PropType<ICity[]>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:cities', city: ICity): void
}>()

const searchQuery: Ref<string> = ref('')
const variants: Ref<ICity[]> = ref([])
// eslint-disable-next-line no-undef
const timeout: Ref<NodeJS.Timeout | null> = ref(null)

const showVariants = () => {
  if (!timeout.value && searchQuery.value.length > 0) {
    timeout.value = setTimeout(async () => {
      variants.value = await getAvailableCities(searchQuery.value)

      timeout.value = null
    }, 500)
  }

  if (searchQuery.value.length === 0) {
    timeout.value = null
    variants.value = []
  }
}

const updateCity = (city: ICity) => {
  if (props.cities.some(item => item.lat === city.lat && city.lon === item.lon)) return

  emit('update:cities', city)
  searchQuery.value = ''
  timeout.value = null
  variants.value = []
}
</script>
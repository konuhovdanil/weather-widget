<template>
  <div class="settings">
    <div class="settings__body">
      <div class="settings__title head">
        Settings
      </div>
      <div
        class="settings__cities"
        @drop="drop"
      >
        <cities-item
          v-for="city in cities"
          :key="city.lat + ':' + city.lon"
          :city="city"
          @delete:city="(deletedCity: ICity) => $emit('delete:city', deletedCity)"
        />
      </div>
    </div>

    <cities-form :cities="cities" @update:cities="(city: ICity) => $emit('update:cities', city)"/>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ICity } from '@/types/city'
import CitiesForm from "@/components/CitiesForm.vue";
import CitiesItem from "@/components/CitiesItem.vue";

const props = defineProps({
  cities: {
    type: Array as PropType<ICity[]>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:cities', city: ICity): void
  (e: 'delete:city', city: ICity): void
  (e: 'sort:cities', {itemIdx, targetIdx}: {itemIdx: number, targetIdx: number}): void
}>()

const drop = (e: DragEvent) => {
  if (e.dataTransfer && e.target instanceof HTMLElement) {
    const itemId: string = e.dataTransfer.getData('itemId')
    const [lat, lon]: string[] = itemId.split(':')
    const itemIdx: number = props.cities.findIndex(city => city.lat === +lat && city.lon === +lon)
    const parent: HTMLElement | null = e.target.closest('.settings-cities-item')

    if (parent && parent.dataset.id) {
      const [targetLat, targetLon]: string[] = parent.dataset.id.split(':')
      const targetIdx: number = props.cities.findIndex(city => city.lat === +targetLat && city.lon === +targetLon)

      emit('sort:cities', { itemIdx, targetIdx})
    }
  }
}
</script>
<template>
  <div
    :data-id="city.lat + ':' + city.lon"
    class="settings-cities-item"
  >
    <div class="item__title">
      <div
        class="item__drag"
        draggable="true"
        @dragstart.stop="dragStart($event, city)"
        @dragover.prevent.stop
        @dragend.stop="dragEnd"
      >
        &#9776;
      </div>
      {{ city.name }}, {{ city.country }} <span v-if="city.state && city.name !== city.state">({{ city.state }})</span>
    </div>
    <button class="item__btn" @click="$emit('delete:city', city)">&#9003;</button>
  </div>
</template>

<script setup lang="ts">
import {  PropType } from "vue";
import { ICity } from "@/types/city";

defineProps({
  city: {
    type: Object as PropType<ICity>,
    required: true
  }
})

defineEmits<{
  (e: 'delete:city', city: ICity): void
}>()

const dragStart = (e: DragEvent, city: ICity) => {
  if (e.dataTransfer && e.target instanceof HTMLElement) {
    e.target.style.opacity = '0.4'
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.dropEffect = 'move'
    e.dataTransfer.setData('itemId', city.lat + ':' + city.lon)
  }
}

const dragEnd = (e: DragEvent) => {
  if (e.target instanceof HTMLElement) e.target.style.opacity = '1'
}
</script>
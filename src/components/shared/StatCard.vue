<template>
  <div
      class="bg-white shadow-lg rounded-xl p-3 mx-1 flex items-center justify-between space-x-4 h-full w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">

    <!-- Contenido -->
    <div class="flex flex-col">
      <p class="text-3xl font-semibold text-gray-900">{{ value }}</p>
      <h3 class="text-lg text-gray-500">{{ title }}</h3>
      <div v-if="change !== '' && description !== ''">
        <p :class="isPositive ? 'text-green-500' : 'text-red-500'" class="text-md  flex items-center">
          <span v-if="isPositive">▲</span>
          <span v-else>▼</span>
          {{ change }} {{ description }}
        </p>

      </div>
    </div>
    <!-- Icono -->
    <div :class="`${background} rounded-full p-3 flex items-center justify-center`">
      <i :class="`pi ${icon}`" style="font-size: 1.5rem"></i>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  title: String,
  value: [String, Number],
  description: String,
  icon: String,
  change: String,
  isPositive: Boolean,
  background: String
});
</script>

<style scoped>

</style>
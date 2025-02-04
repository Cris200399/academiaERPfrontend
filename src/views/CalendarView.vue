<template>
  <div class="h-screen flex flex-col">
    <h1 class="text-4xl text-center">Calendario</h1>
    <div class="flex-1 min-h-0">
      <CalendarComponent class="h-full w-full" />
    </div>
  </div>
</template>

<script setup>
import CalendarComponent from "@/components/calendar/CalendarComponent.vue";
</script>

<style scoped>
</style>
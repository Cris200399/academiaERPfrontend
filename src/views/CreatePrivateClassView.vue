<script setup>
import { ref } from 'vue';

const selectedStudents = ref([]);

const students = [
  { name: 'Student 1', code: '1' },
  { name: 'Student 2', code: '2' },
  { name: 'Student 3', code: '3' },
  { name: 'Student 4', code: '4' },
  { name: 'Student 5', code: '5' },
  { name: 'Student 6', code: '6' },
  { name: 'Student 7', code: '7' },
  { name: 'Student 8', code: '8' },
  { name: 'Student 9', code: '9' },
  { name: 'Student 10', code: '10' },
  { name: 'Student 11', code: '11' },
  { name: 'Student 12', code: '12' },
  { name: 'Student 13', code: '13' },
  { name: 'Student 14', code: '14' },
  { name: 'Student 15', code: '15' },
  { name: 'Student 16', code: '16' },
  { name: 'Student 17', code: '17' },
  { name: 'Student 18', code: '18' },
  { name: 'Student 19', code: '19' },
  { name: 'Student 20', code: '20' },
]

</script>

<template>
  <div class="card flex justify-center">
    <MultiSelect v-model="selectedStudents" display="chip" :options="students" optionLabel="name" filter placeholder="Selecciona estudiantes" :selectionLimit="4" class="w-full md:w-80" />
  </div>
  {{ selectedStudents }}
</template>

<style scoped>

</style>
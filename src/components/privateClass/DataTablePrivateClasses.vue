<template>
  <div class="card">
    <DataTable v-model:filters="filters" v-model:expandedRows="expandedRows" :value="privateClasses"
               tableStyle="min-width: 60rem"
               :globalFilterFields="['title']" :loading="loading">
      <template #header>
        <div class="flex justify-end">
          <IconField>
            <InputIcon>
              <i class="pi pi-search"/>
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Buscar"/>
          </IconField>
        </div>
      </template>
      <template #empty>
        <div class="text-center">
          <p>No hay clases particulares registradas</p>
        </div>
      </template>
      <Column expander style="width: 5rem"/>
      <Column field="title" header="Título">
        <template #body="{data}">
          {{ data.title ? data.title : 'Clase Particular' }}
        </template>
      </Column>
      <Column field="date" header="Fecha">
        <template #body="{data}">
          {{ formatCustomDate(data.date) }}
        </template>
      </Column>
      <Column field="startTime" header="Hora de Inicio"></Column>
      <Column field="endTime" header="Hora de Fin"></Column>
      <Column header="Alumnos">
        <template #body="slotProps">
          <div v-for="studentId in slotProps.data.students" :key="studentId">
            {{ studentId }}
          </div>
        </template>
      </Column>

      <template #expansion="slotProps">
        <div class="ml-44">
          <h2 class="text-2xl mb-2">Detalles de la Clase</h2>
          <p>Fecha: {{ formatCustomDate(slotProps.data.date) }}</p>
          <p>Hora de inicio: {{ slotProps.data.startTime }}</p>
          <p>Hora de fin: {{ slotProps.data.endTime }}</p>
          <p v-if="slotProps.data.title">Título: {{ slotProps.data.title }}</p>
          <p>Alumnos:</p>
          <ul>
            <li v-for="studentId in slotProps.data.students" :key="studentId">
              {{ getStudentName(studentId) }}
            </li>
          </ul>
        </div>
      </template>

    </DataTable>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getPrivateClassesService} from "@/services/privateClassService";
import PrivateClass from "@/models/privateClass";
import DataTable from "primevue/datatable";
import {FilterMatchMode} from "@primevue/core/api";
import {formatCustomDate} from "@/utils/formatCustomDate"; // Importa la función de formateo de fecha

const privateClasses = ref([]);
const expandedRows = ref([]);
const loading = ref(true);
const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS}, // Cambiado a CONTAINS para búsqueda más flexible
  title: {value: null, matchMode: FilterMatchMode.CONTAINS},
});

onMounted(async () => {
  await getPrivateClasses();
  loading.value = false;
});

async function getPrivateClasses() {
  const privateClassesResponse = await getPrivateClassesService();
  privateClassesResponse.forEach(privateClass => {
    privateClasses.value.push(new PrivateClass(privateClass));
  });
}


</script>

<style scoped>

</style>
<template>
  <div class="card">
    <DataTable v-model:filters="filters" v-model:expandedRows="expandedRows" :value="privateClasses"
               tableStyle="min-width: 60rem"
               :globalFilterFields="['title', 'students.name', 'students.lastName']" :loading="loading">
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
      <Column field="title" header="Título" v-if="showTitleColumn"></Column>
      <Column field="date" header="Fecha">
        <template #body="{data}">
          {{ formatCustomDate(data.date) }}
        </template>
      </Column>
      <Column field="startTime" header="Hora de Inicio"></Column>
      <Column field="endTime" header="Hora de Fin"></Column>
      <Column header="Alumnos">
        <template #body="{data}">
          <div v-for="student in data.students" :key="student._id">
            {{ student.name }} {{ student.lastName }}
          </div>
        </template>
      </Column>

      <template #expansion="slotProps">
        <div class="ml-44">
          <h3 class="text-xl mt-4">Pagos</h3>
          <DataTable :value="slotProps.data.payments" v-if="slotProps.data.payments.length > 0">

            <Column header="Alumno">
              <template #body="slotProps">
                {{ slotProps.data.student.name }} {{ slotProps.data.student.lastName }}
              </template>
            </Column>

            <Column field="date" header="Fecha de Pago">
              <template #body="{data}">
                {{ formatCustomDate(data.date) }}
              </template>
            </Column>
            <Column field="amount" header="Monto">
              <template #body="{data}">
                {{ formatCurrency(data.amount) }}
              </template>
            </Column>
            <Column field="paymentMethod" header="Método(s) de Pago">
              <template #body="{data}">
                {{ StudentGroupPaymentItem.getPaymentsMethods(data.paymentMethod) }}
              </template>
            </Column>
          </DataTable>
          <p v-else>No hay pagos registrados para esta clase.</p>
        </div>
      </template>

    </DataTable>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

import DataTable from "primevue/datatable";
import {FilterMatchMode} from "@primevue/core/api";
import {formatCustomDate} from "@/utils/formatCustomDate";
import {getPrivateClassesAndPaymentsService} from "@/services/privateClassAndPaymentsService";
import PrivateClassAndPayment from "@/models/privateClassAndPayment";
import {formatCurrency} from "@/utils/formatCurrency";
import StudentGroupPaymentItem from "@/models/StudentGroupPaymentItem";

const privateClasses = ref([]);
const expandedRows = ref([]);
const loading = ref(true);
const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  title: {value: null, matchMode: FilterMatchMode.CONTAINS},
  'students.name': {value: null, matchMode: FilterMatchMode.CONTAINS},
  'students.lastName': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const showTitleColumn = ref(true);

onMounted(async () => {
  await getPrivateClasses();
  loading.value = false;
});

async function getPrivateClasses() {
  const privateClassesResponse = await getPrivateClassesAndPaymentsService();
  privateClassesResponse.forEach(privateClassAndPayment => {
    privateClasses.value.push(new PrivateClassAndPayment(privateClassAndPayment));
  });

  showTitleColumn.value = privateClasses.value.some(item => item.title);
}

</script>

<style scoped>

</style>
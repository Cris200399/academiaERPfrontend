<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DatePicker from 'primevue/datepicker';

import {onMounted, ref, watch} from 'vue';
import {FilterMatchMode, FilterOperator} from '@primevue/core/api';


import {getStudentService, getStudentsService} from "@/services/studentService";
import {getGroupsService} from "@/services/groupService";
import ChangeStudentStatusButton from "@/components/students/DeleteStudentButton.vue";
import Student from "@/models/student";
import EditStudentDialog from "@/components/students/EditStudentDialog.vue";
import ProfileStudentDialog from "@/components/students/ProfileStudentDialog.vue";
import {formatDate} from "@/utils/formatDate";
import {getPaymentStatusLabel, getPaymentStatusSeverity} from "@/constants/paymentStatusFunctions";

const students = ref([]);
const groupNames = ref();

// eslint-disable-next-line no-undef
const emit = defineEmits(['studentDeleted']);
// eslint-disable-next-line no-undef
const props = defineProps({
  newStudentAdded: Object
});

let groups;

const statuses = ref(['activo', 'inactivo']);

const paymentStatuses = ref(['al_día', 'por_vencer', 'vencido', 'sin_pago']);

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
  lastName: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
  group: {value: null, matchMode: FilterMatchMode.IN},
  gender: {value: null, matchMode: FilterMatchMode.IN},
  phone: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  address: {value: null, matchMode: FilterMatchMode.CONTAINS},
  dateOfBirth: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
  age: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
  dni: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  status: {value: null, matchMode: FilterMatchMode.EQUALS},
});


const loading = ref(true);
onMounted(async () => {
  const studentsResponseData = await getStudentsService();


  studentsResponseData.map((student) => {
    students.value.push(
        new Student(
            student
        )
    );
  });

  groups = await getGroupsService();
  groupNames.value = groups.map(g => (
      g.name
  ));

  loading.value = false;
});


function handleStudentStatusChanged(id) {
  const index = students.value.findIndex(student => student.id === id);
  students.value[index].status = students.value[index].status === 'activo' ? 'inactivo' : 'activo';
  // emit('studentDeleted');
}

function handleStudentAdded(newStudent) {
  newStudent = new Student(newStudent);
  students.value.push(newStudent);
}

watch(() => props.newStudentAdded, (newStudent) => {
  if (newStudent) {
    handleStudentAdded(newStudent);
  }
});

async function handleStudentUpdated(studentId) {
  const newStudent = await getStudentService(studentId);
  const index = students.value.findIndex(student => student.id === studentId);
  students.value[index] = new Student(newStudent);
}

const getSeverity = (status) => {
  switch (status) {
    case 'activo':
      return 'success';
    case 'inactivo':
      return 'danger';
  }
}
</script>


<template>
  <DataTable
      v-model:filters="filters"
      :value="students"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="menu"
      :loading="loading"
      :globalFilterFields="['name', 'lastName', 'group', 'dni', 'age', 'phone', 'dateOfBirth']"
      scrollable
      removable-sort
      row-hover
      scrollHeight="400px"
  >
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

    <template #empty> No se encontraron alumnos</template>

    <template #loading>
      <ProgressSpinner/>
    </template>

    <Column field="status" header="Estado" style="min-width: 100px; max-width: 100px">
      <template #body="{ data }">
        <Tag :value="data.status.charAt(0).toUpperCase() + data.status.slice(1)" :severity="getSeverity(data.status)"/>
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Selecciona uno"
                style="min-width: 12rem" :showClear="true">
          <template #value="slotProps">
            <Tag v-if="slotProps.value" :value="slotProps.value.charAt(0).toUpperCase() + slotProps.value.slice(1)"
                 :severity="getSeverity(slotProps.value)"/>
            <span v-else>{{ slotProps.placeholder }}</span>
          </template>
          <template #option="slotProps">
            <Tag :value="slotProps.option.charAt(0).toUpperCase() + slotProps.option.slice(1)"
                 :severity="getSeverity(slotProps.option)"/>
          </template>
        </Select>
      </template>
    </Column>

    <Column field="dni" header="DNI" style="min-width: 5rem">
      <template #body="{ data }">
        {{ data.dni }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                   placeholder="Buscar por DNI"/>
      </template>
    </Column>

    <Column field="name" header="Nombre(s)" style="min-width: 5rem">
      <template #body="{ data }">
        {{ data.name }}
      </template>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" placeholder="Buscar por nombre(s)"/>
      </template>
    </Column>

    <Column field="lastName" header="Apellido(s)" style="min-width: 5rem">
      <template #body="{ data }">
        {{ data.lastName }}
      </template>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text"
                   placeholder="Buscar por apellidos(s)"/>
      </template>
    </Column>


    <Column header="Grupo" filterField="group" :show-filter-match-modes="false" style="min-width: 5rem">
      <template #body="{ data }">
        <div class="flex items-center gap-2">
          <span>{{ data.group }}</span>
        </div>
      </template>

      <template #filter="{ filterModel }">
        <MultiSelect v-model="filterModel.value" :options="groupNames" placeholder="Todos"
                     style="min-width: 14rem" :maxSelectedLabels="1">
          <template #option="slotProps">
            <div class="flex items-center gap-2">
              <span>{{ slotProps.option }}</span>
            </div>
          </template>
        </MultiSelect>
      </template>

    </Column>

    <Column field="dateOfBirth" dataType="date" header="F. Nacimiento"
            style="min-width: 110px; max-width: 110px">
      <template #body="{ data }">
        {{ formatDate(data.dateOfBirth) }}
      </template>
      <template #filter="{ filterModel }">
        <DatePicker v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="mm/dd/yyyy"/>
      </template>
    </Column>

    <Column field="age" header="Edad" :sortable="true" dataType="numeric" style="width: 1rem">
      <template #body="{ data }">
        {{ data.age }}
      </template>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" placeholder="Buscar por Edad"/>
      </template>
    </Column>


    <Column field="phone" header="#Celular" style="min-width: 5rem">
      <template #body="{ data }">
        {{ data.phone }}
      </template>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text"
                   placeholder="Buscar por Número"/>
      </template>
    </Column>

    <Column header="Estado de Pago" field="paymentStatus" :filterMenuStyle="{ width: '14rem' }" style="min-width: 4rem">
      <template #body="{ data }">
        <Tag :value="getPaymentStatusLabel(data.paymentStatus)"
             :severity="getPaymentStatusSeverity(data.paymentStatus)"/>
      </template>
      <template #filter="{ filterModel }">
        <Select v-model="filterModel.value" :options="paymentStatuses" placeholder="Selecciona uno" showClear>
          <template #option="slotProps">
            <Tag :value="slotProps.option" :severity="getPaymentStatusSeverity(slotProps.option)"/>
          </template>
        </Select>
      </template>
    </Column>


    <Column header="Opciones" style="min-width: 5rem">
      <template #body="{ data }">
        <div class="flex gap-2">
          <EditStudentDialog @studentUpdated="handleStudentUpdated" :student="data"/>
          <ChangeStudentStatusButton :student="data" @studentStatusChanged="handleStudentStatusChanged"/>
          <ProfileStudentDialog :student="data" @updateImage="handleStudentUpdated"/>
        </div>
      </template>
    </Column>


  </DataTable>

</template>
<style scoped>


</style>
<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import {onMounted, ref, watch} from 'vue';
import {FilterMatchMode, FilterOperator} from '@primevue/core/api';


import {getStudentsService} from "@/services/studentService";
import {getGroupsService} from "@/services/groupService";
import DeleteStudentButton from "@/components/students/DeleteStudentButton.vue";
import Student from "@/models/student";
import EditStudentDialog from "@/components/students/editStudentDialog.vue";
import {genderOptions} from "@/constants/genderOptions";

// import EditStudentSpeedDial from "@/components/students/EditStudentSpeedDial.vue";


const students = ref([]);
const groupNames = ref();

// eslint-disable-next-line no-undef
const emit = defineEmits(['studentDeleted']);
// eslint-disable-next-line no-undef
const props = defineProps({
  newStudentAdded: Object
});

let groups;

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
  dni: {value: null, matchMode: FilterMatchMode.STARTS_WITH}
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


function handleStudentDeleted(id) {
  students.value = students.value.filter(student => student.id !== id);
  emit('studentDeleted');
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

function handleStudentUpdated(updatedStudent) {
  updatedStudent = new Student(updatedStudent);
  const index = students.value.findIndex(student => student.id === updatedStudent.id);
  students.value[index] = updatedStudent;
}

</script>


<template>
  <div class="card">
    <DataTable
        v-model:filters="filters"
        :value="students"
        paginator
        :rows="10"
        dataKey="id"
        filterDisplay="menu"
        :loading="loading"
        :globalFilterFields="['name', 'lastName', 'group', 'gender', 'dni', 'age', 'phone', 'address', 'dateOfBirth']"
        scrollable
        show-gridlines
        removable-sort
        scroll-height="800px"
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

      <Column field="name" header="Nombre" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" placeholder="Buscar por Nombre"/>
        </template>
      </Column>

      <Column field="lastName" header="Apellido" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.lastName }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text"
                     placeholder="Buscar por Apellido"/>
        </template>
      </Column>


      <Column header="Grupo" filterField="group" :show-filter-match-modes="false" style="min-width: 14rem">
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

      <Column field="dateOfBirth" :sortable="true" dataType="date" header="Fecha de Nacimiento" style="min-width: 15rem">
        <template #body="{ data }">
          {{ data.dateOfBirth }}
        </template>
      </Column>

      <Column field="age" header="Edad" :sortable="true" dataType="numeric" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.age }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" placeholder="Buscar por Edad"/>
        </template>
      </Column>


      <Column field="gender" header="Género" filterField="gender" :show-filter-match-modes="false"
              style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.gender }}
        </template>
        <template #filter="{ filterModel }">
          <MultiSelect v-model="filterModel.value" :options="genderOptions" placeholder="Todos"
                       style="min-width: 14rem" :maxSelectedLabels="1">
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>

      <Column field="phone" header="Número de Celular" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.phone }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text"
                     placeholder="Buscar por Número"/>
        </template>
      </Column>

      <Column field="address" header="Dirección" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.address }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                     placeholder="Buscar por Dirección"/>
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

      <Column header="Opciones" style="min-width: 5rem">
        <template #body="{ data }">
          <div class="flex gap-2">
            <!--            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editStudent(data)"/>-->
            <EditStudentDialog @studentUpdated="handleStudentUpdated" :student="data"/>
            <DeleteStudentButton :data="data" @studentDeleted="handleStudentDeleted"/>
            <!--            <EditStudentSpeedDial/>-->
          </div>
        </template>
      </Column>


    </DataTable>
  </div>

</template>
<style scoped>


</style>
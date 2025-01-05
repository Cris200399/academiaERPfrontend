<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import {ref, onMounted} from 'vue';
import {FilterMatchMode} from '@primevue/core/api';

import {getStudents} from "@/services/studentService";
import {getGroups} from "@/services/groupService";


const students = ref();
const groupNames = ref();


const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  lastName: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  group: {value: null, matchMode: FilterMatchMode.IN},
  gender: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  phone: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  address: {value: null, matchMode: FilterMatchMode.CONTAINS},
  age: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  dni: {value: null, matchMode: FilterMatchMode.STARTS_WITH}
});


const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
const loading = ref(true);

onMounted(async () => {
  students.value = await getStudents();

  students.value.forEach(student => {
    student.group = student.group.name;
    student.age = getAge(student.dateOfBirth);
  });

  const groups = await getGroups();
  groupNames.value = groups.map(g => (
      g.name
  ));

  loading.value = false;
});

function getAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDay() < birthDate.getDay())) {
    age--;
  }
  return age;
}


const getSeverity = (status) => {
  switch (status) {
    case 'unqualified':
      return 'danger';

    case 'qualified':
      return 'success';

    case 'new':
      return 'info';

    case 'negotiation':
      return 'warn';

    case 'renewal':
      return null;
  }
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
        filterDisplay="row"
        :loading="loading"
        :globalFilterFields="['name', 'lastName', 'group.name', 'status', 'gender', 'dni']"
        scrollable
        scroll-height="600px"
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

      <template #loading> Cargando datos de alumnos.</template>

      <Column field="name" header="Nombre" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Buscar por Nombre"/>
        </template>
      </Column>

      <Column field="lastName" header="Apellido" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.lastName }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                     placeholder="Buscar por Apellido"/>
        </template>
      </Column>


      <Column header="Grupo" filterField="group" :showFilterMenu="false" style="min-width: 14rem">
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <span>{{ data.group }}</span>
          </div>
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="groupNames"
                       optionLabel="" placeholder="Todos" style="min-width: 14rem" :maxSelectedLabels="1">
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>

      </Column>

      <Column field="age" header="Edad" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.age }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                     placeholder="Buscar por Edad"/>
        </template>
      </Column>

      <Column field="gender" header="Género" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.gender }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                     placeholder="Buscar por Género"/>
        </template>
      </Column>

      <Column field="phone" header="Número de Celular" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.phone }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
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
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editStudent(data)"/>
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteStudent(data)"/>
          </div>
        </template>
      </Column>


    </DataTable>
  </div>

</template>

<style scoped>

</style>
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
  name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  lastName: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  group: {value: null, matchMode: FilterMatchMode.IN},
  gender: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  phone: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  address: {value: null, matchMode: FilterMatchMode.CONTAINS},
  dateOfBirth: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
  age: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  dni: {value: null, matchMode: FilterMatchMode.STARTS_WITH}
});


const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
const loading = ref(true);

onMounted(async () => {
  const studentsResponseData = await getStudentsService();


  studentsResponseData.map((student) => {
    students.value.push(
        new Student({
              id: student._id,
              name: student.name,
              lastName: student.lastName,
              address: student.address,
              email: student.email,
              gender: student.gender,
              dateOfBirth: student.dateOfBirth,
              phone: student.phone,
              group: student.group,
              dni: student.dni,
            }
        )
    );
  });

  students.value.forEach(student => {
    formatStudent(student);
  });

  groups = await getGroupsService();
  groupNames.value = groups.map(g => (
      g.name
  ));

  loading.value = false;
});

function formatStudent(student) {
  student.group = student.group.name;
  student.age = getAge(student.dateOfBirth);
  student.dateOfBirth = new Date(student.dateOfBirth).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

}

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

function getGender(gender) {
  switch (gender) {
    case 'male':
      return 'Masculino';

    case 'female':
      return 'Femenino';

    default:
      return 'Otro';
  }
}

function handleStudentDeleted(id) {
  students.value = students.value.filter(student => student.id !== id);
  emit('studentDeleted');
}

function handleStudentAdded(newStudent) {
  formatStudent(newStudent);
  students.value.push(newStudent);
}

watch(() => props.newStudentAdded, (newStudent) => {
  if (newStudent) {
    handleStudentAdded(newStudent);
  }
});

function handleStudentUpdated(updatedStudent) {
  const index = students.value.findIndex(student => student.id === updatedStudent._id);
  formatUpdatedStudent(updatedStudent);
  students.value[index] = updatedStudent;
}

function formatUpdatedStudent(updatedStudent) {
  updatedStudent.id = updatedStudent._id;
  updatedStudent.group = groups.find(group => group._id === updatedStudent.group).name;
  updatedStudent.age = getAge(updatedStudent.dateOfBirth);
  updatedStudent.dateOfBirth = new Date(updatedStudent.dateOfBirth).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
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
        :globalFilterFields="['name', 'lastName', 'group', 'gender', 'dni', 'age', 'phone', 'address']"
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


      <Column header="Grupo" filterField="group" style="min-width: 14rem">
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

      <Column field="dateOfBirth" sortable dataType="date" header="Fecha de Nacimiento" style="min-width: 15rem">
        <template #body="{ data }">
          {{ data.dateOfBirth }}
        </template>
      </Column>

      <Column field="age" header="Edad" sortable style="min-width: 5rem">
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
          {{ getGender(data.gender) }}
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
<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import {ref, onMounted} from 'vue';
import {FilterMatchMode} from '@primevue/core/api';

import {getStudents} from "@/services/studentService";
import {getGroups} from "@/services/groupService";

const customers = ref();
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
  dni: {value: null, matchMode: FilterMatchMode.STARTS_WITH}
});
const representatives = ref([
  {name: 'Amy Elsner', image: 'amyelsner.png'},
  {name: 'Anna Fali', image: 'annafali.png'},
  {name: 'Asiya Javayant', image: 'asiyajavayant.png'},
  {name: 'Bernardo Dominic', image: 'bernardodominic.png'},
  {name: 'Elwin Sharvill', image: 'elwinsharvill.png'},
  {name: 'Ioni Bowcher', image: 'ionibowcher.png'},
  {name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png'},
  {name: 'Onyama Limba', image: 'onyamalimba.png'},
  {name: 'Stephen Shaw', image: 'stephenshaw.png'},
  {name: 'XuXue Feng', image: 'xuxuefeng.png'}
]);


const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
const loading = ref(true);

onMounted(async () => {
  const data = [
    {
      id: 1,
      name: 'John Doe',
      country: {name: 'USA', code: 'us'},
      representative: {name: 'Amy Elsner', image: 'amyelsner.png'},
      status: 'qualified',
      verified: true,
      date: '2023-01-01'
    },
    {
      id: 2,
      name: 'Jane Smith',
      country: {name: 'Canada', code: 'ca'},
      representative: {name: 'Anna Fali', image: 'annafali.png'},
      status: 'new',
      verified: false,
      date: '2023-02-01'
    }
  ];

  students.value = await getStudents();

  students.value.forEach(student => {
    student.group = student.group.name;
  });

  const groups = await getGroups();
  groupNames.value = groups.map(g => (
      g.name
  ));

  customers.value = getCustomers(data);
  loading.value = false;
});

const getCustomers = (data) => {
  return [...(data || [])].map((d) => {
    d.date = new Date(d.date);

    return d;
  });
};

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


      <!--      <Column field="status" header="Status" :showFilterMenu="false" style="min-width: 12rem">-->
      <!--        <template #body="{ data }">-->
      <!--          <Tag :value="data.status" :severity="getSeverity(data.status)"/>-->
      <!--        </template>-->
      <!--        <template #filter="{ filterModel, filterCallback }">-->
      <!--          <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One"-->
      <!--                  style="min-width: 12rem" :showClear="true">-->
      <!--            <template #option="slotProps">-->
      <!--              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)"/>-->
      <!--            </template>-->
      <!--          </Select>-->
      <!--        </template>-->
      <!--      </Column>-->

      <!--      <Column field="status" header="Status" :showFilterMenu="false" style="min-width: 12rem">-->
      <!--        <template #body="{ data }">-->
      <!--          <Tag :value="data.status" :severity="getSeverity(data.status)"/>-->
      <!--        </template>-->
      <!--        <template #filter="{ filterModel, filterCallback }">-->
      <!--          <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One"-->
      <!--                  style="min-width: 12rem" :showClear="true">-->
      <!--            <template #option="slotProps">-->
      <!--              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)"/>-->
      <!--            </template>-->
      <!--          </Select>-->
      <!--        </template>-->
      <!--      </Column>-->

      <!--      <Column field="status" header="Status" :showFilterMenu="false" style="min-width: 12rem">-->
      <!--        <template #body="{ data }">-->
      <!--          <Tag :value="data.status" :severity="getSeverity(data.status)"/>-->
      <!--        </template>-->
      <!--        <template #filter="{ filterModel, filterCallback }">-->
      <!--          <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One"-->
      <!--                  style="min-width: 12rem" :showClear="true">-->
      <!--            <template #option="slotProps">-->
      <!--              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)"/>-->
      <!--            </template>-->
      <!--          </Select>-->
      <!--        </template>-->
      <!--      </Column>-->

      <!--      <Column field="status" header="Status" :showFilterMenu="false" style="min-width: 12rem">-->
      <!--        <template #body="{ data }">-->
      <!--          <Tag :value="data.status" :severity="getSeverity(data.status)"/>-->
      <!--        </template>-->
      <!--        <template #filter="{ filterModel, filterCallback }">-->
      <!--          <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One"-->
      <!--                  style="min-width: 12rem" :showClear="true">-->
      <!--            <template #option="slotProps">-->
      <!--              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)"/>-->
      <!--            </template>-->
      <!--          </Select>-->
      <!--        </template>-->
      <!--      </Column>-->

      <!--      <Column field="status" header="Status" :showFilterMenu="false" style="min-width: 12rem">-->
      <!--        <template #body="{ data }">-->
      <!--          <Tag :value="data.status" :severity="getSeverity(data.status)"/>-->
      <!--        </template>-->
      <!--        <template #filter="{ filterModel, filterCallback }">-->
      <!--          <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One"-->
      <!--                  style="min-width: 12rem" :showClear="true">-->
      <!--            <template #option="slotProps">-->
      <!--              <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)"/>-->
      <!--            </template>-->
      <!--          </Select>-->
      <!--        </template>-->
      <!--      </Column>-->

      <!--      <Column field="verified" header="Verified" dataType="boolean" style="min-width: 6rem">-->
      <!--        <template #body="{ data }">-->
      <!--          <i class="pi"-->
      <!--             :class="{ 'pi-check-circle text-green-500': data.verified, 'pi-times-circle text-red-400': !data.verified }"></i>-->
      <!--        </template>-->
      <!--        <template #filter="{ filterModel, filterCallback }">-->
      <!--          <Checkbox v-model="filterModel.value" :indeterminate="filterModel.value === null" binary-->
      <!--                    @change="filterCallback()"/>-->
      <!--        </template>-->
      <!--      </Column>-->

    </DataTable>
  </div>

</template>

<style scoped>

</style>
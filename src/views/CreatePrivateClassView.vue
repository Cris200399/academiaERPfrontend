<script setup>
import {onMounted, ref} from 'vue';
import {getStudentsService} from "@/services/studentService";
import Student from "@/models/student";
import MultiSelect from 'primevue/multiselect';
import FloatLabel from "primevue/floatlabel";
import DatePicker from 'primevue/datepicker';

const selectedStudents = ref([]);

const students = ref([]);
const date = ref();

const starTime = ref();
const endTime = ref();

onMounted(async () => {
  const studentsResponse = await getStudentsService();
  studentsResponse.forEach(student => {
    students.value.push(new Student(student));
  })
})

</script>

<template>
  <div class="card">
    <h2 class="text-3xl font-bold">Crear clase particular</h2>
  </div>
  <div class="card justify-start">
    <div class="mb-4">
      <label class="text-3xl">Seleccionar alumnos</label>
    </div>
    <div class="my-1">
      <FloatLabel class="w-full md:w-80" variant="on">
        <MultiSelect v-model="selectedStudents" display="chip" option-label="fullName" :options="students" filter
                     option-value="id"
                     :selectionLimit="4" class="w-full md:w-80">

          <template #option="slotProps">
            <span>{{ slotProps.option.getFullName() }}</span>
          </template>
        </MultiSelect>
        <label for="on_label">Seleccionar alumnos</label>
      </FloatLabel>
    </div>
    <div class="my-4 w-fit">
      <div class="mb-4">
        <label class="text-3xl">Seleccionar fecha</label>
      </div>
      <FloatLabel variant="on">
        <label for="on_label">Fecha</label>
        <DatePicker class="w-full" v-model="date" showButtonBar/>
      </FloatLabel>
    </div>

    <div class="my-4 w-52">
      <div class="mb-4">
        <label class="text-3xl">Hora de inicio</label>
      </div>
      <FloatLabel variant="on">
        <label for="on_label">Desde</label>
        <DatePicker class="w-full" v-model="starTime" timeOnly hourFormat="12" showButtonBar/>
      </FloatLabel>
    </div>

    <div class="my-4 w-52">
      <div class="mb-4">
        <label class="text-3xl">Hora fin</label>
      </div>
      <FloatLabel variant="on">
        <label for="on_label">Hasta</label>
        <DatePicker class="w-full" v-model="endTime" timeOnly hourFormat="12"/>
      </FloatLabel>
    </div>

  </div>
</template>

<style scoped>

</style>
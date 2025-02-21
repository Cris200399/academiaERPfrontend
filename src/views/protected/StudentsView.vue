<template>
  <div class="card bg-white shadow-md rounded-lg w-auto">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-4xl font-bold text-center">
          {{ totalStudents }}
        </div>
        <div class="text-xl font-semibold mt-2">
          Total de Alumnos
        </div>
      </div>
      <div class="flex items-end justify-center">
        <Button icon="pi pi-plus" class="text-lg" severity="success"
                @click="onVisibleAddStudentDialog"
                label="Agregar Alumno"/>
        <AddStudentDialog
            v-model:visible="visibleAddStudentDialog"
            @studentAdded='handleStudentAdded' @hideDialog="visibleAddStudentDialog = false"/>
      </div>
    </div>
  </div>
  <div class="dataTable mt-0 ml-2 overflow-x-auto">
    <StudentsDataTable
        @studentDeleted="handleStudentDeleted"
        :newStudentAdded='newStudentAdded'
    />
  </div>
</template>

<script setup>
import StudentsDataTable from '../../components/students/StudentsDataTable.vue';
import AddStudentDialog from "@/components/students/AddStudentDialog.vue";

import {getTotalStudentsService} from "@/services/studentService";

import {ref, onMounted} from 'vue';

const totalStudents = ref();

const visibleAddStudentDialog = ref(false);


const newStudentAdded = ref();

onMounted(async () => {
  totalStudents.value = await getTotalStudentsService();
});


function handleStudentDeleted() {
  totalStudents.value--;
}

function handleStudentAdded(newStudent) {
  totalStudents.value++;
  newStudentAdded.value = newStudent;
}

function onVisibleAddStudentDialog() {
  visibleAddStudentDialog.value = !visibleAddStudentDialog.value;
}

</script>

<style scoped>
.dataTable {
  max-width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}
</style>
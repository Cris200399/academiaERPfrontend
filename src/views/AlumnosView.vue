<template>
  <div class="card p-6 bg-white shadow-md rounded-lg ml-2">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-4xl font-bold">
          10
        </div>
        <div class="text-xl font-semibold mt-2">
          Total de Alumnos
        </div>
      </div>
      <div class="flex items-end justify-center">
        <AddStudentDialog></AddStudentDialog>
      </div>
    </div>
  </div>
  <div class="dataTable mt-0 ml-2">
    <DataTable></DataTable>
  </div>
</template>

<script setup>
import DataTable from '../components/DataTable.vue';
import AddStudentDialog from "@/components/AddStudentDialog.vue";
</script>

<style scoped>
.dataTable {
  max-width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}
</style>
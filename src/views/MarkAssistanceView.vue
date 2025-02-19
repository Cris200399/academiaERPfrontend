<script setup>
import {onMounted, ref} from "vue";
import {getGroupsService, getGroupWithStudentsService} from "@/services/groupService";
import Group from "@/models/group";
import Student from "@/models/student";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import Assistance from "@/models/assistance";
import {createAssistanceService} from "@/services/assistanceService";
import {useToast} from "primevue/usetoast";

const selectedStudent = ref();
const students = ref([]);

const groups = ref([]);
const selectedGroup = ref();

const dateAndTime = ref();
const toast = useToast();

onMounted(async () => {
  await getGroupsService().then(groupsResponseData => {
    groupsResponseData.map(group => {
      groups.value.push(
          new Group(group)
      )
    });
  });
});

async function onChangeGroup() {
  students.value = [];
  if (selectedGroup.value) {
    await getGroupWithStudentsService(selectedGroup.value.id).then(studentsResponseData => {
      studentsResponseData.members.map(student => {
        students.value.push(
            new Student(student)
        )
      });
    });
  }
}

async function submit() {
  const newAssistance = new Assistance(
      {
        student: selectedStudent.value.id,
        group: selectedGroup.value.id,
        date: dateAndTime.value,
        status: "Presente"
      });

  await createAssistanceService(newAssistance).then(() => {
    toast.add({
      severity: 'success',
      summary: 'Asistencia creada',
      detail: 'La asistencia ha sido creada correctamente',
      life: 1500
    });
    resetForm();
  }).catch(() => {
    toast.add({severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al crear la asistencia', life: 1500});
  });
}

function resetForm() {
  selectedStudent.value = null;
  students.value = [];
  selectedGroup.value = null;
  dateAndTime.value = null;
}

</script>

<template>
  <div class="card w-full text-center">
    <h2 class="text-3xl font-bold">Marcar asistencia</h2>
  </div>
  <div class="card">
    <div class="mt-4">
      <h2 class="text-4xl font-semibold mb-4">Seleccionar el grupo</h2>
      <Select v-model="selectedGroup" :options="groups" filter optionLabel="name" placeholder="Seleccionar grupo"
              @update:modelValue="onChangeGroup"
              class="w-full md:w-56">
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex items-center">
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
        </span>
        </template>
        <template #option="slotProps">
          <div class="flex items-center">
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Select>

    </div>
    <div v-if=" selectedGroup" class="mt-4">
      <h2 class="text-4xl font-semibold mb-4">Seleccionar el estudiante</h2>

      <Select v-model="selectedStudent" :options="students" filter optionLabel="name"
              placeholder="Seleccionar estudiante"
              class="w-full md:w-56">
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex items-center">
            <div>{{ slotProps.value.getFullName() }}</div>
          </div>
          <span v-else>{{ slotProps.placeholder }}</span>
        </template>
        <template #option="slotProps">
          <div class="flex items-center">
            <div>{{ slotProps.option.getFullName() }}</div>
          </div>
        </template>
      </Select>

      <div v-if="selectedStudent " class="mt-4">

        <div class="w-fit mb-4">
          <h2 class="text-4xl font-semibold mb-4">Seleccionar la fecha y hora</h2>
          <DatePicker id="datepicker-12h" v-model="dateAndTime" showTime hourFormat="12" fluid/>
        </div>
        <div class="mb-4 flex justify-center">
          <Button label="Crear asistencia" variant="outlined" class="w-2/4 text-3xl" @click="submit" icon="pi pi-check"
                  iconPos="left" severity="success" style="font-size: 1.5rem"/>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
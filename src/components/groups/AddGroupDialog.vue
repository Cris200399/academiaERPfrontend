<template>
  <Dialog v-model:visible="visible" modal @hide="resetForm" :draggable='false'>
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-10">Crear grupo</h1>
      <form @submit.prevent="handleSubmit">
        <!-- Nombre del Grupo -->
        <div class="mb-6">
          <label class="block text-xl font-bold mb-4">Nombre del Grupo</label>
          <input
              v-model="groupName"
              type="text"
              class="w-full p-3 rounded-lg border border-gray-200"
              placeholder="Ingresa el nombre del grupo"
          >
        </div>

        <!-- Descripción del Grupo-->
        <div class="mb-6">
          <label class="block text-xl font-bold mb-4">Descripción del Grupo</label>
          <Textarea auto-resize v-model="description"
                    class="w-full p-3 rounded-lg border border-gray-200"
                    placeholder="Ingresa una descripción del grupo"
          ></Textarea>
        </div>


        <!-- Días de repetición -->
        <div class="mb-6">
          <label class="block text-xl font-bold mb-4">Días de la semana</label>
          <div class="flex flex-wrap gap-2">
            <button
                v-for="day in days"
                :key="day"
                type="button"
                :class="[
              'px-4 py-2 rounded-full',
              selectedDays.includes(day)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800'
            ]"
                @click="toggleDay(day)"
            >
              {{ day }}
            </button>
          </div>
        </div>
        <!-- Max number of members -->
        <div class="mb-6">
          <label class="block text-xl font-bold mb-4">Cantidad máxima de alumnos</label>
          <InputNumber v-model="maxMembers" :min="0" :max="50" fluid/>
        </div>
        <!--              class="w-full p-3 rounded-lg border border-gray-200"-->

        <!-- Horario -->
        <div class="mb-6">
          <label class="block text-xl font-bold mb-4">Hora</label>
          <div class="flex flex-wrap items-center">
            <div class="mb-2 mr-4">Horas de clase:</div>

            <div class="flex items-center gap-4">
              <input
                  v-model="startTime"
                  type="time"
                  class="p-2 border rounded"
              >
              <span>a</span>
              <input
                  v-model="endTime"
                  type="time"
                  class="p-2 border rounded"
              >
            </div>
          </div>

        </div>

        <!-- Botones -->
        <div class="flex justify-center gap-2 mt-8">
          <div class="w-2/3 flex gap-2">

          <Button
              type="button"
              severity="info"
              class="w-2/5 px-2 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              @click="hideDialog"
              label="Cancelar"
              autofocus
          />
          <Button
              type="submit"
              severity="success"
              label="Crear"
              class="w-3/5 px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          />
          </div>

        </div>
      </form>
    </div>
  </Dialog>
</template>

<script setup>

import {ref} from 'vue'

import {createGroupService} from "@/services/groupService";
import {useToast} from "primevue/usetoast";
import Group from "@/models/group";


const visible = ref(false);

const toast = useToast();

const groupName = ref('');

const days = ref(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']);
const selectedDays = ref([]);
const startTime = ref('00:00');
const endTime = ref('23:00');
const description = ref('');
const maxMembers = ref();


// eslint-disable-next-line no-undef
const emit = defineEmits(['groupAdded', 'hideDialog']);


function toggleDay(day) {
  if (selectedDays.value.includes(day)) {
    selectedDays.value = selectedDays.value.filter(d => d !== day)
  } else {
    selectedDays.value.push(day)
  }
}

function resetForm() {
  groupName.value = '';
  description.value = '';
  maxMembers.value = null;
  selectedDays.value = [];
  startTime.value = '00:00';
  endTime.value = '23:00';
}

function hideDialog(){
  emit('hideDialog');
}

async function handleSubmit() {

  const newGroupFormat = new Group({
    name: groupName.value,
    description: description.value,
    daysOfWeek: selectedDays.value,
    startTime: startTime.value,
    endTime: endTime.value,
    maxMembers: maxMembers.value
  });

  try {
    const newGroupAddedResponse = await createGroupService(newGroupFormat);
    toast.add({severity: 'success', summary: 'Operación completa', detail: 'Grupo creado exitosamente', life: 2500});
    emit('groupAdded', newGroupAddedResponse);
    hideDialog();

  } catch (error) {
    console.log(error)
    toast.add({severity: 'error', summary: 'Error', detail: 'Ocurrió un error al crear el grupo', life: 2500});
  }

}
</script>

<style scoped>
</style>
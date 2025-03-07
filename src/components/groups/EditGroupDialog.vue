<template>
  <Dialog modal @hide="resetForm" :draggable='false'>
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-10">Editar grupo</h1>
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

        <!-- Descripción del Grupo -->
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
                selectedDays.includes(day) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
              ]"
                @click="toggleDay(day)"
            >
              {{ day }}
            </button>
          </div>
        </div>

        <!-- Cantidad máxima de alumnos -->
        <div class="mb-6">
          <label class="block text-xl font-bold mb-4">Cantidad máxima de alumnos</label>
          <InputNumber v-model="maxMembers" :min="0" :max="50" fluid/>
        </div>

        <!-- Horario -->
        <div class="mb-6">
          <label class="block text-xl font-bold mb-4">Hora</label>
          <div class="flex flex-wrap items-center">
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
        <div class="flex justify-end gap-4 mt-8">
          <button
              type="button"
              class="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              @click="emitHideDialog"
          >
            Cancelar
          </button>
          <button
              type="submit"
              class="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </Dialog>
</template>

<script setup>
import {ref} from 'vue';
import {updateGroupService} from '@/services/groupService';
import {useToast} from 'primevue/usetoast';
import Group from '@/models/group';

// Props para recibir datos del grupo a editar
// eslint-disable-next-line no-undef
const props = defineProps({
  groupData: {
    type: Group,
    required: true
  }
});

const toast = useToast();
const groupName = ref(props.groupData.name);
const description = ref(props.groupData.description);
const days = ref(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']);
const selectedDays = ref([...props.groupData.daysOfWeek]);
const startTime = ref(props.groupData.getStartTime());
const endTime = ref(props.groupData.getEndTime());
const maxMembers = ref(props.groupData.maxMembers);

// Emit para notificar cambios
// eslint-disable-next-line no-undef
const emit = defineEmits(['groupUpdated', 'hideEditDialog']);


function toggleDay(day) {
  if (selectedDays.value.includes(day)) {
    selectedDays.value = selectedDays.value.filter(d => d !== day);
  } else {
    selectedDays.value.push(day);
  }
}

function resetForm() {
  groupName.value = props.groupData.name;
  description.value = props.groupData.description;
  maxMembers.value = props.groupData.maxMembers;
  selectedDays.value = [...props.groupData.daysOfWeek];
  startTime.value = props.groupData.getStartTime();
  endTime.value = props.groupData.getEndTime();
}

async function handleSubmit() {
  const updatedGroup = new Group({
    name: groupName.value,
    description: description.value,
    daysOfWeek: selectedDays.value,
    startTime: startTime.value,
    endTime: endTime.value,
    maxMembers: maxMembers.value
  });

  try {
    const updatedGroupResponse = await updateGroupService(props.groupData.id, updatedGroup);
    toast.add({
      severity: 'success',
      summary: 'Operación completa',
      detail: 'Grupo actualizado exitosamente',
      life: 2500
    });
    emit('groupUpdated', new Group(updatedGroupResponse));
    emitHideDialog();
  } catch (error) {
    console.error(error);
    toast.add({severity: 'error', summary: 'Error', detail: 'Ocurrió un error al actualizar el grupo', life: 2500});
  }
}

function emitHideDialog() {
  emit('hideEditDialog');
}
</script>

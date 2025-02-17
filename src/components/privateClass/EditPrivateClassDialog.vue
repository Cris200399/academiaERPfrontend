<template>
  <Dialog header="Editar Clase" :visible="true" :closable="false" :style="{ width: '50vw' }"
          class="p-dialog-content rounded-lg shadow-md">

    <div class="flex gap-[20px] flex-wrap">
      <div class="w-full">
        <div class="field">
          <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
          <InputText v-model="title"
                     class="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     placeholder="Título de la clase"/>
        </div>
      </div>
      <div class="grow">
        <div class="field">
          <label for="date" class="block text-sm font-medium text-gray-700">Fecha</label>
          <DatePicker v-model="date"
                      class="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      :showIcon="true"/>
        </div>
      </div>
      <div class="grow">
        <div class="field">
          <label for="startTime" class="block text-sm font-medium text-gray-700">Hora de Inicio</label>
          <DatePicker v-model="startTime"
                      class="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      :timeOnly="true" hour-format="12"/>
        </div>
      </div>
      <div class="grow">
        <div class="field">
          <label for="endTime" class="block text-sm font-medium text-gray-700">Hora de Fin</label>
          <DatePicker v-model="endTime"
                      class="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      :timeOnly="true" hour-format="12"/>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2 p-4">
        <Button label="Cancelar" icon="pi pi-times" @click="closeDialog"
                class="p-button-text border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"/>
        <Button label="Guardar" icon="pi pi-check" @click="saveChanges"
                class="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 border-none"/>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DatePicker from "primevue/datepicker";
import {useToast} from "primevue/usetoast";
import PrivateClass from "@/models/privateClass";
import {formatDateTo24h} from "@/utils/formatDateTo24h";
import {patchPrivateClassService} from "@/services/privateClassService";


// eslint-disable-next-line no-undef
const emit = defineEmits(['closeDialog', 'updateClass']);
// eslint-disable-next-line no-undef
const props = defineProps({
  classData: {
    type: Object,
    required: true
  }
});

const title = ref('');
const date = ref(null);
const startTime = ref(null);
const endTime = ref(null);

const toast = useToast();

onMounted(() => {
  openDialog(props.classData);
});

function openDialog(classData) {
  title.value = classData.title;
  date.value = new Date(classData.date); // Asegúrate de que la fecha esté en formato válido
  startTime.value = new Date(`2000-01-01 ${classData.startTime}`); // Formato para timeOnly
  endTime.value = new Date(`2000-01-01 ${classData.endTime}`);   // Formato para timeOnly
}

function closeDialog() {
  emit('closeDialog');
}

async function saveChanges() {
  try {
    const updatedClass = new PrivateClass({
      title: title.value,
      date: date.value,
      startTime: formatDateTo24h(startTime.value),
      endTime: formatDateTo24h(endTime.value)
    })
    await patchPrivateClassService(props.classData.id, updatedClass);
    emit('updateClass');
    confirmToast();
    closeDialog();
  } catch (error) {
    console.error("Error al guardar cambios:", error);
    rejectToast();
  }
}


function confirmToast() {
  toast.add({severity: 'success', summary: 'Éxito', detail: 'Clase actualizada correctamente', life: 1500});
}

function rejectToast() {
  toast.add({severity: 'error', summary: 'Error', detail: 'No se ha actualizado la clase', life: 1500});
}

</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}

label {
  font-weight: 600;
  font-size: 1rem; /* Ajustado a un tamaño más normal */
}
</style>
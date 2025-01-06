<template>
  <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="handleClick"/>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { deleteStudentService } from "@/services/studentService";

import { useToast } from "primevue/usetoast";

const toast = useToast();

const confirm = useConfirm();

const emit = defineEmits(['studentDeleted']);

const props = defineProps({
  data: Object
});

function handleClick() {
  confirm.require({
    message: `Quieres eliminar a ${props.data.name}?`,
    header: 'Confirmación',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancelar',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Eliminar',
      severity: 'danger'
    },
    accept: () => {
      deleteStudentService(props.data.id);
      emit('studentDeleted', props.data.id);
      toast.add({ severity: 'success', summary: 'Confirmado', detail: 'Alumno Eliminado', life: 2500 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: `Rechazado eliminar a ${props.data.name}`, detail: 'Eliminación cancelada', life: 2500 });
    }
  });
}
</script>
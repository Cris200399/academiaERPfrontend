<template>
  <!-- This button is for changing the student status -->
  <Button v-tooltip.left="`Cambiar estado a ${getTextTooltipStatus()}`" icon="pi pi-sync" severity="help" rounded
          @click="handleClick"/>
</template>

<script setup>
import {useConfirm} from "primevue/useconfirm";
import {changeStudentStatusService} from "@/services/studentService";

import {useToast} from "primevue/usetoast";
import Student from "@/models/student";

const toast = useToast();

const confirm = useConfirm();

// eslint-disable-next-line no-undef
const emit = defineEmits(['studentStatusChanged']);

// eslint-disable-next-line no-undef
const props = defineProps({
  student: Student
});

function getTextTooltipStatus() {
  return (props.student.status === 'activo' ? 'inactivo' : 'activo');
}

async function handleClick() {
  confirm.require({
    message: `Quieres cambiar el estado de ${props.student.name}?`,
    header: 'Confirmación',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancelar',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Cambiar',
      severity: 'success'
    },
    accept: async () => {
      const response = await changeStudentStatusService(props.student.id, props.student.status === 'activo' ? 'inactivo' : 'activo');
      console.log(response);
      emit('studentStatusChanged', props.student.id);
      toast.add({severity: 'success', summary: 'Confirmado', detail: 'Estado cambiado', life: 1500});
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Cancelado',
        detail: 'No se ha cambiado el estado',
        life: 1500
      });
    }
  });
}
</script>
<template>
  <div class="justify-center">
    <Button type="button" icon="pi pi-ellipsis-h" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"/>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true"/>
  </div>
</template>

<script setup>
import {defineProps, ref} from "vue";

import {useToast} from "primevue/usetoast";
import {useConfirm} from "primevue/useconfirm";
import {deleteGroupService} from "@/services/groupService";

const props = defineProps({
  id: String
});

const menu = ref();
const toast = useToast();
const confirm = useConfirm();

const emit = defineEmits(['groupDeleted']);

const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          handleDelete(props.id);
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-upload'
      }
    ]
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};

const handleDelete = async (id) => {
  confirm.require({
    message: `Quieres eliminar el grupo`,
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
    accept: async () => {
      try {
        await deleteGroupService(id);
        toast.add({severity: 'success', summary: 'Exitoso', detail: 'EL grupo ha sido eliminado', life: 2000});
        emit('groupDeleted', id);
      } catch (e) {
        toast.add({severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el grupo', life: 2000});
      }
    },
    reject: () => {
      toast.add({severity: 'error', summary: 'Rejected', detail: 'Eliminación cancelada', life: 2000});
    }
  });
};
</script>

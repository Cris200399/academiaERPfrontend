<template>
  <div class="absolute top-5 right-5 cursor-pointer justify-center">
    <Button type="button" icon="pi pi-ellipsis-h" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"/>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true"/>
  </div>
  <EditGroupDialog v-model:visible="visibleEditDialog"
                   @groupUpdated="handleGroupUpdated"
                   @hideEditDialog="handleHideEditDialog" :groupData="groupData" />
</template>

<script setup>
import {ref} from "vue";

import {useToast} from "primevue/usetoast";
import {useConfirm} from "primevue/useconfirm";
import {deleteGroupService} from "@/services/groupService";
import EditGroupDialog from "@/components/groups/EditGroupDialog.vue";
import Group from "@/models/group";

// eslint-disable-next-line no-undef
const props = defineProps({
  id: String,
  groupData: Group
});

const menu = ref();
const toast = useToast();
const confirm = useConfirm();

// eslint-disable-next-line no-undef
const emit = defineEmits(['groupDeleted', 'groupUpdated']);

const visibleEditDialog = ref(false);

const items = ref([
  {
    label: 'Opciones',
    items: [
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          handleDelete(props.id);
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => {
          visibleEditDialog.value = true;
        }
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

function handleHideEditDialog(){
  visibleEditDialog.value = false;
}

function handleGroupUpdated(updatedGroup){
  emit('groupUpdated', updatedGroup);
}
</script>

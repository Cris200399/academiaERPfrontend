<template>
  <div class="relative z-index">
    <SpeedDial
        button-class="p-button-rounded p-button-secondary"
        :model="items" :radius="80" type="linear" direction="left"
               style="top: calc(50% - 2rem); right: 0"/>
  </div>
</template>


<script setup>
import {ref} from 'vue';
import {useToast} from 'primevue/usetoast';
import {useRouter} from 'vue-router';

const toast = useToast();
const router = useRouter();

const items = ref([
  {
    label: 'Add',
    icon: 'pi pi-pencil',
    command: () => {
      toast.add({severity: 'info', summary: 'Add', detail: 'Data Added', life: 3000});
    }
  },
  {
    label: 'Update',
    icon: 'pi pi-refresh',
    command: () => {
      toast.add({severity: 'success', summary: 'Update', detail: 'Data Updated', life: 3000});
    }
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      toast.add({severity: 'error', summary: 'Delete', detail: 'Data Deleted', life: 3000});
    }
  },
  {
    label: 'Upload',
    icon: 'pi pi-upload',
    command: () => {
      router.push('/fileupload');
    }
  },
  {
    label: 'Vue Website',
    icon: 'pi pi-external-link',
    command: () => {
      window.location.href = 'https://vuejs.org/'
    }
  }
])
</script>

<style scoped>
  .z-index {
    z-index: 1000;
  }
</style>

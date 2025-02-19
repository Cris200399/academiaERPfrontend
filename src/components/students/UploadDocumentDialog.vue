<script setup>
import {useToast} from 'primevue/usetoast'
import {ref} from "vue";
import Student from "@/models/student";
import {updateDocumentService} from "@/services/studentService";

const toast = useToast();
const visible = ref(false);
let file = null;
const pdfDocument = ref(null);

// eslint-disable-next-line no-undef
const props = defineProps({
  student: {
    type: Student,
    required: true
  }
});

// eslint-disable-next-line no-undef
const emit = defineEmits(['updateDocument']);

function onVisible() {
  visible.value = true;
}


function onFileSelect(event) {
  file = event.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    pdfDocument.value = e.target.result;
  };

  reader.readAsDataURL(file);
}

// Manejo de archivos
const onUpload = async () => {
  try {
    await updateDocumentService(props.student.id, file);
    toast.add({
      severity: 'success',
      summary: 'Archivo Subido',
      detail: 'El documento se ha subido correctamente',
      life: 3000
    })
    emit('updateDocument');
    hideDialog();

  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ha ocurrido un error al subir el documento',
      life: 3000
    })
  }
}

function hideDialog() {
  visible.value = false;
  pdfDocument.value = null;

}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <Button raised type="button" :label="(student.documentId ? 'Actualizar ' : 'Subir ') + 'DNI' " icon="pi pi-upload"
              class="p-button-success" @click="onVisible"/>
    </div>

    <Dialog
        v-model:visible="visible"
        header="Subir DNI"
        :draggable="false"
        modal
        :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        @hide="hideDialog"
    >

      <div class="flex flex-col items-center gap-6">
        <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
                    accept="application/pdf" :maxFileSize="1000000" chooseLabel="Seleccionar archivo"
                    invalidFileSizeMessage="Tamaño máximo: 1MB" invalidFileMessage="Solo archivos PDF"
                    class="p-button-outlined"/>
        <small class="block mt-2 text-gray-500">Tamaño máximo: 1MB. Solo archivos PDF.</small>
        <iframe v-if="pdfDocument"
                :src="pdfDocument"
                type="application/pdf"
                width="100%"
                height="500px"
                class="border rounded-lg"
        ></iframe>
      </div>

      <template #footer>
        <Button label="Cancelar" class="p-button-text" @click="hideDialog"/>
        <Button label="Guardar" class="p-button-text" @click="onUpload"/>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>

</style>


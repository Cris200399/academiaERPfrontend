<template>
  <div class="relative">
    <!-- Avatar con overlay al hacer hover -->
    <div class="relative group">
      <Avatar
          :image="image"
          size="xlarge"
          class="p-overlay-badge img-size"
          :pt="{ image: { class: 'rounded-full' } }"
      />
      <!-- Overlay con ícono de edición -->
      <div
          class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          @click="openDialog"
      >
        <i class="pi pi-pencil text-white text-xl"></i>
      </div>
    </div>

    <!-- Diálogo para subir imagen -->
    <Dialog
        v-model:visible="dialogVisible"
        header="Cambiar imagen"
        :modal="true"
        :style="{ width: '450px' }"
    >
      <div class="flex flex-col gap-4">
        <!-- Preview de la imagen -->
        <div v-if="previewImage" class="w-full flex justify-center">
          <img :src="previewImage" alt="Preview" class="max-w-[200px] rounded-full"/>
        </div>

        <!-- Input para subir archivo -->
        <FileUpload
            mode="basic"
            :auto="true"
            accept="image/*"
            :maxFileSize="1000000"
            @select="onFileSelect"
            chooseLabel="Seleccionar imagen"
            :customUpload="true"
            @uploader="handleFileUpload"
        />
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <Button
              label="Cancelar"
              @click="closeDialog"
              class="p-button-text"
          />
          <Button
              label="Guardar"
              @click="saveImage"
              :disabled="!selectedFile"
              :loading="loading"
          />
        </div>
      </template>
    </Dialog>

  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useToast} from 'primevue/usetoast';
import {getStudentProfileImageService, updateStudentProfileImageService} from "@/services/studentService";


// Props
// eslint-disable-next-line no-undef
const props = defineProps({
  studentId: {
    type: String,
    required: true
  },
  profileImageId: {
    type: String
  },
});

// Emits
// eslint-disable-next-line no-undef
const emit = defineEmits(['updateImage']);

// Composables
const toast = useToast();
const image = ref(null);

// Estado local
const dialogVisible = ref(false);
const selectedFile = ref(null);
const previewImage = ref(null);
const loading = ref(false);

// Métodos
const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  selectedFile.value = null;
  previewImage.value = null;
};

onMounted(() => {
  if (props.profileImageId) {
    getProfileImage();
  } else {
    image.value = 'src/assets/profileImageBlank.webp';
  }
});

const handleFileUpload = (event) => {
  selectedFile.value = event.files[0];
};

const onFileSelect = (event) => {
  const file = event.files[0];
  selectedFile.value = file;

  // Crear preview
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const saveImage = async () => {
  if (!selectedFile.value) return;

  loading.value = true;
  try {

    await updateStudentProfileImageService(props.studentId, selectedFile.value);

    // Emitir evento con la nueva imagen
    emit('updateImage', props.studentId);
    await getProfileImage();

    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Imagen actualizada correctamente',
      life: 1000
    });

    closeDialog();
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.message || 'No se pudo actualizar la imagen',
      life: 1000
    });
  } finally {
    loading.value = false;
  }
};

async function getProfileImage() {
  const blob = await getStudentProfileImageService(props.studentId);
  image.value = URL.createObjectURL(blob);
}

</script>

<style scoped>
.img-size {
  width: 100%;
  max-width: 200px;
  height: auto;
}
</style>
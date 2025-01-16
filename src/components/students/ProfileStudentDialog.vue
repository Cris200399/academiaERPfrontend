<template>
  <div>
    <!-- Botón para abrir el dialog -->
    <Button icon="pi pi-user" class="p-button-rounded" @click="onVisible"/>

    <Dialog
        v-model:visible="visible"
        modal
        :header="student.getFullName()"
        :draggable="false"
        :style="{ width: '50vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
      <div class="flex flex-col md:flex-row gap-2">
        <!-- Información Personal -->
        <div class="card w-full md:w-2/5">
          <div class="flex flex-col items-start content-start">
            <div class="flex flex-wrap justify-center w-full mb-5">

              <StudentAvatar :studentId="student.id" :profileImageId="student.profileImageId"/>
              <Divider/>

            </div>
            <div class="flex flex-col items-start justify-center">
              <div class="flex justify-content-between mb-3">
                <span class="material-icons">accessibility_new</span>
                <span class="label">Edad:</span>
                <span>{{ student.age + ' años' }}</span>
              </div>
              <div class="flex justify-content-between mb-3">
                <span class="material-icons">location_on</span>
                <span class="label">Dirección:</span>
                <span>{{ student.address }}</span>
              </div>
              <div class="flex justify-content-between mb-3">
                <span class="material-icons">wc</span>
                <span class="label">Género:</span>
                <span>{{ student.gender }}</span>
              </div>
              <div class="flex justify-content-between items-center mb-3">
                <span class="material-icons">cake</span>
                <span class="label">Fecha de Nacimiento:</span>
                <span>{{ student.dateOfBirth }}</span>
              </div>
              <div class="flex justify-content-between mb-3">
                <span class="material-icons">phone_iphone</span>
                <span class="label">Teléfono:</span>
                <span>{{ student.phone }}</span>
              </div>
              <div class="flex justify-content-between mb-3">
                <span class="material-icons">badge</span>
                <span class="label">DNI:</span>
                <span>{{ student.dni }}</span>
              </div>
              <div class="flex justify-content-between mb-3">
                <span class="material-icons">alternate_email</span>
                <span class="label">Email:</span>
                <span>{{ student.email }}</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Detalles Académicos -->
        <div class="card w-full md:w-4/5">
          <div class="mb-5">
            <h2 class="text-xl font-bold mb-3">Detalles del Estudiante</h2>

            <div class="grid">
              <div class="col-12 mb-3">
                <div class="flex items-center">
                  <span class="material-icons mr-2">groups</span>
                  <span class="details-label ">Grupo:</span>
                  <span>{{ student.group }}</span>
                </div>
              </div>
              <div v-if="student.guardian !== undefined">
                <h2 class="text-xl font-bold mb-3">Detalles del Apoderado</h2>

                <div class="col-12 mb-3">
                  <div class="flex items-center">
                    <span class="material-icons mr-2">account_circle</span>
                    <span class="details-label ">Nombre:</span>
                    <span>{{ student.guardian.name }}</span>
                  </div>
                </div>

                <div class="col-12 mb-3">
                  <div class="flex items-center">
                    <span class="material-icons">phone_iphone</span>
                    <span class="details-label ">Número de celular:</span>
                    <span>{{ student.guardian.phone }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Estadísticas Académicas -->
          <div class="mb-5">
            <h2 class="text-xl font-bold mb-3">Asistencia</h2>
            <div class="flex align-items-center justify-center">
              <Chart type="pie" :width="600" :data="chartData" :options="chartOptions"/>
            </div>
          </div>


          <div v-if="pdfUrl" class="mt-4">
            <h3 class="text-lg font-bold mb-2">DNI</h3>
            <div class="pdf-preview-container">
              <iframe
                  :src="pdfUrl"
                  type="application/pdf"
                  width="100%"
                  height="500px"
                  class="border rounded-lg"
              ></iframe>
            </div>

            <!-- Botones de acción -->
            <div class="mt-5 flex gap-2 justify-around ">
              <Button
                  @click="openInNewTab"
                  class="p-button-secondary"
              >
                <i class="pi pi-external-link mr-2"></i>
                Abrir en nueva pestaña
              </Button>
              <Spacer/>

              <!-- Subir Documentos -->
              <UploadDocumentDialog @updateDocument="loadDocument" :student="student"/>
            </div>
          </div>
          <div v-else>
            <UploadDocumentDialog @updateDocument="loadDocument" :student="student"/>
          </div>


        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'

import Chart from 'primevue/chart';
import Student from "@/models/student";
import StudentAvatar from "@/components/students/StudentAvatar.vue";
import {getDocumentService} from "@/services/studentService";
import UploadDocumentDialog from "@/components/students/UploadDocumentDialog.vue";

const visible = ref(false);

const pdfUrl = ref('');
const loading = ref(false);
const error = ref('');

// eslint-disable-next-line no-undef
const props = defineProps({
  student: {
    type: Student,
    required: true
  }
});


onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

function onVisible() {
  visible.value = true;
  loadDocument();
}

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  return {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [
      {
        label: 'Asistencia',
        data: [12, 10, 11, 9],
        backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(224,25,56,0.2)'],
        hoverBackgroundColor: ['rgb(57,213,59)'],
        // borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
        // borderWidth: 1
      }
    ]
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor
        }
      }
    }
  };
};


// Cargar documento
const loadDocument = async () => {
  try {
    loading.value = true;
    pdfUrl.value = await getDocumentService(props.student.id);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const openInNewTab = () => {
  window.open(pdfUrl.value, '_blank');
};

</script>

<style scoped>
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.label {
  font-weight: bold;
  width: 100px;
}

.details-label {
  width: 200px;
  font-weight: bold;
}

.material-icons {
  font-size: 1.5rem;
  margin-right: 0.5rem;
  color: rgb(186, 181, 129);
}

.document-container {
  padding: 1rem;
}

.pdf-preview-container {
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  overflow: hidden;
}

/* Responsive iframe */
@media (max-width: 640px) {
  iframe {
    height: 300px;
  }
}
</style>


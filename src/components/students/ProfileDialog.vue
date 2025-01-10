<template>
  <div>
    <!-- Botón para abrir el dialog -->
    <Button label="Ver Perfil" icon="pi pi-user" @click="visible = true"/>

    <Dialog
        v-model:visible="visible"
        modal
        :header="student.name"
        :style="{ width: '50vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
      <div class="flex flex-col md:flex-row gap-2">
        <!-- Información Personal -->
        <div class="card w-full md:w-2/5">
          <div class="flex flex-col items-start content-start">
            <div class="flex flex-wrap justify-center w-full mb-5">
              <Avatar
                  :image="student.avatar"
                  size="xlarge"
                  class="p-overlay-badge img-size"
                  :pt="{
          image: { class: 'rounded-full' }
        }"
              />
              <Divider/>

            </div>
            <div class="flex flex-col items-start justify-center">
              <div class="flex justify-content-between mb-2">
                <span class="label">Edad:</span>
                <span>{{ student.age + ' años' }}</span>
              </div>
              <div class="flex justify-content-between mb-2">
                <span class="label">Dirección:</span>
                <span>{{ "Direccion" }}</span>
              </div>
              <div class="flex justify-content-between mb-2">
                <span class="label">Género:</span>
                <span>{{ "Genero" }}</span>
              </div>
              <div class="flex justify-content-between items-center mb-2">
                <span class="label">Fecha de Nacimiento:</span>
                <span>{{ "20/03/199" }}</span>
              </div>
              <div class="flex justify-content-between mb-2">
                <span class="label">Teléfono:</span>
                <span>{{ "932 123 123" }}</span>
              </div>
              <div class="flex justify-content-between mb-2">
                <span class="label">DNI:</span>
                <span>{{ "93212323" }}</span>
              </div>
              <div class="flex justify-content-between mb-2">
                <span class="label">Email:</span>
                <span>{{ "mail@.com" }}</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Detalles Académicos -->
        <div class="card w-full md:w-4/5">
          <div class="mb-5">
            <h2 class="text-xl font-bold mb-3">Detalles del Estudiante</h2>
            <p class="text-gray-500 mb-4">
              {{ student.description }}
            </p>

            <div class="grid">
              <div class="col-12 mb-3">
                <div class="flex align-items-center">
                  <i class="pi pi-id-card mr-2"></i>
                  <span class="label mr-2">Matrícula:</span>
                  <span>{{ student.studentId }}</span>
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="flex align-items-center">
                  <i class="pi pi-book mr-2"></i>
                  <span class="label mr-2">Carrera:</span>
                  <span>{{ student.major }}</span>
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="flex align-items-center">
                  <i class="pi pi-calendar mr-2"></i>
                  <span class="label mr-2">Semestre:</span>
                  <span>{{ student.semester }}</span>
                </div>
              </div>
              <div class="col-12">
                <div class="flex align-items-center">
                  <i class="pi pi-map-marker mr-2"></i>
                  <span class="label mr-2">Campus:</span>
                  <span>{{ student.campus }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Estadísticas Académicas -->
          <div class="mb-5">
            <h2 class="text-xl font-bold mb-3">Estadísticas de Asistencia</h2>
            <div class="flex align-items-center justify-center">
              <Chart type="pie" :width="600" :data="chartData" :options="chartOptions"/>
            </div>
          </div>

          <!-- Subir Documentos -->
          <div>
            <h2 class="text-xl font-bold mb-3">Documentos</h2>
            <FileUpload mode="basic" name="demo[]" url="/api/upload" @upload="onUpload($event)" accept="application/pdf" :maxFileSize="1000000">
              <template #empty>
                <span>Drag and drop files to here to upload.</span>
              </template>
            </FileUpload>
            <small class="block mt-2 text-gray-500">Tamaño máximo: 1MB. Solo archivos PDF.</small>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useToast} from 'primevue/usetoast'

import Chart from 'primevue/chart';

const toast = useToast()
const visible = ref(false)

// Datos del estudiante
const student = ref({
  name: 'Carlos Rodríguez',
  avatar: 'https://i0.wp.com/newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg?ssl=1',
  rating: 5,
  age: 20,
  city: 'Ciudad de México',
  state: 'CDMX',
  country: 'México',
  postCode: '03100',
  phone: '+52 55 1234 5678',
  email: 'carlos.rodriguez@universidad.edu',
  description: 'Estudiante de tiempo completo con especialización en desarrollo de software. Participante activo en proyectos de investigación y clubes de programación.',
  studentId: 'A123456789',
  major: 'Ingeniería en Sistemas Computacionales',
  semester: '6to Semestre',
  campus: 'Campus Principal',
  stats: {
    totalCredits: 180,
    currentGPA: 9.2,
    coursesCompleted: 36
  }
})

// Manejo de archivos
const onUpload = (event) => {
  toast.add({
    severity: 'success',
    summary: 'Archivo Subido',
    detail: 'El documento se ha subido correctamente',
    life: 3000
  })
}

const onSelect = (event) => {
  const file = event.files[0]
  if (file.size > 10000000) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'El archivo excede el tamaño máximo permitido de 1MB',
      life: 3000
    })
    return false
  }
}
onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

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
        hoverBackgroundColor: ['rgb(12,228,16)'],
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
  margin-bottom: 5px;
}

.img-size {
  width: 100%;
  max-width: 200px;
  height: auto;
}
.size-chart{
  width: 100%;
  height: 900px;
}
</style>
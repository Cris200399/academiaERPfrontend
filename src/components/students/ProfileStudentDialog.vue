<template>
  <div>
    <!-- Botón para abrir el dialog -->
    <Button icon="pi pi-user" class="p-button-rounded" @click="onVisible"/>

    <Dialog
        v-model:visible="visible"
        modal
        :header="student.getFullName()"
        @hide="onHide"
        :draggable="false"
        :style="{ width: '50vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
      <div class="flex flex-col md:flex-row gap-2">
        <!-- Información Personal -->
        <div class="card w-full md:w-2/5">
          <div class="flex flex-col items-start content-start">
            <div class="flex flex-wrap justify-center w-full mb-5">

              <StudentAvatar @updateImage="handleUpdatedImage" :studentId="student.id"
                             :profileImageId="student.profileImageId"/>
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
                <span>{{ formatDate(student.dateOfBirth) }}</span>
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

        <!-- Detalles Extras -->
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

          <!-- Asistencia -->

          <div v-if="assistances.length >= 1" class="mb-5">
            <h2 class="text-xl font-bold mb-3">Asistencias en los últimos 30 días</h2>
            <div class="flex justify-center">
              <DatePicker inline v-model="date" :minDate="minDate" :max-date="maxDate" :disabled-dates="disabledDates">
                <template #date="slotProps">
                  <div v-if="isAssistanceDate(slotProps.date)"
                       v-tooltip="{ value: getTooltip(slotProps.date), hideDelay: 200 }"
                       class="font-bold bg-green-400 rounded-full p-2 text-white relative">
                    {{ slotProps.date.day }}
                  </div>
                  <div v-else class="text-black-alpha-80">{{ slotProps.date.day }}</div>
                </template>
              </DatePicker>

            </div>
          </div>


          <div v-if="pdfUrl" class="mt-4">
            <h3 class="text-lg font-bold mb-2">DNI
            </h3>
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
              <!--              <Spacer/>-->

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
import {ref} from 'vue'

import Student from "@/models/student";
import StudentAvatar from "@/components/shared/StudentAvatar.vue";
import {getDocumentService} from "@/services/studentService";
import UploadDocumentDialog from "@/components/students/UploadDocumentDialog.vue";
import {formatDate} from "@/utils/formatDate";
import {getAssistancesPerStudentIdService} from "@/services/assistanceService";
import Assistance from "@/models/assistance";
import DatePicker from "primevue/datepicker";

const visible = ref(false);

const pdfUrl = ref('');
const loading = ref(false);
const error = ref('');
const assistances = ref([]);


const date = ref(new Date());

let minDate = new Date(new Date().setDate(new Date().getDate() - 29));

let maxDate = new Date();


let disabledDates;

// eslint-disable-next-line no-undef
const emit = defineEmits(['updateImage']);

// eslint-disable-next-line no-undef
const props = defineProps({
  student: {
    type: Student,
    required: true
  }
});


async function getAssitances() {
  const assistancesResponse = await getAssistancesPerStudentIdService(props.student.id);
  assistancesResponse.map((assistance) => {
    assistances.value.push(new Assistance((assistance)));
  });

}

async function onVisible() {
  visible.value = true;
  await loadDocument();
  await getAssitances();
  disabledDates = getDisabledDays();
}

function onHide() {
  visible.value = false;
  assistances.value = [];
}

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

function handleUpdatedImage(studentId) {
  emit('updateImage', studentId);
}

function isSameDay(date1, date2) {
  return date1.getDate() === date2.day &&
      date1.getMonth() === date2.month &&
      date1.getFullYear() === date2.year;
}

const isAssistanceDate = (slotDate) => {
  return assistances.value.some((a) => isSameDay(a.date, slotDate));
};

const getTooltip = (slotDate) => {
  const assistance = assistances.value.find((a) =>
      isSameDay(a.date, slotDate)
  );

  console.log(assistance);
  return assistance ? `✔️ ${assistance.getHour()}` : null;
};

function getDisabledDays(){
  const assistanceDates = assistances.value.map(a => a.date.toDateString());
  const allDates = Array.from({length: 30}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toDateString();
  });
  return allDates.filter(date => !assistanceDates.includes(date)).map(date => new Date(date));
}

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


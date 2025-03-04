<script setup>
import {onMounted, ref} from 'vue';
import {getStudentsService} from "@/services/studentService";
import Student from "@/models/student";
import Select from "primevue/select";
import FloatLabel from "primevue/floatlabel";
import DatePicker from 'primevue/datepicker';
import CalendarComponent from "@/components/calendar/CalendarComponent.vue";
import PrivateClass from "@/models/privateClass";
import {createPrivateClassService} from "@/services/privateClassService";
import {useToast} from "primevue/usetoast";
import InputNumber from "primevue/inputnumber";
import {paymentMethodsOptions} from "@/utils/paymentMethodsOptions";
import Button from "primevue/button";
import PrivateClassPayment from "@/models/privateClassPayment";
import {createPrivateClassPaymentService} from "@/services/privateClassPaymentService";


const students = ref([]);

const title = ref();
const selectedStudent = ref();
const date = ref();
const startTime = ref();
const endTime = ref();
const amount = ref();

const toast = useToast();

const paymentMethods = ref([]);

const calendarKey = ref(0); // Key to force calendar re-render

onMounted(async () => {
  const studentsResponse = await getStudentsService();
  studentsResponse.forEach(student => {
    students.value.push(new Student(student));
  })
})


async function onSubmit() {
  const newPrivateClass = new PrivateClass(
      {
        title: title.value,
        students: [selectedStudent.value],
        date: date.value,
        startTime: startTime.value,
        endTime: endTime.value
      }
  )

  try {
    await createPrivateClassService(newPrivateClass).then(privateClass => {
          createNewPrivateClassPayment(privateClass._id);
        }
    );
    toast.add({
      severity: 'success',
      summary: 'Clase creada',
      detail: 'La clase se ha creado correctamente',
      life: 1500
    });
    calendarKey.value++;
    resetForm();
  } catch (e) {
    console.log(e);
    toast.add({severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al crear la clase', life: 1500});
  }
}

async function createNewPrivateClassPayment(privateClassId) {
  const paymentMethodsValues = paymentMethods.value.map(paymentMethod => {
    return paymentMethod.value;
  })
  const newPrivateClassPayment = new PrivateClassPayment('', selectedStudent.value, privateClassId, new Date(), amount.value, paymentMethodsValues);

  await createPrivateClassPaymentService(newPrivateClassPayment);
}

function togglePaymentMethods(paymentOption) {
  const index = paymentMethods.value.findIndex(p => p.value === paymentOption.value);
  if (index === -1) {
    paymentMethods.value.push(paymentOption);
  } else {
    paymentMethods.value.splice(index, 1);
  }
}

function resetForm() {
  title.value = '';
  selectedStudent.value = null;
  date.value = null;
  startTime.value = null;
  endTime.value = null;
  amount.value = null;
  paymentMethods.value = [];
}
</script>

<template>
  <div class="card flex justify-center">
    <h2 class="text-3xl font-bold">Crear clase particular</h2>
  </div>
  <div class="card justify-start">
    <div class="flex flex-col xl:flex-row gap-[20px] mb-4">
      <div class="w-full md:w-auto">
        <div class="my-4 w-full">
          <div class="mb-4">
            <label class="text-3xl">Título</label>
          </div>
          <FloatLabel variant="on">
            <InputText v-model="title" placeholder="Ej. Infantiles concurso..." class="w-full"/>
          </FloatLabel>
        </div>
        <div class="mb-4">
          <label class="text-3xl">Alumno</label>
        </div>
        <div class="my-1">
          <FloatLabel class="w-full" variant="on">
            <Select v-model="selectedStudent" display="chip" option-label="fullName" :options="students" filter
                    option-value="id" class="w-full">
              <template #option="slotProps">
                <span>{{ slotProps.option.getFullName() }}</span>
              </template>
            </Select>
            <label for="on_label">Seleccionar alumno</label>
          </FloatLabel>
        </div>
        <div class="my-4 w-full">
          <div class="mb-4">
            <label class="text-3xl">Fecha</label>
          </div>
          <FloatLabel variant="on">
            <label for="on_label">Seleccionar fecha</label>
            <DatePicker class="w-full" v-model="date" :min-date="new Date()" showButtonBar/>
          </FloatLabel>
        </div>

        <div class="my-4 w-full">
          <div class="mb-4">
            <label class="text-3xl">Hora de inicio</label>
          </div>
          <input
              v-model="startTime"
              type="time"
              class="p-2 border rounded"
          >
        </div>

        <div class="my-4 w-full">
          <div class="mb-4">
            <label class="text-3xl">Hora de fin</label>
          </div>
          <input
              v-model="endTime"
              type="time"
              class="p-2 border rounded"
          >
        </div>

        <div class="my-4 w-full">
          <div class="mb-4">
            <label class="text-3xl">Monto</label>
          </div>
          <FloatLabel variant="on">
            <InputNumber class="w-full" v-model="amount" mode="currency" currency="PEN" locale="es-PE"/>
            <label for="on_label">Monto</label>
          </FloatLabel>
        </div>
        <div class="mb-4">
          <div class="field">
            <label for="paymentMethods" class="block text-3xl text-gray-700">Método(s) de pago</label>
            <div class="mt-1 flex flex-wrap">
              <button v-for="paymentOption in paymentMethodsOptions" :key="paymentOption.value" type="button"
                      :class="['px-3 py-2 rounded-md my-1 mx-1 text-sm font-medium', paymentMethods.includes(paymentOption) ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300']"
                      @click="togglePaymentMethods(paymentOption)">
                {{ paymentOption.name }}
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-center w-full">
          <Button class="btn btn-primary w-full" @click="onSubmit">Crear clase</Button>
        </div>
      </div>

      <div class="w-full md:w-full">
        <div class="flex justify-center">
          <h3 class="text-3xl font-bold">Calendario</h3>
        </div>
        <CalendarComponent :key="calendarKey" class="calendar-height"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-height {
  height: auto; /* Adjust as needed */
  width: 100%; /* Ensure calendar takes full width of its container */
}

@media (max-width: 768px) {
  /* Example breakpoint, adjust as needed */
  .calendar-height {
    height: 50vh; /* Adjust height for smaller screens */
  }
}
</style>
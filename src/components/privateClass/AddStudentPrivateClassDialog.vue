<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import {onMounted, ref} from "vue";
import {paymentMethodsOptions} from "@/utils/paymentMethodsOptions";
import FloatLabel from "primevue/floatlabel";
import Select from "primevue/select";
import {getStudentsService} from "@/services/studentService";
import Student from "@/models/student";
import {addStudentToPrivateClassService} from "@/services/privateClassService";
import PrivateClassPayment from "@/models/privateClassPayment";
import {createPrivateClassPaymentService} from "@/services/privateClassPaymentService";
import {useToast} from "primevue/usetoast";


const paymentMethods = ref([]);

const students = ref([]);
const selectedStudent = ref();
const amount = ref();

const toast = useToast();

// eslint-disable-next-line no-undef
const emit = defineEmits(['closeDialog', 'updateClass']);

// eslint-disable-next-line no-undef
const props = defineProps({
  privateClassId: {
    type: String,
    required: true
  },
})

onMounted(async () => {
  const studentsResponse = await getStudentsService();
  studentsResponse.forEach(student => {
    students.value.push(new Student(student));
  })
})

function togglePaymentMethods(paymentOption) {
  const index = paymentMethods.value.findIndex(p => p.value === paymentOption.value);
  if (index === -1) {
    paymentMethods.value.push(paymentOption);
  } else {
    paymentMethods.value.splice(index, 1);
  }
}

function closeDialog() {
  emit('closeDialog');
}

async function saveChanges() {
  try {

    await addStudentToPrivateClassService(props.privateClassId, selectedStudent.value);
    const paymentMethodsValues = paymentMethods.value.map(paymentMethod => {
      return paymentMethod.value;
    })
    const newPrivateClassPayment = new PrivateClassPayment('', selectedStudent.value, props.privateClassId, new Date(), amount.value, paymentMethodsValues);
    await createPrivateClassPaymentService(newPrivateClassPayment);

    toast.add({
      severity: 'success',
      summary: 'Acción completada',
      detail: 'El estudiante ha sido agregado correctamente',
      life: 3000
    });
    closeDialog();
    emit('updateClass');
  } catch (e) {
    console.log(e);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ha ocurrido un error al agregar el estudiante',
      life: 3000
    });
  }
}

</script>

<template>
  <Dialog header="Agregar estudiante" :visible="true" :closable="false" :style="{ width: '50vw' }"
          class="p-dialog-content rounded-lg shadow-md">

    <div class="flex gap-[20px] flex-wrap py-3">
      <div class="grow">
        <div class="">
          <FloatLabel class="" variant="on">
            <Select v-model="selectedStudent" display="chip" option-label="fullName" :options="students" filter
                    option-value="id" class="w-full">
              <template #option="slotProps">
                <span>{{ slotProps.option.getFullName() }}</span>
              </template>
            </Select>
            <label for="on_label">Seleccionar alumno</label>
          </FloatLabel>
        </div>
      </div>

      <div class="grow">
        <div class="field">
          <FloatLabel variant="on">
            <InputNumber class="w-full" v-model="amount" mode="currency" currency="PEN" locale="es-PE"/>
            <label for="on_label">Monto</label>
          </FloatLabel>
        </div>
      </div>

      <div class="grow">
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
    </div>

    <template #footer>
      <div class="flex justify-end gap-2 p-4">
        <Button label="Cancelar" icon="pi pi-times" @click="closeDialog"
                class="p-button-text border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"/>
        <Button label="Guardar" icon="pi pi-check" @click="saveChanges"
                class="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 border-none"/>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>

</style>
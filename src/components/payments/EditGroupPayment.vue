<template>
  <Dialog header="Editar Pago" :modal="true" :closable="false" :style="{ width: '50vw' }"
          class="p-dialog-content rounded-lg shadow-md">

    <div class="flex gap-[20px] flex-wrap">
      <div class="grow">
        <div class="field">
          <label for="amount" class="block text-sm font-medium text-gray-700">Monto</label>
          <InputNumber
              class="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              v-model="amount" inputId="amount" mode="currency" currency="PEN" locale="es-PE"/>
        </div>
      </div>
      <div class="grow">
        <div class="field">
          <label for="dates" class="block text-sm font-medium text-gray-700">Fecha Inicio-Fin</label>
          <DatePicker
              class="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              v-model="dates" selectionMode="range" show-icon :manualInput="true" show-button-bar/>
        </div>
      </div>
      <div class="w-full">
        <div class="field">
          <label for="paymentMethods" class="block text-sm font-medium text-gray-700">Método(s) de pago</label>
          <div class="mt-1 flex flex-wrap gap-2">
            <button
                v-for="paymentOption in paymentMethodsOptions"
                :key="paymentOption.value"
                type="button"
                :class="['px-3 py-2 rounded-md text-sm font-medium', paymentMethods.includes(paymentOption) ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300']"
                @click="togglePaymentMethods(paymentOption)">
              {{ paymentOption.name }}
            </button>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="field">
          <label for="concept" class="block text-sm font-medium text-gray-700">Concepto</label>
          <Textarea v-model="concept" auto-resize
                    class="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Concepto de pago"/>
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

<script setup>
import {onMounted, ref} from 'vue';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import {paymentMethodsOptions} from '@/utils/paymentMethodsOptions';
import GroupPayment from "@/models/groupPayment";
import {patchGroupPaymentService} from "@/services/groupPaymentService";
import {useToast} from "primevue/usetoast";

const isDialogVisible = ref(false);
const amount = ref(0);
const paymentMethods = ref([]);
const dates = ref(null);
const concept = ref('');

const toast = useToast();

// eslint-disable-next-line no-undef
const emit = defineEmits(['closeDialog', 'updatePayment']);

// eslint-disable-next-line no-undef
const props = defineProps({
  payment: {
    type: Object,
    required: true
  }
});

onMounted(() => {
  openDialog(props.payment);
});

function togglePaymentMethods(paymentOption) {
  const index = paymentMethods.value.findIndex(p => p.value === paymentOption.value);
  if (index === -1) {
    paymentMethods.value.push(paymentOption);
  } else {
    paymentMethods.value.splice(index, 1);
  }
}

function openDialog(payment) {
  amount.value = payment.amount;
  dates.value = [new Date(payment.startDate), new Date(payment.endDate)];
  concept.value = payment.concept;
  paymentMethods.value = payment.paymentMethod.map(paymentMethod => {
    return paymentMethodsOptions.find(paymentOption => paymentOption.value === paymentMethod);
  })
  isDialogVisible.value = true;
}

function closeDialog() {
  emit('closeDialog');
}

async function saveChanges() {
  try {
    const newGroupPayment = GroupPayment.toUpdateGroupPayment(
        props.payment._id,
        amount.value,
        dates.value[0],
        dates.value[1],
        paymentMethods.value.map(paymentMethod => paymentMethod.value),
        concept.value
    );
    await patchGroupPaymentService(props.payment._id, newGroupPayment);
    emit('updatePayment');
    confirmToast();
    closeDialog();
  } catch (e) {
    console.error(e);
    rejectToast();
  }
}

function confirmToast() {
  toast.add({severity: 'success', summary: 'Éxito', detail: 'Pago actualizado correctamente', life: 1500});
}

function rejectToast() {
  toast.add({severity: 'error', summary: 'Error', detail: 'No se ha actualizado el pago', life: 1500});
}
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}

label {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>
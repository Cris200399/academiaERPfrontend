<template>
  <div class="card">
    <DataTable v-model:filters="filters" v-model:expandedRows="expandedRows" :value="studentGroupPayments"
               tableStyle="min-width: 60rem"
               :globalFilterFields="['name']" :loading="loading">
      <template #header>
        <div class="flex justify-end">
          <IconField>
            <InputIcon>
              <i class="pi pi-search"/>
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Buscar"/>
          </IconField>
        </div>
      </template>
      <template #empty>
        <div class="text-center">
          <p>No hay pagos registrados</p>
        </div>
      </template>
      <Column expander style="width: 5rem"/>
      <Column field="name" header="Nombre(s)"></Column>
      <Column field="lastName" header="Apellido(s)"></Column>
      <Column header="Grupo">
        <template #body="slotProps">
          {{ slotProps.data.group.name }}
        </template>
      </Column>
      <Column header="Estado">
        <template #body="slotProps">
          <Tag :value="getPaymentStatusLabel(slotProps.data.paymentStatus)"
               :severity="getPaymentStatusSeverity(slotProps.data.paymentStatus)"/>
        </template>
      </Column>

      <template #expansion="slotProps">
        <div class="ml-44">
          <h2 class="text-2xl mb-2">Historial de Pagos</h2>
          <DataTable :value="slotProps.data.groupPayments" removableSort>
            <template #empty>
              <div class="text-center">
                <p>No hay pagos registrados</p>
              </div>
            </template>
            <Column field="date" header="Fecha de pago" sortable>
              <template #body="{data}">
                {{ formatCustomDate(data.date) }}
              </template>
            </Column>
            <Column field="concept" header="Concepto"/>
            <Column field="startDate" header="Desde" sortable>
              <template #body="{data}">
                {{ formatCustomDate(data.startDate) }}
              </template>
            </Column>
            <Column field="endDate" header="Hasta" sortable>
              <template #body="{data}">
                {{ formatCustomDate(data.endDate) }}
              </template>
            </Column>
            <Column field="amount" header="Monto" sortable>
              <template #body="{data}">
                {{ formatCurrency(data.amount) }}
              </template>
            </Column>
            <Column field="paymentMethod" header="Método(s) de pago(s)">
              <template #body="{data}">
                {{ StudentGroupPaymentItem.getPaymentsMethods(data.paymentMethod) }}
              </template>
            </Column>
            <Column>
              <template #body="{data}">
                <div class="flex gap-1">
                  <Button icon="pi pi-trash" severity="danger"
                          @click="deleteGroupPayment(data._id, slotProps.data.id)"/>
                  <Button icon="pi pi-pencil" class="ml-2" @click="openDialog"/>

                </div>
                <EditGroupPayment :payment="data" v-model:visible="visibleEditGroupPaymentDialog"
                                  @close-dialog="visibleEditGroupPaymentDialog = false"
                                  @updatePayment="handleUpdatedPayment(slotProps.data.id)"/>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>

    </DataTable>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {
  deleteGroupPaymentService,
  getGroupPaymentsPerStudentService,
  getGroupPaymentsService
} from "@/services/groupPaymentService";
import StudentGroupPaymentItem from "@/models/StudentGroupPaymentItem";
import {getPaymentStatusLabel, getPaymentStatusSeverity} from "@/utils/paymentStatusFunctions";

import DataTable from "primevue/datatable";
import {FilterMatchMode} from "@primevue/core/api";
import {useToast} from "primevue/usetoast";
import {useConfirm} from "primevue/useconfirm";
import {formatCurrency} from "@/utils/formatCurrency";
import {formatCustomDate} from "@/utils/formatCustomDate";


import EditGroupPayment from "@/components/groupPayments/EditGroupPayment.vue";

const studentGroupPayments = ref([]);
const expandedRows = ref([]);
const loading = ref(true);
const toast = useToast();
const confirm = useConfirm();

const visibleEditGroupPaymentDialog = ref(false);

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
});

onMounted(async () => {
  await getGroupPayments();
  loading.value = false;
});

async function getGroupPayments() {
  const groupPaymentsResponse = await getGroupPaymentsService();
  groupPaymentsResponse.forEach(groupPayment => {
    studentGroupPayments.value.push(new StudentGroupPaymentItem(groupPayment));
  });

}

function handleDeleteGroupPayment(paymentId, studentId) {
  const index = studentGroupPayments.value.findIndex(studentGroupPayment => studentGroupPayment.id === studentId);
  const groupPaymentIndex = studentGroupPayments.value[index].groupPayments.findIndex(groupPayment => groupPayment._id === paymentId);
  studentGroupPayments.value[index].groupPayments.splice(groupPaymentIndex, 1);
}

async function deleteGroupPayment(paymentId, studentId) {
  confirm.require({
    message: '¿Estás seguro de eliminar este pago?',
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
        await deleteGroupPaymentService(paymentId);
        handleDeleteGroupPayment(paymentId, studentId);
        await handleUpdatedPayment(studentId);
        toast.add({severity: 'success', summary: 'Confirmado', detail: 'Pago eliminado', life: 1500});

      } catch (e) {
        toast.add({severity: 'error', summary: 'Error', detail: 'No se ha eliminado el pago', life: 1500});
      }
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Cancelado',
        detail: 'No se ha eliminado el pago',
        life: 1500
      });
    }
  });
}

function openDialog() {
  visibleEditGroupPaymentDialog.value = true;
}

async function handleUpdatedPayment(studentId) {
  const index = studentGroupPayments.value.findIndex(studentGroupPayment => studentGroupPayment.id === studentId);
  const updatedGroupPayments = await getGroupPaymentsPerStudentService(studentId);
  studentGroupPayments.value[index] = new StudentGroupPaymentItem(updatedGroupPayments);
}

</script>

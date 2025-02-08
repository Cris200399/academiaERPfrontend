<template>
  <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="flex justify-center">
      <StatCard title="Número de estudiantes" :value="totalStudents" description="" icon="pi-user"
                change="" :isPositive="false" background="bg-orange-300"/>
    </div>
    <div class="flex justify-center">
      <StatCard title="Ingresos del mes" :value="`S/ ${totalSales}`" description="en el último mes" icon="pi-money-bill"
                change="+10%"
                isPositive background="bg-blue-200"/>
    </div>
    <div class="flex justify-center">
      <StatCard title="Alumnos por vencer" :value="totalAboutToExpire" description="" icon="pi-stopwatch" change=""
                isPositive background="bg-orange-400"/>
    </div>
    <div class="flex justify-center">
      <StatCard title="Pagos vencidos" :value="totalOverdueStudents" description="" icon="pi-info-circle" change=""
                background="bg-red-500"/>
    </div>
  </div>

  <div class="card shadow-lg">
    <SalesChart/>
  </div>
</template>

<script setup>
import SalesChart from "@/components/sales/SalesChart.vue";
import StatCard from "@/components/shared/StatCard.vue";
import {onMounted, ref} from "vue";
import {getTotalPaymentsForActualMonthService} from "@/services/paymentReportService";
import {
  getTotalOverdueStudentsService,
  getTotalStudentsService,
  getTotalToExpireStudentsService
} from "@/services/studentService";

const totalStudents = ref("");
const totalSales = ref("");
const totalOverdueStudents = ref("");
const totalAboutToExpire = ref("");
onMounted(async () => {
  await getTotalStudents();
  await getTotalSales();
  await getTotalOverdueStudents();
  await getTotalAboutToExpire();
});

async function getTotalStudents() {
  totalStudents.value = await getTotalStudentsService();
}


async function getTotalSales() {
  totalSales.value = (await getTotalPaymentsForActualMonthService()).totalPayments;
}

async function getTotalOverdueStudents() {
  totalOverdueStudents.value = await getTotalOverdueStudentsService();
}

async function getTotalAboutToExpire() {
  totalAboutToExpire.value = await getTotalToExpireStudentsService();
}
</script>

<style scoped>

</style>
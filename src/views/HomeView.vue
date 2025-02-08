<template>
  <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="flex justify-center">
      <StatCard title="Número de estudiantes" :value="totalStudents" description="" icon="pi-user"
                change="" :isPositive="false" background="bg-orange-300"/>
    </div>
    <div class="flex justify-center">
      <StatCard v-if="changeSales !== 'No hay datos previos'" title="Ingresos del mes" :value="`S/ ${actualMonthTotalSales}`" description="en el último mes"
                icon="pi-money-bill"
                :change="`${changeSales}`"
                isPositive background="bg-blue-200"/>

      <StatCard v-else title="Ingresos del mes" :value="`S/ ${actualMonthTotalSales}`" description=""
                icon="pi-money-bill"
                change=""
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
import {getTotalPaymentsForActualMonthService, getTotalPaymentsForAMonthService} from "@/services/paymentReportService";
import {
  getTotalOverdueStudentsService,
  getTotalStudentsService,
  getTotalToExpireStudentsService
} from "@/services/studentService";

const totalStudents = ref("");
const actualMonthTotalSales = ref("");
const totalOverdueStudents = ref("");
const totalAboutToExpire = ref("");
const changeSales = ref("");
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
  actualMonthTotalSales.value = (await getTotalPaymentsForActualMonthService()).totalPayments;
  const lastMonthSales = (await getTotalPaymentsForAMonthService((new Date().getMonth()) - 1)).totalPayments;
  if (lastMonthSales !== 0) {
    console.log(lastMonthSales);
    changeSales.value = `${((actualMonthTotalSales.value - lastMonthSales) / lastMonthSales * 100).toFixed(2)}%`;
  } else {
    changeSales.value = `No hay datos previos`;
  }
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
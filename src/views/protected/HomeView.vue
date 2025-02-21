<template>
  <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="flex justify-center">
      <StatCard v-if="changeParticularSales !== 'No hay datos previos'" title="Ingresos del mes (particulares)"
                :value="`S/ ${actualMonthParticularTotalSales}`" description="en el último mes"
                icon="pi-money-bill"
                :change="`${changeParticularSales}`"
                isPositive background="bg-blue-200"/>

      <StatCard v-else title="Ingresos del mes (particulares)" :value="`S/ ${actualMonthParticularTotalSales}`" description=""
                icon="pi-money-bill"
                change=""
                isPositive background="bg-blue-200"/>
    </div>
    <div class="flex justify-center">
      <StatCard v-if="changeGroupSales !== 'No hay datos previos'" title="Ingresos del mes (grupales)"
                :value="`S/ ${actualMonthGroupTotalSales}`" description="en el último mes"
                icon="pi-money-bill"
                :change="`${changeGroupSales}`"
                isPositive background="bg-blue-200"/>

      <StatCard v-else title="Ingresos del mes (grupales)" :value="`S/ ${actualMonthGroupTotalSales}`" description=""
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
import {
  getTotalGroupsPaymentsForActualMonthService,
  getTotalGroupsPaymentsForAMonthService,
  getTotalPrivatePaymentsForActualMonthService,
  getTotalPrivatePaymentsForAMonthService
} from "@/services/paymentReportService";
import {
  getTotalOverdueStudentsService,
  getTotalStudentsService,
  getTotalToExpireStudentsService
} from "@/services/studentService";

const totalStudents = ref("");
const totalOverdueStudents = ref("");
const totalAboutToExpire = ref("");
const actualMonthGroupTotalSales = ref("");
const changeGroupSales = ref("");

const actualMonthParticularTotalSales = ref("");
const changeParticularSales = ref("");

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
  await getGroupSales();
  await getParticularSales();
}

async function getGroupSales() {
  actualMonthGroupTotalSales.value = (await getTotalGroupsPaymentsForActualMonthService()).totalPayments;
  const lastMonthSales = (await getTotalGroupsPaymentsForAMonthService((new Date().getMonth()) - 1)).totalPayments;
  if (lastMonthSales !== 0) {
    console.log(lastMonthSales);
    changeGroupSales.value = `${((actualMonthGroupTotalSales.value - lastMonthSales) / lastMonthSales * 100).toFixed(2)}%`;
  } else {
    changeGroupSales.value = `No hay datos previos`;
  }
}

async function getParticularSales() {
  actualMonthParticularTotalSales.value = (await getTotalPrivatePaymentsForActualMonthService()).totalPayments;
  const lastMonthSales = (await getTotalPrivatePaymentsForAMonthService((new Date().getMonth()) - 1)).totalPayments;
  if (lastMonthSales !== 0) {
    changeParticularSales.value = `${((actualMonthParticularTotalSales.value - lastMonthSales) / lastMonthSales * 100).toFixed(2)}%`;
  } else {
    changeParticularSales.value = `No hay datos previos`;
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
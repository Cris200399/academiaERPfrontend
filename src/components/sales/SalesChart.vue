<template>
  <div>
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import {
  get3LatestMonthsPrivateReportsService,
  getLatest3MonthsGroupsReportsService
} from "@/services/paymentReportService";
import ReportSalesItem from "@/models/reportSalesItem";

const chartRef = ref(null);
const groupSalesData = ref([]);
const privateSalesData = ref([
]);

onMounted(async () => {
  await getReports();
  const myChart = echarts.init(chartRef.value);

  const option = {
    title: {
      text: "Ingresos en los últimos 3 meses",
      left: "center",
      textStyle: { color: "#333", fontSize: 20, fontWeight: "bold" },
      padding: 5,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#2A2A2A",
      borderColor: "#fff",
      valueFormatter: (value) => `S/ ${value.toLocaleString()}`,
      textStyle: { color: "#fff" },
      axisPointer: { type: "line" },
    },
    legend: {
      data: ["Clases Grupales", "Clases Particulares"],
      top: "10%",
    },
    xAxis: {
      type: "category",
      data: groupSalesData.value.map((item) => item.month),
      axisLine: { lineStyle: { color: "#ccc" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { formatter: (value) => `S/ ${value}` },
      axisLine: { lineStyle: { color: "#ccc" } },
    },
    series: [
      {
        name: "Clases Grupales",
        data: groupSalesData.value.map((item) => item.totalPayments),
        type: "line",
        // showSymbol: true,
        symbolSize: 8,
        itemStyle: { color: "#4A90E2" },
        lineStyle: { width: 3, color: "#4A90E2" },
        areaStyle: { color: "rgba(74, 144, 226, 0.3)" },
      },
      {
        name: "Clases Particulares",
        data: privateSalesData.value.map((item) => item.totalPayments),
        type: "line",
        showSymbol: true,
        symbolSize: 8,
        itemStyle: { color: "#E24A4A" },
        lineStyle: { width: 3, color: "#E24A4A" },
        areaStyle: { color: "rgba(226, 74, 74, 0.3)" },
      },
    ],
  };

  myChart.setOption(option);
});

async function getReports() {
  const groupReports = await getLatest3MonthsGroupsReportsService();
  groupReports.forEach((report) => {
    groupSalesData.value.push(new ReportSalesItem(report));
  });

  const privateReports = await get3LatestMonthsPrivateReportsService();
  privateReports.forEach((report) => {
    privateSalesData.value.push(new ReportSalesItem(report));
  });
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}

</style>


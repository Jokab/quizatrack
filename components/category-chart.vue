<script setup lang="ts">
import Chart from "primevue/chart";
import type { ChartOptions } from "chart.js";
import type { CategoryStats } from "~/pages/teams/[id].vue";

const props = defineProps<{ categoryStats: CategoryStats }>();
const chartData = setChartData(); ;
const chartOptions: ChartOptions = {
  maintainAspectRatio: false,
  indexAxis: "y",
};

function setChartData() {
  const statsOrderByPercentage = Object.fromEntries(Object.entries(props.categoryStats).sort(([,a], [,b]) => Number(a.correctPercentage) - Number(b.correctPercentage)));
  const percentStats = {
    label: "Procent rätt",
    data: Object.values(statsOrderByPercentage).map(x => x.correctPercentage),
  };
  const amountStats = {
    label: "Antal frågor",
    data: Object.values(statsOrderByPercentage).map(x => x.correctAbsoluteAmount),
  };
  return {
    labels: Object.keys(statsOrderByPercentage).map(x => mapCategory(x)),
    datasets: [percentStats, amountStats],
  };
}
</script>

<template>
  <Chart type="bar" :data="chartData" :options="chartOptions" :height="500" />
</template>

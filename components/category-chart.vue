<script setup lang="ts">
import Chart from "primevue/chart";
import type { CategoryPercentages } from "~/pages/teams/[id].vue";

const props = defineProps<{ categoryPercentages: CategoryPercentages }>();
const chartData = setChartData(); ;
const chartOptions = {
  maintainAspectRatio: true,

};

function setChartData() {
  const data = {
    label: "Dataset",
    data: Object.entries(props.categoryPercentages).sort(([,a], [,b]) => Number(a) - Number(b)).map(([, value]) => value),
  };

  return {
    labels: Object.entries(props.categoryPercentages).sort(([,a], [,b]) => Number(a) - Number(b)).map(([key, _]) => key),
    datasets: [data],
  };
}
</script>

<template>
  <Chart type="bar" :data="chartData" :options="chartOptions" />
</template>

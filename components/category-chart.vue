<script setup lang="ts">
import Chart from "primevue/chart";
import type { CategoryPercentages } from "~/pages/teams/[id].vue";

const props = defineProps<{ categoryPercentages: CategoryPercentages }>();
const chartData = setChartData(); ;
const chartOptions = ref();

function setChartData() {
  const data = {
    label: "Dataset",
    data: Object.values(props.categoryPercentages),
  };

  return {
    labels: Object.keys(props.categoryPercentages),
    datasets: [data],
  };
}
</script>

<template>
  <Chart type="bar" :data="chartData" :options="chartOptions" />
</template>

<script setup lang=ts>
import { onMounted, ref } from "vue";
import Chart from "primevue/chart";
import type { PastQuizesRow } from "~/types";

const props = defineProps<{ quizes: PastQuizesRow[] }>();

const chartData = ref();
const chartOptions = ref();

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

function setChartData() {
  const documentStyle = getComputedStyle(document.documentElement);
  return {
    labels: props.quizes.map(x => x.date),
    datasets: [
      {
        label: "Placering",
        data: props.quizes.map(x => x.placement),
        fill: false,
        borderColor: documentStyle.getPropertyValue("--cyan-500"),
        tension: 0.4,
      },
      {
        label: "Poäng",
        data: props.quizes.map(x => x.receivedPoints),
        fill: false,
        borderColor: documentStyle.getPropertyValue("--gray-500"),
        tension: 0.4,
      },
    ],
  };
}
function setChartOptions() {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
}
</script>

<template>
  <Chart type="line" :data="chartData" :options="chartOptions" />
</template>

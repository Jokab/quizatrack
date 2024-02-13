<script setup lang=ts>
import { onMounted, ref } from "vue";
import Chart from "primevue/chart";

const chartData = ref();
const chartOptions = ref();

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

function setChartData() {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["2024-01-12", "2024-02-01", "2024-02-08"],
    datasets: [
      {
        label: "Placering",
        data: [5, 1, 6],
        fill: false,
        borderColor: documentStyle.getPropertyValue("--cyan-500"),
        tension: 0.4,
      },
      {
        label: "Poäng",
        data: [19, 22, 19.5],
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

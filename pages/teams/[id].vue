<script setup lang="ts">
import type { Team } from "@/types"
import { useFetch, useRoute } from "nuxt/app";
import { computed } from "vue";
import Chart from 'primevue/chart';
const { params } = useRoute();
const data = await useFetch(`/api/teams/${params.id}`);
const team = JSON.parse(JSON.stringify(data.data.value)) as Team;

const members = computed(() => {
  const teamMembers = team.competitors[0].teamMembers;
  return teamMembers.map(x => x.person.name);
})
const questions = team.competitors[0].quiz.questions;
const answers = team.competitors[0].competitorAnswers;

// const questions = computed(() => {

// })
// console.log(team.competitors[0].quiz.date.getDate())


import { ref, onMounted } from "vue";

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ['2024-01-12', '2024-02-01', '2024-02-08'],
    datasets: [
      {
        label: 'Placering',
        data: [5, 1, 6],
        fill: false,
        borderColor: documentStyle.getPropertyValue('--cyan-500'),
        tension: 0.4
      },
      {
        label: 'Poäng',
        data: [19, 22, 19.5],
        fill: false,
        borderColor: documentStyle.getPropertyValue('--gray-500'),
        tension: 0.4
      }
    ]
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };
}

</script>

<template>
  <div>
    <Card class="h-auto">
      <!-- <template #title>
        {{ team.name }} (ID: {{ team.id }})
      </template> -->
      <template #content>
        <Chart type="line" :data="chartData" :options="chartOptions" />
        <!-- <h3>
          Quiz: {{ team.competitors[0].quiz.venue.name }} den {{ team.competitors[0].quiz.date }}
        </h3>
        <h3>
          Medverkande
        </h3>
        <p>{{ members.join(", ") }}</p>
        <h3>
          Frågor
        </h3>
        <div v-for="(q, index) in questions" :key="index">
          <div v-for="(part, index2) in q.questionParts" :key="index2">
            <p>{{ part.text }} {{ part.answer }}</p>
          </div>
        </div>
        <div v-for="(q, index) in questions" :key="index">
          <div v-for="(part, index2) in q.questionParts" :key="index2">
            <p>{{ part.text }} {{ part.answer }}</p>
          </div>
        </div>
        <br> -->
      </template>
    </Card>
  </div>
  <!-- <div>
    <Card>
      <template #title>
        {{ team.name }} (ID: {{ team.id }})
      </template>
      <template #content>
        <h3>
          Quiz: {{ team.competitors[0].quiz.venue.name }} den {{ team.competitors[0].quiz.date }}
        </h3>
        <h3>
          Medverkande
        </h3>
        <p>{{ members.join(", ") }}</p>
        <h3>
          Frågor
        </h3>
        <div v-for="(q, index) in questions" :key="index">
          <div v-for="(part, index2) in q.questionParts" :key="index2">
            <p>{{ part.text }} {{ part.answer }}</p>
          </div>
        </div>
        <div v-for="(q, index) in questions" :key="index">
          <div v-for="(part, index2) in q.questionParts" :key="index2">
            <p>{{ part.text }} {{ part.answer }}</p>
          </div>
        </div>
        <br>
      </template>
      <template #footer>
        <Button label="Check" icon="pi pi-check" />
      </template>
    </card>
    <Card class="mt-10">
      <template #title>
        {{ team.name }} (ID: {{ team.id }})
      </template>
      <template #content>
        <h3>
          Quiz: {{ team.competitors[0].quiz.venue.name }} den {{ team.competitors[0].quiz.date }}
        </h3>
        <h3>
          Medverkande
        </h3>
        <p>{{ members.join(", ") }}</p>
        <h3>
          Frågor
        </h3>
        <div v-for="(q, index) in questions" :key="index">
          <div v-for="(part, index2) in q.questionParts" :key="index2">
            <p>{{ part.text }} {{ part.answer }}</p>
          </div>
        </div>
        <div v-for="(q, index) in questions" :key="index">
          <div v-for="(part, index2) in q.questionParts" :key="index2">
            <p>{{ part.text }} {{ part.answer }}</p>
          </div>
        </div>
        <br>
      </template>
      <template #footer>
        <Button label="Check" icon="pi pi-check" />
      </template>
    </card>
  </div> -->
</template>

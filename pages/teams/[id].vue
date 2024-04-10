<script setup lang="ts">
import { useFetch, useRoute } from "nuxt/app";
import DataTable, { type DataTableRowSelectEvent } from "primevue/datatable";
import Column from "primevue/column";
import type { PastQuizesRow, Team } from "@/types";

const router = useRouter();
const teamNameState = useState("header");
const { params } = useRoute();

const data = await useFetch(`/api/teams/${params.id}`);
teamNameState.value = data.data.value?.name;
const team = JSON.parse(JSON.stringify(data.data.value)) as Team;

const pastQuizes: PastQuizesRow[] = team.competitors.map((x) => {
  const receivedPoints = x.competitorAnswers.map(x => x.points).reduce((acc, pts) => acc + pts);
  const maxPoints = x.quiz.questions.flatMap(x => x.questionParts.map(y => y.points)).reduce((acc, y) => acc + y);
  return {
    id: x.quiz.id,
    venue: x.quiz.venue.name,
    date: new Date(x.quiz.date).toLocaleDateString("sv-SE"),
    maxPoints,
    receivedPoints,
    placement: x.placement,
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export interface CategoryStatRecord {
  correctPercentage: string;
  correctAbsoluteAmount: string;
}

export interface CategoryStats {
  [key: string]: CategoryStatRecord;
}

const categoryStats1: any = {};

team.competitors.forEach((competitor) => {
  competitor.competitorAnswers.forEach((answer) => {
    const category = answer.questionPart.category;
    if (!categoryStats1[category]) {
      categoryStats1[category] = {
        totalQuestions: 0,
        correctAnswers: 0,
      };
    }
    categoryStats1[category].totalQuestions++;
    if (answer.points === answer.questionPart.points)
      categoryStats1[category].correctAnswers++;
  });
});

const categoryStats: CategoryStats = {};

Object.keys(categoryStats1).forEach((category) => {
  const { totalQuestions, correctAnswers } = categoryStats1[category];
  const percentage = (correctAnswers / totalQuestions) * 100;
  categoryStats[category] = { correctPercentage: percentage.toFixed(2), correctAbsoluteAmount: correctAnswers };
});

const selectedQuiz = ref<number>();

function onRowSelect(event: DataTableRowSelectEvent) {
  router.push(`/quiz/${event.data.id}`);
}
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <Card>
      <template #title>
        Historik
      </template>
      <template #content>
        <PlacementChart :quizes="pastQuizes" />
      </template>
    </Card>
    <Card>
      <template #title>
        Kategorier
      </template>
      <template #content>
        <CategoryChart :category-stats="categoryStats" />
      </template>
    </Card>
    <Card>
      <template #title>
        Tidigare quizar
      </template>
      <template #content>
        <DataTable
          v-model:selection="selectedQuiz" striped-rows selection-mode="single" :value="pastQuizes"
          @row-select="onRowSelect"
        >
          <Column field="date" header="Datum" />
          <Column field="venue" header="Plats" />
          <Column field="points" header="Poäng">
            <template #body="{ data: colData }">
              {{ `${colData.receivedPoints}/${colData.maxPoints}` }}
            </template>
          </Column>
          <Column field="placement" header="Placering" />
          <Column field="action">
            <template #body>
              <i class="pi pi-chevron-right" />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

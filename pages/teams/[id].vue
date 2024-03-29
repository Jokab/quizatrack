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
          <Column field="placement" header="Plats" />
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

<!-- eslint-disable no-unused-labels -->
<script setup lang="ts">
import type { Quiz, Team } from "@/types"
import { useFetch, useRoute } from "nuxt/app";
import { computed } from "vue";
import DataTable, { type DataTableRowSelectEvent } from 'primevue/datatable';
import Column from 'primevue/column';

interface PastQuizesRow {
  id: number;
  date: string;
  points: number;
  placement: number;
}
const router = useRouter();

const teamNameState = useState('header')
const { params } = useRoute();
const data = await useFetch(`/api/teams/${params.id}`);
console.log(data.data)
teamNameState.value = data.data.value?.name;
const team = JSON.parse(JSON.stringify(data.data.value)) as Team;
const members = computed(() => {
  const teamMembers = team.competitors[0].teamMembers;
  return teamMembers.map(x => x.person.name);
})

const pastQuizes = team.competitors.map(x => {
  // console.log(x.competitorAnswer)
  const receivedPoints = x.competitorAnswer.map(x => x.points).reduce((acc, pts) => acc + pts);
  const maxPoints = x.quiz.questions.flatMap(x => x.questionParts.map(y => y.points)).reduce((acc, y) => acc + y);
  // console.log(typeof (x.competitorAnswer.map(x => x.points)[0]))
  return {
    id: x.quiz.id,
    date: new Date(x.quiz.date).toLocaleDateString("sv-SE"),
    points: `${receivedPoints}/${maxPoints}`,
    placement: x.placement
  }
});

const selectedQuiz = ref<number>()

function onRowSelect(event: DataTableRowSelectEvent) {
  router.push(`/quiz/${event.data.id}`)
}
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <Card>
      <template #title>
        Historik
      </template>
      <template #content>
        <PlacementChart />
      </template>
    </Card>
    <Card>
      <template #title>
        Tidigare quizar
      </template>
      <template #content>
        <DataTable v-model:selection="selectedQuiz" striped-rows selection-mode="single" :value="pastQuizes"
          @row-select="onRowSelect">
          <Column field="date" header="Datum" />
          <Column field="points" header="Poäng" />
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
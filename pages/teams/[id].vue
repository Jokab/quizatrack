<!-- eslint-disable no-unused-labels -->
<script setup lang="ts">
import type { Team } from "@/types"
import { useFetch, useRoute } from "nuxt/app";
import { computed } from "vue";

const teamNameState = useState('teamName')
const { params } = useRoute();
const data = await useFetch(`/api/teams/${params.id}`);
teamNameState.value = data.data.value?.name;
const team = JSON.parse(JSON.stringify(data.data.value)) as Team;

const members = computed(() => {
  const teamMembers = team.competitors[0].teamMembers;
  return teamMembers.map(x => x.person.name);
})

const questions = team.competitors[0].quiz.questions;
// const answers = team.competitors[0].competitorAnswer;

const pastQuizes = team.competitors.map(x => ({
  date: new Date(x.quiz.date).toLocaleDateString("sv-SE"),
  points: x.competitorAnswer.map(x => x.points).reduce((prev, pts) => prev + pts),
  placement: x.placement
}));
// console.log(pastQuizes);
console.log(team.competitors);

// const questions = computed(() => {

// })
// console.log(team.competitors[0].quiz.date.getDate())

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

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
        <DataTable :value="pastQuizes">
          <Column field="date" header="Datum" />
          <Column field="points" header="Poäng" />
          <Column field="placement" header="Placering" />
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
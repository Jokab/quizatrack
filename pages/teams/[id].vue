<script setup lang="ts">
import type { Team } from "@/types"
import { useFetch, useRoute } from "nuxt/app";
import { computed, ref } from "vue";
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
</script>

<template>
  <div>
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
  </div>
</template>

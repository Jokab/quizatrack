<script setup lang="ts">
import type { DataTableExpandedRows } from 'primevue/datatable';
import type { Quiz } from '~/types';


const { params } = useRoute();
const data = await useFetch(`/api/quiz/${params.id}`)
const quiz = JSON.parse(JSON.stringify(data.data.value)) as Quiz;

const header = useState("header")
header.value = new Date(quiz.date).toLocaleDateString("sv-SE")

const questions = quiz.questions.flatMap(x => x.questionParts).map(x => ({
  id: x.id,
  question: x.text,
  answer: x.answer,
  points: x.points
}));
const expandedRows = ref<DataTableExpandedRows>()
// expandedRows.value = questions.reduce((acc, p) => (acc[p.id] = true) && acc, {})
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <Card>
      <template #title>
        Frågor
      </template>
      <template #subtitle>
        {{ questions.length }} st
      </template>
      <template #content>
        <div v-for="(q, index) in questions" :key="q.id">
          <div class="flex justify-between">
            <div>{{ q.question }}</div>
            <div class="text-slate-400">
              #{{ index + 1 }}
            </div>
          </div>
          <div class="flex justify-between">
            <div class="text-slate-500">
              &emsp;{{ q.answer }}
            </div>
            <div class="text-slate-400">
              {{ q.points }}p
            </div>
          </div>
          <Divider />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { Quiz } from '~/types';

const { params } = useRoute();
const data = await useFetch(`/api/quiz/${params.id}`)
const quiz = JSON.parse(JSON.stringify(data.data.value)) as Quiz;

const header = useState("header")
header.value = new Date(quiz.date).toLocaleDateString("sv-SE")

const questions = quiz.questions.map(x => ({
  id: x.id,
  questionParts: x.questionParts
}));
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <Card>
      <template #title>
        Fakta
      </template>
      <template #content>
        <div>
          Plats: {{ quiz.venue.name }}, {{ quiz.venue.location }}
        </div>
        <div>
          Quizmaster: {{ quiz.host.name }}
        </div>
      </template>
    </Card>
    <Card>
      <template #title>
        <i class="pi pi-question-circle" />&nbsp;Frågor
      </template>
      <template #subtitle>
        {{ questions.length }} st
      </template>
      <template #content>
        <div v-for="(q, index) in questions" :key="q.id">
          <template v-if="q.questionParts.length == 1">
            <div class="flex justify-between">
              <div>{{ q.questionParts[0].text }}</div>
              <div class="text-slate-400 text-sm">
                #{{ index + 1 }}
              </div>
            </div>
            <div class="flex justify-between">
              <div class="text-slate-500">
                &emsp;{{ q.questionParts[0].answer }}
              </div>
              <div class="text-slate-400 text-sm">
                {{ q.questionParts[0].points }}p
              </div>
            </div>
          </template>
          <template v-for="(qp, index2) in q.questionParts" v-else :key="qp.id">
            <div class="flex justify-between">
              <div>{{ qp.text }}</div>
              <div class="text-slate-400 text-sm">
                #{{ index + 1 }}{{ q.questionParts.length > 1 ? `${String.fromCharCode(97 + index2)}` : '' }}
              </div>
            </div>
            <div class="flex justify-between">
              <div class="text-slate-500">
                &emsp;{{ qp.answer }}
              </div>
              <div class="text-slate-400 text-sm">
                {{ qp.points.toString().replace(".", ",") }}p
              </div>
            </div>
            <br v-if="index2 < q.questionParts.length - 1">
          </template>
          <Divider />
        </div>
      </template>
    </Card>
  </div>
</template>

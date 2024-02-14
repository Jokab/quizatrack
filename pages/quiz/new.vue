<script setup lang="ts">
import type { CreateCompetitorAnswer, CreateQuestionPart, Question, QuestionPart, Quiz } from "~/types";

const date = ref<string>();
const location = ref<string>();
const host = ref<string>();

const questions = ref<CreateQuestionPart[]>([{
  text: "",
  answer: "",
  points: 1,
  index: 1,
}]);

function addQuestion(): void {
  questions.value.push({
    text: "",
    answer: "",
    points: 1,
    index: 1,
  });
}

const competitorAnswers = ref<CreateCompetitorAnswer[]>([]);

function onTypeQ(e: string | undefined, index: number): void {
  questions.value[index].text = e as string;
}
function onTypeA(e: string | undefined, index: number): void {
  questions.value[index].answer = e as string;
}
function onTypeCompA(e: string | undefined, index: number): void {
  console.log(competitorAnswers.value[index]);
  if (!competitorAnswers.value[index]) {
    competitorAnswers.value[index] = {
      text: e as string,
      points: 1,
    };
  }
  // competitorAnswers.value[index].text = e as string;
}
async function save(): Promise<void> {
  const quest = questions.value.map((q, index) => ({
    questionParts: [({
      text: q.text,
      answer: q.answer,
      points: 1,
      index,
    }) as QuestionPart],
    index,
  }) as Question);

  await $fetch<Quiz>("/api/quiz", {
    method: "POST",
    body: {
      date: new Date(),
      venue: {
        location: location.value,
        // name: body.venue.name,
      },
      host: {
        name: host.value,
      },
      questions: quest,
      competitors: [{
        team: {
          id: 0,
          name: "Skruvkarbinerna",
        },
        competitorAnswers: competitorAnswers.value.map(x => ({
          text: x.text,
          points: x.points,
        })),
      }],
    },
  });
}
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <Card>
      <template #title>
        Ny quiz
      </template>
      <template #content>
        <div class="flex flex-col gap-8">
          <div class="grid grid-cols-3 gap-8 w-full mt-4">
            <div class="flex flex-col w-1/2">
              <label for="date">Datum</label>
              <Calendar id="date" v-model="date" date-format="yy-mm-dd" />
            </div>
            <div class="flex flex-col w-1/2">
              <label for="location">Plats</label>
              <InputText id="location" v-model="location" />
            </div>
            <div class="flex flex-col w-1/2">
              <label for="host">Host</label>
              <InputText id="host" v-model="host" />
            </div>
            <template v-for="(q, index) in questions" :key="index">
              <div class="flex flex-col">
                <label for="question1" class="font-bold">Fråga {{ index + 1 }}</label>
                <InputText id="question1" :value="questions[index].text" @update:model-value="(e: string | undefined) => onTypeQ(e, index)" />
              </div>
              <div class="flex flex-col">
                <label for="question1">Facit {{ index + 1 }}</label>
                <InputText id="question1" :value="questions[index].answer" @update:model-value="(e: string | undefined) => onTypeA(e, index)" />
              </div>
              <div class="flex flex-col">
                <label for="question1">Vårt svar {{ index + 1 }}</label>
                <InputText id="question1" :value="competitorAnswers[index]?.text" @update:model-value="(e: string | undefined) => onTypeCompA(e, index)" />
              </div>
            </template>
          </div>
          <Button class="w-1/4" @click="addQuestion">
            Ny fråga
          </Button>
          <Button class="w-1/4" @click="save">
            Spara
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>

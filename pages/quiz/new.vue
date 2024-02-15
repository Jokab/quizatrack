<script setup lang="ts">
import { useNewQuizStore } from "~/store";
import type { CreateCompetitorAnswer, CreateQuestionPart, Question, QuestionPart, Quiz } from "~/types";

const store = useNewQuizStore();
const date = ref<string>();

// const location = ref<string>();
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

const saving = ref<boolean>();
const errorSaving = ref<boolean>();

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
  saving.value = true;
  errorSaving.value = false;
  try {
    await $fetch<Quiz>("/api/quiz", {
      method: "POST",
      body: {
        date: new Date(),
        venue: {
          location: store.location,
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
  catch (error: any) {
    errorSaving.value = true;
    console.error("Failed to save");
  }
  finally {
    saving.value = false;
  }
}
// const storeLocation = computed<string | undefined>({
//   get: () => {
//     console.log(store.location, store.location);
//     return store.location;
//   },
//   set: (val: Nullable<string>) => {
//     store.location = val as string;
//   },
// });
// console.log(store.location);
// const { location } = storeToRefs(store);
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <Card class="relative">
      <template #title>
        Ny quiz
      </template>
      <template #content>
        <div class="flex flex-col gap-8 relative">
          <div class="grid grid-cols-3 gap-8 w-full mt-4">
            <div class="flex flex-col w-1/2">
              <label for="date">Datum</label>
              <Calendar id="date" v-model="date" date-format="yy-mm-dd" />
            </div>
            <div class="flex flex-col w-1/2">
              <label for="location">Plats</label>
              <!-- <input v-model="store.location"> -->
              <InputText id="location" v-model="store.location" />
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
          <Button label="Ny fråga" icon="pi pi-plus" rounded raised class="w-40" @click="addQuestion" />
        </div>
        <div class="flex flex-row gap-4 items-center text-red-600 absolute top-4 right-4">
          <div v-if="errorSaving">
            Misslyckades att spara :-(
          </div>
          <Button label="Spara" :loading="saving" icon="pi pi-save" rounded raised class="w-32" @click="save" />
        </div>
      </template>
    </Card>
  </div>
</template>

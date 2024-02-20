<script setup lang="ts">
import { useNewQuizStore } from "~/store";
import type { Question, QuestionPart, Quiz } from "~/types";

const store = useNewQuizStore();

const saving = ref<boolean>();
const errorSaving = ref<boolean>();

async function save(): Promise<void> {
  if (!store.questions)
    return;

  const myTimerPromise = new Promise((resolve, _) => {
    setTimeout(resolve, 2000);
  });

  saving.value = true;
  errorSaving.value = false;
  try {
    Promise.all([myTimerPromise, postQuiz()]).then(() => {
      saving.value = false;
    });
  }
  catch (error: any) {
    errorSaving.value = true;
    console.error("Failed to save");
  }
}
function postQuiz(): Promise<any> {
  const quest = store.questions.map((q, index) => ({
    questionParts: [({
      text: q.text,
      answer: q.answer,
      points: 1,
      index,
    }) as QuestionPart],
    index,
  }) as Question);

  return $fetch<Quiz>("/api/quiz", {
    method: "POST",
    body: {
      date: store.date,
      venue: {
        location: store.location,
      },
      host: {
        name: store.host,
      },
      questions: quest,
      competitors: [{
        placement: Number(store.placement),
        team: {
          id: 0,
          name: "Skruvkarbinerna",
        },
        competitorAnswers: store.competitorAnswers.map(x => ({
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
    <Card class="relative">
      <template #title>
        Ny quiz
      </template>
      <template #content>
        <div class="flex flex-col gap-8 relative">
          <div class="grid grid-cols-3 gap-8 w-full mt-4">
            <div class="flex flex-col w-1/2">
              <label for="date">Datum</label>
              <Calendar id="date" v-model="store.date" date-format="yy-mm-dd" />
            </div>
            <div class="flex flex-col w-1/2">
              <label for="location">Plats</label>
              <InputText id="location" v-model="store.location" />
            </div>
            <div class="flex flex-col w-1/2">
              <label for="host">Host</label>
              <InputText id="host" v-model="store.host" />
            </div>
            <div class="flex flex-col w-1/2">
              <label for="host">Slutplacering</label>
              <InputText id="host" v-model="store.placement" />
            </div>
            <div />
            <div />
            <template v-for="(q, index) in store.questions" :key="index">
              <div class="flex flex-col">
                <label for="question1" class="font-bold">Fråga {{ index + 1 }}</label>
                <InputText id="question1" :value="store.questions[index].text" @update:model-value="(e: string | undefined) => store.onTypeQ(e, index)" />
              </div>
              <div class="flex flex-col">
                <label for="question2">Facit {{ index + 1 }}</label>
                <InputText id="question2" :value="store.questions[index].answer" @update:model-value="(e: string | undefined) => store.onTypeA(e, index)" />
              </div>
              <div class="flex flex-col">
                <label for="question3">Vårt svar {{ index + 1 }}</label>
                <InputText id="question3" :value="store.competitorAnswers[index]?.text" @update:model-value="(e: string | undefined) => store.onTypeCompA(e, index)" />
              </div>
            </template>
          </div>
          <Button label="Ny fråga" icon="pi pi-plus" rounded raised class="w-40" @click="store.addQuestion" />
        </div>
        <div class="flex flex-row gap-4 items-center text-red-600 absolute top-4 right-4">
          <div v-if="errorSaving">
            Misslyckades att spara :-(
          </div>
          <Button label="Spara" :loading="saving" :disabled="saving" icon="pi pi-save" rounded raised class="w-32" @click="save" />
          <Button severity="secondary" icon="pi pi-trash" rounded @click="store.$reset()" />
        </div>
      </template>
    </Card>
  </div>
</template>

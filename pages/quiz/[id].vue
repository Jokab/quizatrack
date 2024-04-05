<script setup lang="ts">
import type { Quiz } from "~/types";

const { params } = useRoute();
const data = await useFetch(`/api/quiz/${params.id}`);
const quiz = JSON.parse(JSON.stringify(data.data.value)) as Quiz;

const header = useState("header");
const router = useRouter();

header.value = new Date(quiz.date).toLocaleDateString("sv-SE");

const questions = quiz.questions.map(x => ({
  id: x.id,
  questionParts: x.questionParts,
}));

const errorDeleting = false;

function mapCategory(categoryKey: string): string {
  switch (categoryKey) {
    case "music":
      return "Musik";
    case "science":
      return "Vetenskap";
    case "geography":
      return "Geografi";
    case "languages":
      return "Språk";
    case "movies":
      return "Film";
    case "sports":
      return "Sport";
    case "tech":
      return "Teknik";
    case "food":
      return "Mat & dryck";
    case "history":
      return "Historia";
    case "literature":
      return "Litteratur";
    case "society":
      return "Samhälle";
    case "tv":
      return "TV";
    case "logic":
      return "Kluring";
    case "nature":
      return "Natur";
    case "business":
      return "Näringsliv";
    case "design":
      return "Design";
  }
  return "";
}

async function deleteQuiz() {
  try {
    await $fetch(`/api/quiz/${params.id}`, { method: "DELETE" });
    const toast = usePVToastService();
    toast.add({ severity: "success", summary: "Info", detail: "Quiz borttagen", life: 3000 });
    router.go(-1);
  }
  catch (error: any) {
    console.error(error);
  }
}
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <Card class="relative">
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
        <div class="flex flex-row gap-4 items-center text-red-600 absolute top-4 right-4">
          <div v-if="errorDeleting">
            Misslyckades att spara :-(
          </div>
          <TrashButton @click="deleteQuiz" />
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
          <template v-if="q.questionParts.length === 1">
            <div class="flex justify-between">
              <div>{{ q.questionParts[0].text }}&nbsp;&nbsp;<span class="text-slate-400 text-sm">{{ mapCategory(q.questionParts[0].category) }}</span></div>
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
              <div>{{ qp.text }}&nbsp;&nbsp;<span class="text-slate-400 text-sm">{{ mapCategory(qp.category) }}</span></div>
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

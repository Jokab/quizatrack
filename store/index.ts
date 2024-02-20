import { defineStore } from "pinia";
import type { CreateCompetitorAnswer, CreateQuestionPart } from "~/types";

export interface NewQuizState {
  questions: CreateQuestionPart[];
  competitorAnswers: CreateCompetitorAnswer[];
  date: string | undefined;
  location: string | undefined;
  host: string | undefined;
  placement: string | undefined;
}

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useNewQuizStore = defineStore("newQuiz", {
  state: (): NewQuizState => {
    return {
      questions: [{
        text: "",
        answer: "",
        points: 1,
        index: 1,
      }],
      competitorAnswers: [],
      date: undefined,
      location: undefined,
      host: undefined,
      placement: undefined,
    };
  },
  actions: {
    addQuestion(): void {
      if (!this.questions)
        return;
      this.questions.push({
        text: "",
        answer: "",
        points: 1,
        index: 1,
      });
    },
    onTypeQ(e: string | undefined, index: number): void {
      if (!this.questions)
        return;
      this.questions[index].text = e as string;
    },
    onTypeA(e: string | undefined, index: number): void {
      if (!this.questions)
        return;
      this.questions[index].answer = e as string;
    },
    onTypeCompA(e: string | undefined, index: number): void {
      if (!this.competitorAnswers[index]) {
        this.competitorAnswers[index] = {
          text: e as string,
          points: 1,
        };
      }
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "lax",
    }),
  },
  // const date = ref<string>();
  // const location = ref<string>();
  // const host = ref<string>();

  // const this.questions = ref<CreateQuestionPart[]>([{
  //   text: "",
  //   answer: "",
  //   points: 1,
  //   index: 1,
  // }]);

  // function addQuestion(): void {
  //   questions.value.push({
  //     text: "",
  //     answer: "",
  //     points: 1,
  //     index: 1,
  //   });
  // }

  // const competitorAnswers = ref<CreateCompetitorAnswer[]>([]);

  // function onTypeQ(e: string | undefined, index: number): void {
  //   questions.value[index].text = e as string;
  // }
  // function onTypeA(e: string | undefined, index: number): void {
  //   questions.value[index].answer = e as string;
  // }
  // function onTypeCompA(e: string | undefined, index: number): void {
  //   console.log(competitorAnswers.value[index]);
  //   if (!competitorAnswers.value[index]) {
  //     competitorAnswers.value[index] = {
  //       text: e as string,
  //       points: 1,
  //     };
  //   }
  // }

  // return { date, location, host, questions, addQuestion, competitorAnswers, onTypeQ, onTypeA, onTypeCompA };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNewQuizStore, import.meta.hot));

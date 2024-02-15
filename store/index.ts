import { defineStore } from "pinia";

export interface NewQuizState {
  // date: string;
  location: string | undefined;
  // host: string;

}

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useNewQuizStore = defineStore("newQuiz", {
  state: (): NewQuizState => {
    return {
      location: undefined,
    };
  },
  persist: true,
  // const date = ref<string>();
  // const location = ref<string>();
  // const host = ref<string>();

  // const questions = ref<CreateQuestionPart[]>([{
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

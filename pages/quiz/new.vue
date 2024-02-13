<script setup lang="ts">
const date = ref();
const location = ref();
const host = ref();
const question = ref();

const questions = ref<any>([{}]);

function addQuestion() {
  questions.value.push!({});
}
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <Card>
      <template #title>
        Ny quiz
      </template>
      <template #content>
        <div class="flex flex-col gap-y-8 mt-4">
          <FloatLabel>
            <Calendar id="date" v-model="date" date-format="yy-mm-dd" />
            <label for="date">Datum</label>
          </FloatLabel>
          <FloatLabel>
            <InputText id="location" v-model="location" />
            <label for="location">Plats</label>
          </FloatLabel>
          <FloatLabel>
            <InputText id="host" v-model="host" />
            <label for="host">Host</label>
          </FloatLabel>
          <template v-for="(q, index) in questions" :key="index">
            <FloatLabel>
              <InputText id="question1" v-model="question" />
              <label for="question1">Fråga 1</label>
            </FloatLabel>
          </template>
          <Button @click="addQuestion">
            Ny fråga
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>

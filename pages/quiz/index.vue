<script setup lang="ts">
const { data } = await useFetch(`/api/quiz`);
</script>

<template>
  <div>
    <!-- <ul>
      <li v-for="quiz in data" :key="quiz.id">
        <NuxtLink :to="`/quiz/1`">
          {{ quiz.date }}
        </NuxtLink>
      </li>
    </ul> -->
  </div>
</template>

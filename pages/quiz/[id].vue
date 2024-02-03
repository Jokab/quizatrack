<script setup lang="ts">
const { params } = useRoute();
const { data } = await useFetch(`/api/quiz/${params.id}`);
</script>

<template>
  <div>
    <h1>Quiz {{ data!.venueId }}</h1>
    <!-- Vi är bäst! {{ params.id }}
    {{ msg.data }} -->
  </div>
</template>

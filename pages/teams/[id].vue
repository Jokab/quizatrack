<script setup lang="ts">
const { params } = useRoute();
const msg = await useFetch(`/api/team/${params.id}`);
</script>

<template>
  <div>
    <h1>Skruvkarbinerna</h1>
    Vi är bäst! {{ params.id }}
    {{ msg.data }}
  </div>
</template>

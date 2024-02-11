<script setup lang="ts">
const teams = await useFetch("/api/teams", { method: "GET" });
</script>

<template>
  <div>
    <h1>Lag</h1>
    <ul>
      <li
        v-for="team in teams.data.value"
        :key="team.id"
      >
        <NuxtLink :to="`/teams/${team.id}`">
          Skruvkarbinerna
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

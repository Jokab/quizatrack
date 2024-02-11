<script setup lang="ts">
const teams = await useFetch("/api/teams", { method: "GET" });
</script>

<template>
  <div>
    <Card>
      <template #title>
        Alla lag
      </template>
      <template #content>
        <ul>
          <li v-for="team in teams.data.value" :key="team.id">
            <NuxtLink :to="`/teams/${team.id}`">
              {{ team.name }}
            </NuxtLink>
          </li>
        </ul>
      </template>
    </Card>
  </div>
</template>

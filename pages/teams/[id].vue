<script setup lang="ts">
// import type { team } from "@prisma/client";
import { request, gql } from "graphql-request";

const { params } = useRoute();
// const msg = await useFetch(`/api/team/${params.id}`);
// const qiozes = await useFetch(`/api/team/${params.id}`);
const id = params.id;
const query = gql`
  {
    team(id: "${id}") {
      id
      name
    }
  }
`;
const data = await request("http://localhost:3001/graphql", query);
console.log("data: " + JSON.stringify(data));
</script>

<template>
  <div>
    <h1>Skruvkarbinerna</h1>
    Vi är bäst! {{ params.id }}
    <!-- {{ msg.data }} -->
    <br />data: {{ data }}
  </div>
</template>

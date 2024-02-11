<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'm-2 md:container md:mx-auto'
  }
})

const router = useRouter();

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => {
      router.push("/")
    }
  }
])
</script>

<template>
  <div class="flex-col">
    <Menubar class="mb-2" :model="items" />
    <NuxtPage class="" />
  </div>
</template>

<style>
.grey-background {
  background-color: #fafafa;
}
</style>
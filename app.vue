<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-gray-100 m-2 md:container md:mx-auto'
  }
})

const router = useRouter();

const items = ref([
  {
    label: "Hem",
    icon: "pi pi-home",
    command: () => {
      router.push("/")
    }
  }
])
const teamName = useState('header')

</script>

<template>
  <div class="flex-col">
    <Menubar class="mb-2" :model="items">
      <template #end>
        {{ teamName }}
      </template>
    </Menubar>
    <NuxtPage />
  </div>
</template>

<style>
.grey-background {
  background-color: #fafafa;
}
</style>
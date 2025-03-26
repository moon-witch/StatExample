<script setup lang="ts">
import {useRoute} from "vue-router";
import {useSupabaseStore} from "@/stores/useSupabase.ts";
import {computed, onMounted, onUnmounted} from "vue";
import TicketRow from "@/components/ticket-overview/TicketRow.vue";

const route = useRoute()
const supabaseStore = useSupabaseStore()

const projectId = computed(() => Number(route.params.id))
const projectData = computed(() => {
  return supabaseStore.allProjects.find((project) => project.id === projectId.value)
})
const tickets = computed(() => {
  return supabaseStore.projectData
})

onMounted(() => {
  supabaseStore.getTicketsForProject(route.params.id.toString())
})

onUnmounted(() => {
  supabaseStore.resetTicketData()
})
</script>

<template>
  <main>
    <header v-if="projectData" class="header">
      <h2 class="name">{{ projectData.name }}</h2>
      <p>{{ projectData.description }}</p>
      <div class="data">
        <time>{{ projectData.start_date }}</time>
        -
        <time>{{ projectData.end_date }}</time>
      </div>
    </header>
    <section class="tickets">
      <TicketRow v-for="ticket in tickets" :data="ticket" />
    </section>
  </main>
</template>

<style scoped lang="scss">
.header {
  border: 1px solid $darkgray;
  border-radius: $radius;
  width: 300px;
  padding: $spacer-sm;

  .name {
    font-weight: bold;
    font-size: 1.25rem;
    margin-top: 0;
  }

  .data {
    display: flex;
    gap: .5rem;
    opacity: .75;
    margin-top: $spacer-sm;
    font-size: .9rem;
  }
}

.tickets {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .5rem;
  margin-top: $spacer-sm;
  border: 1px solid $darkgray;
  padding: $spacer-sm;
  border-radius: $radius;
}
</style>

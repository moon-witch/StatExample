<script setup lang="ts">
import {useRoute} from "vue-router";
import {useSupabaseStore} from "@/stores/supabaseStore.ts";
import {computed, onMounted, onUnmounted, ref} from "vue";
import TicketRow from "@/components/ticket-overview/TicketRow.vue";
import Loading from "@/components/Loading.vue";
import { sortArrayOfObjects } from "@/helpers/sortArrayOfObjects.ts";
import NewTicketDrawer from "@/components/drawer/NewTicketDrawer.vue";

const route = useRoute()
const supabaseStore = useSupabaseStore()

const projectId = computed(() => Number(route.params.id))
const projectData = computed(() => {
  return supabaseStore.allProjects.find((project) => project.id === projectId.value)
})

const newTicketOpen = ref<boolean>(false)
const tickets = computed(() => {
  return sortArrayOfObjects(supabaseStore.projectData, 'id')
})

const ticketsLoading = computed(() => {
  return supabaseStore.ticketsLoading
})

onMounted(() => {
  supabaseStore.getAllProjects()
  supabaseStore.getTicketsForProject(route.params.id.toString())
})

onUnmounted(() => {
  supabaseStore.resetTicketData()
})
</script>

<template>
  <main>
    <div class="header-wrapper">
      <header v-if="projectData" class="header">
        <h2 class="name">{{ projectData.name }}</h2>
        <p>{{ projectData.description }}</p>
        <div class="data">
          <time>{{ projectData.start_date }}</time>
          -
          <time>{{ projectData.end_date }}</time>
        </div>
      </header>
    </div>
    <section class="tickets">
      <div class="ticket-actionbar">
        <span>placeholder</span>
        <button class="new-project" @click="newTicketOpen = true">+</button>
      </div>
      <Loading v-if="ticketsLoading" />
      <TicketRow class="row" v-for="ticket in tickets" :data="ticket" />
     </section>
    <NewTicketDrawer :project="projectData" :is-open="newTicketOpen" @close="newTicketOpen = false" />
  </main>
</template>

<style scoped lang="scss">
.header-wrapper {
  padding-bottom: $spacer-sm;
  border-bottom: 1px solid $darkgray;

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
}

.tickets {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: .5rem;
  margin-top: $spacer-sm;
  border: 1px solid $darkgray;
  border-radius: $radius;
  position: relative;
  height: 60dvh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: $darkgray $primary;

  .ticket-actionbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    background: $primary;
    padding: $spacer-sm;
    z-index: 5;
    border-bottom: 1px solid $darkgray;

    .new-project {
      align-self: end;
      border: 1px solid $darkgray;
      border-radius: $radius;
      background: $primary;
      color: $text;
      font-size: 1.25rem;
      width: 30px;
      height: 30px;
      cursor: pointer;

      &:hover {
        border: 1px solid $lightgray;
      }
    }
  }
  .row {
    margin: 0 $spacer-sm;

    &:last-of-type {
      margin-bottom: $spacer-sm;
    }
  }
}
</style>

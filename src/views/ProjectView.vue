<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useSupabaseStore} from "@/stores/supabaseStore.ts";
import {computed, onMounted, onUnmounted, ref} from "vue";
import TicketRow from "@/components/ticket-overview/TicketRow.vue";
import Loading from "@/components/Loading.vue";
import { sortArrayOfObjects } from "@/helpers/sortArrayOfObjects.ts";
import NewTicketDrawer from "@/components/drawer/NewTicketDrawer.vue";
import EditTicketDrawer from "@/components/drawer/EditTicketDrawer.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import DefaultModal from "@/components/modal/DefaultModal.vue";

const route = useRoute()
const router = useRouter()
const supabaseStore = useSupabaseStore()

const projectId = computed(() => Number(route.params.id))
const projectData = computed(() => {
  return supabaseStore.allProjects.find((project) => project.id === projectId.value)
})

const deleteConfirmationOpen = ref<boolean>(false)
const deleteProject = () => {
  supabaseStore.deleteProject(projectId.value)
  router.push('/projects')
}

const newTicketOpen = ref<boolean>(false)
const editTicketOpen = ref<boolean>(false)
const tickets = computed(() => {
  return sortArrayOfObjects(supabaseStore.projectData, 'id')
})

const ticketsLoading = computed(() => {
  return supabaseStore.ticketsLoading
})

const openTicket = ref<Record<string, any>>({})
const handleEditTicket = (ticketData: Record<string, any>) => {
  openTicket.value = ticketData
  editTicketOpen.value = true
}

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
      <DefaultButton @click="deleteConfirmationOpen = true">Delete project</DefaultButton>
      <DefaultModal class="modal" :is-open="deleteConfirmationOpen" @close="deleteConfirmationOpen = false">
        <h4>Delete project: {{ projectData.name }}</h4>
        <p>You are about to delete the project <span class="name">{{ projectData.name }}</span>.</p>
        <p class="warning">Caution: This action is irreversible!</p>
        <div class="buttons">
          <DefaultButton @click="deleteProject">Delete</DefaultButton>
          <DefaultButton @click="deleteConfirmationOpen = false">Cancel</DefaultButton>
        </div>
      </DefaultModal>
    </div>
    <section class="tickets">
      <div class="ticket-actionbar">
        <span>Tickets</span>
        <button class="new-ticket" @click="newTicketOpen = true">+</button>
      </div>
      <transition>
        <Loading v-if="ticketsLoading" backdrop />
      </transition>
      <div v-if="tickets.length === 0" class="no-tickets">No tickets</div>
      <TicketRow class="row" v-for="ticket in tickets" :data="ticket" @click="handleEditTicket(ticket)"/>
     </section>
    <NewTicketDrawer :project="projectData" :is-open="newTicketOpen" @close="newTicketOpen = false" />
    <EditTicketDrawer :ticket="openTicket" :project="projectData" :is-open="editTicketOpen" @close="editTicketOpen = false"/>
  </main>
</template>

<style scoped lang="scss">
.header-wrapper {
  padding-bottom: $spacer-sm;
  border-bottom: 1px solid $darkgray;
  display: flex;
  gap: $spacer-sm;
  align-items: flex-start;

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

  .modal {
    .name {
      font-weight: bold;
    }

    .warning {
      color: $danger;
    }

    .buttons {
      display: flex;
      justify-content: flex-start;
      gap: $spacer-sm;
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

    .new-ticket {
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

  .no-tickets {
    padding-top: $spacer-sm;
    align-self: center;
    opacity: .7;
  }

  .row {
    margin: 0 $spacer-sm;

    &:last-of-type {
      margin-bottom: $spacer-sm;
    }
  }
}
</style>

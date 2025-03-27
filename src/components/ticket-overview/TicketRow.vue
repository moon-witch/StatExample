<script setup lang="ts">
import {computed, defineProps, onMounted, ref} from 'vue'
import { truncateText } from "@/helpers/truncateText.ts";
import {useUserName} from "@/composables/useUserName.ts";
import {getInitials} from "@/helpers/getInitials.ts";
import Select from "@/components/select/Select.vue";
import {supabase} from "@/lib/supabaseClient.ts";
import {useSupabaseStore} from "@/stores/supabaseStore.ts";

const PRIORITY_OPTIONS = ['low', 'medium', 'high'];
const STATUS_OPTIONS = ['to-do', 'in progress', 'in review', 'done'];

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

const userNameComposable = useUserName()
const supabaseStore = useSupabaseStore()

const fullUserName = ref<string>('')
const userName = computed(() => {
  const user = userNameComposable.currentUserName.value[0];

  if (!user) return '';

  fullUserName.value = `${user.first_name} ${user.last_name}`;
  return getInitials(user.first_name, user.last_name);
});

const updatePriority = (newPrio: string, ticketId: string) => {
  supabaseStore.updateTicketData('priority', newPrio, ticketId)
}

const updateStatus = (newStatus: string, ticketId: string) => {
  supabaseStore.updateTicketData('status', newStatus, ticketId)
}

onMounted(() => {
  userNameComposable.getUserNameFromId(props.data.assigned_to)
})
</script>

<template>
  <section v-if="data" class="ticket-container">
    <span class="ticket-id"> {{ data.id }} </span>
    <span class="assignee">
      {{ userName }}
      <span class="tooltip">
        {{ fullUserName }}
      </span>
    </span>
    <span class="title">
      {{ truncateText(data.title, 15) }}
      <span class="tooltip">
        {{ data.title }}
      </span>
    </span>
    <span class="priority">
      Priority:
      <Select
        :options="PRIORITY_OPTIONS"
        :selected-option="data.priority"
        @selected="updatePriority($event, data.id)"
      />
    </span>
    <span class="status">
      Status:
      <Select
        :options="STATUS_OPTIONS"
        :selected-option="data.status"
        @selected="updateStatus($event, data.id)"
      />
    </span>
  </section>
</template>

<style scoped lang="scss">
.ticket-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .5rem;
  border: 1px solid $darkgray;
  padding: $spacer-sm;
  border-radius: $radius;
  cursor: pointer;
  transition: $transition;

  &:hover {
    border: 1px solid $lightgray;
  }

  .ticket-id {
    width: 20px;
  }

  .assignee {
    border: 1px solid $darkgray;
    padding: .5rem .5rem .35rem .5rem;
    border-radius: 100px;
    background: $lightgray;
    color: $primary;
    position: relative;

    &:hover {
      .tooltip {
        max-width: 100px;
        padding: calc($spacer-sm / 2) $spacer-sm;
        border: 1px solid $darkgray;
        opacity: 1;
      }
    }

    .tooltip {
      max-width: 0;
      background-color: $primary;
      color: $text;
      font-size: .9rem;
      text-align: center;
      border-radius: $radius;
      position: absolute;
      z-index: 1;
      bottom: calc(100% + 5px);
      left: 50%;
      margin-left: -20px;
      transition: $transition;
      overflow: hidden;
      opacity: 0;
      text-wrap: nowrap;
    }
  }

  .title {
    font-weight: bold;
    width: 150px;
    position: relative;

    &:hover {
      .tooltip {
        max-width: 200px;
        padding: calc($spacer-sm / 2) $spacer-sm;
        border: 1px solid $darkgray;
        opacity: 1;
      }
    }

    .tooltip {
      max-width: 0;
      background-color: $primary;
      color: $text;
      font-size: .9rem;
      text-align: center;
      border-radius: $radius;
      position: absolute;
      z-index: 1;
      bottom: calc(100% + 5px);
      left: 50%;
      margin-left: -75px;
      transition: $transition;
      overflow: hidden;
      opacity: 0;
      text-wrap: nowrap;
    }
  }

  .priority {
    width: 150px;
  }
}
</style>

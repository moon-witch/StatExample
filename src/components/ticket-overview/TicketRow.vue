<script setup lang="ts">
import {computed, defineProps, onMounted, ref} from 'vue'
import { truncateText } from "@/helpers/truncateText.ts";
import {useUserName} from "@/composables/useUserName.ts";
import {getInitials} from "@/helpers/getInitials.ts";
import Select from "@/components/select/Select.vue";
import {useSupabaseStore} from "@/stores/supabaseStore.ts";
import Tooltip from "@/components/Tooltip.vue";

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
  supabaseStore.updateSingleTicketField('priority', newPrio, ticketId, props.data.project_id)
}

const updateStatus = (newStatus: string, ticketId: string) => {
  supabaseStore.updateSingleTicketField('status', newStatus, ticketId, props.data.project_id)
}

onMounted(() => {
  userNameComposable.getUserNameFromId(props.data.assigned_to)
})
</script>

<template>
  <section v-if="data" class="ticket-container">
    <span class="ticket-id"> {{ data.id }} </span>
    <Tooltip :text="fullUserName">
      <span class="assignee">
        {{ userName }}
      </span>
    </Tooltip>
    <Tooltip :text="data.title" bold wrap-width="150px">
      {{ truncateText(data.title, 15) }}
    </Tooltip>
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
  }

  .priority {
    width: 150px;
  }
}
</style>

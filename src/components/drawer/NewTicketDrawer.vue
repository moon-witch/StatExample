<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import Drawer from "@/components/drawer/Drawer.vue";
import {useUserStore} from "@/stores/userStore.ts";
import CustomSelect from "@/components/select/Select.vue";
import {useSupabaseStore} from "@/stores/supabaseStore.ts";

const PRIORITY_OPTIONS = ['low', 'medium', 'high'];
const STATUS_OPTIONS = ['to-do', 'in progress', 'in review', 'done']

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
    required: true,
  },
  project: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const userStore = useUserStore()
const supabaseStore = useSupabaseStore()

const userList = computed(() => {
  return userStore.allUsers
})

const showDrawer = computed(() => {
  return props.isOpen
})

const closeDrawer = () => {
  emit('close');
  resetForm()
}

const form = reactive({
  title: '',
  description: '',
  priority: '',
  status: '',
  due_date: '',
  project_id: '',
  assigned_to: ''
})

const resetForm = () => {
  form.title = ''
  form.description = ''
  form.priority = ''
  form.status = ''
  form.due_date = ''
  form.project_id = ''
  form.assigned_to = ''
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
}

const errors = reactive<Record<string, string>>({})

function validate() {
  errors.title = form.title ? '' : 'Title is required'
  errors.priority = form.priority ? '' : 'Priority is required'
  errors.status = form.status ? '' : 'Status is required'
  errors.due_date = form.due_date ? '' : 'Due date is required'
  errors.project_id = form.project_id ? '' : 'Project is required'
  errors.assigned_to = form.assigned_to ? '' : 'Assignee is required'

  return Object.values(errors).every((error) => !error)
}


function handleSubmit() {
  if (props.project) form.project_id = props.project.id
  if (!validate()) return

  supabaseStore.createNewTicket(form)
  closeDrawer()
}

onMounted(() => {
  userStore.getUserList()
})
</script>

<template>
  <Drawer :is-open="showDrawer" @close="closeDrawer">
    <h2>Create new ticket</h2>
    <p v-if="project">in {{ project.name }}</p>
    <form @submit.prevent="handleSubmit" class="ticket-form">
      <label>
        Title
        <input v-model="form.title" type="text" />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </label>
      <label>
        Description
        <textarea v-model="form.description" rows="4" />
      </label>
      <div class="prio-status">
        <label>
          Priority
          <CustomSelect :options="PRIORITY_OPTIONS" selected-option="choose priority" @selected="form.priority = $event"/>
          <span v-if="errors.priority" class="error">{{ errors.priority }}</span>
        </label>
        <label>
          Status
          <CustomSelect :options="STATUS_OPTIONS" selected-option="choose priority" @selected="form.status = $event"/>
          <span v-if="errors.status" class="error">{{ errors.status }}</span>
        </label>
      </div>
      <label>
        Due Date
        <input v-model="form.due_date" type="date" />
        <span v-if="errors.due_date" class="error">{{ errors.due_date }}</span>
      </label>
      <label>
        Assign To
        <select class="user-select" v-model="form.assigned_to">
          <option disabled value="">Select user</option>
          <option v-for="user in userList" :key="user.id" :value="user.id">
            {{ user.first_name }} {{ user.last_name }}
          </option>
        </select>
        <span v-if="errors.assigned_to" class="error">{{ errors.assigned_to }}</span>
      </label>

      <button type="submit">Create Ticket</button>
    </form>
  </Drawer>
</template>

<style scoped lang="scss">
h2 {
  font-size: 1.25rem;
  margin-top: 0;
}
.ticket-form {
  display: flex;
  flex-direction: column;
  gap: $spacer-sm;

  .prio-status {
    display: flex;
    justify-content: space-between;
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    gap: .25rem;

    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(.9);
    }

    input,
    textarea {
      padding: .25rem .5rem;
      border: 1px solid $darkgray;
      border-radius: $radius;
      background: $primary;
      color: $text;
      font-size: 1rem;

      &:focus {
        outline: 1px solid $lightgray;
      }
    }

    .error {
      color: $warning;
      font-size: 0.85rem;
    }

    .user-select {
      background: $primary;
      color: $text;
      border: 1px solid $darkgray;
      border-radius: $radius;
      font-family: 'Nohemi', sans-serif;
      padding: .5rem $spacer-sm;

      option:hover {
        background: $darkgray;
        color: red;
      }
    }
  }

  button[type='submit'] {
    align-self: flex-start;
    margin-top: $spacer-sm;
    padding: 0.5rem 1rem;
    border: none;
    background-color: $primary;
    color: $text;
    border-radius: $radius;
    cursor: pointer;
    font-weight: bold;
    transition: $transition;

    &:hover {
      background-color: $darkgray;
    }
  }
}
</style>

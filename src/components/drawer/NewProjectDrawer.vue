<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import Drawer from "@/components/drawer/Drawer.vue";
import {useUserStore} from "@/stores/userStore.ts";
import CustomSelect from "@/components/select/Select.vue";
import {useSupabaseStore} from "@/stores/supabaseStore.ts";
import DefaultButton from "@/components/buttons/DefaultButton.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
    required: true,
  }
})

const emit = defineEmits(['close'])

const supabaseStore = useSupabaseStore()

const showDrawer = computed(() => {
  return props.isOpen
})

const closeDrawer = () => {
  emit('close');
  resetForm()
}

const form = reactive({
  name: '',
  description: '',
  start_date: '',
  end_date: '',
})

const resetForm = () => {
  form.name = ''
  form.description = ''
  form.start_date = ''
  form.end_date = ''
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
}

const errors = reactive<Record<string, string>>({})

function validate() {
  errors.title = form.name ? '' : 'Name is required'
  errors.priority = form.description ? '' : 'Description is required'
  errors.status = form.start_date ? '' : 'Start date is required'
  errors.due_date = form.end_date ? '' : 'End date is required'

  return Object.values(errors).every((error) => !error)
}


async function handleSubmit() {
  if (!validate()) return

  await supabaseStore.createNewProject(form)
  closeDrawer()
}
</script>

<template>
  <Drawer :is-open="showDrawer" @close="closeDrawer">
    <h2>Create new project</h2>
    <form @submit.prevent class="ticket-form">
      <label>
        Name
        <input v-model="form.name" type="text" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </label>
      <label>
        Description
        <textarea v-model="form.description" rows="4" />
      </label>
      <label>
        Start Date
        <input v-model="form.start_date" type="date" />
        <span v-if="errors.start_date" class="error">{{ errors.start_date }}</span>
      </label>
      <label>
        Start Date
        <input v-model="form.end_date" type="date" />
        <span v-if="errors.end_date" class="error">{{ errors.end_date }}</span>
      </label>

      <DefaultButton class="create-button" @click="handleSubmit">Create project</DefaultButton>
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
  }

  .create-button {
    margin-top: $spacer-md;
  }
}
</style>

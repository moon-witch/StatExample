<script setup lang="ts">
import { useSupabaseStore } from "@/stores/useSupabase.ts";
import {computed, onMounted, ref, watch} from "vue";

const supabaseStore = useSupabaseStore();

const getProjects = () => {
  supabaseStore.getProjectData()
}

const projectData = computed(() => {
  return supabaseStore.projectData
})

onMounted(() => {
  getProjects()
})
</script>

<template>
  <div>
    <h1>Your projects</h1>
    <div class="projects-container">
      <div v-for="project in projectData" class="project">
        <div class="name">{{ project.name }}</div>
        <div class="description">{{ project.description }}</div>
        <div class="data">
          <div class="start">{{ project.start_date }}</div>
          -
          <div class="end">{{ project.end_date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects-container {
  display: flex;
  flex-wrap: wrap;
  gap: $spacer-sm;

  .project {
    border: 1px solid $darkgray;
    border-radius: $radius;
    width: 300px;
    padding: $spacer-sm;
    box-shadow: none;
    transition: $transition;
    cursor: pointer;

    &:hover {
      box-shadow: $box-shadow;
    }

    .name {
      font-weight: bold;
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
</style>

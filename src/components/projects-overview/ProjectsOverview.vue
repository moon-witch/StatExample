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
    <section class="projects-container">
      <article v-for="project in projectData" class="project">
        <RouterLink :to="`/project/${project.id}`">
          <h2 class="name">{{ project.name }}</h2>
          <p class="description">{{ project.description }}</p>
          <div class="data">
            <time>{{ project.start_date }}</time>
            -
            <time>{{ project.end_date }}</time>
          </div>
        </RouterLink>
      </article>
    </section>
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

    a {
      color: $text;
    }

    &:hover {
      box-shadow: $box-shadow;
    }

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
</style>

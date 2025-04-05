<script setup lang="ts">
import { useSupabaseStore } from "@/stores/supabaseStore.ts";
import {computed, onMounted, ref, watch} from "vue";
import Loading from "@/components/Loading.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import NewProjectDrawer from "@/components/drawer/NewProjectDrawer.vue";

const supabaseStore = useSupabaseStore();

const drawerOpen = ref(false);

const getProjects = () => {
  supabaseStore.getAllProjects()
}

const allProjects = computed(() => {
  return supabaseStore.allProjects
})

const projectsLoading = computed(() => {
  return supabaseStore.projectsLoading
})

onMounted(() => {
  getProjects()
})
</script>

<template>
  <div>
    <h1>Your projects</h1>
    <DefaultButton class="new-project" @click="drawerOpen = true">
      New project
    </DefaultButton>
    <NewProjectDrawer :is-open="drawerOpen" @close="drawerOpen = false" />
    <section class="projects-container">
      <transition>
        <Loading v-if="projectsLoading" backdrop />
      </transition>
      <article v-for="project in allProjects" class="project">
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
.new-project {
  margin-bottom: $spacer-sm;
}

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

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/navbar/Navbar.vue';
import ActionBar from "@/components/actionbar/ActionBar.vue";
import { useSupabaseStore } from "@/stores/useSupabase.ts";
import {onMounted} from "vue";

const supabaseStore = useSupabaseStore();

onMounted(() => {
  supabaseStore.logIn()
})
</script>

<template>
  <header>
    <div class="wrapper">
      <ActionBar />
      <Navbar />
    </div>
  </header>
  <div class="view-container">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.view-container {
  padding: $spacer-md;
}
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/navbar/Navbar.vue';
import ActionBar from "@/components/actionbar/ActionBar.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <ActionBar />
      <Navbar />
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
</style>

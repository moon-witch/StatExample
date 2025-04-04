<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/navbar/Navbar.vue';
import ActionBar from "@/components/actionbar/ActionBar.vue";
import {computed, onMounted} from "vue";
import {useUserStore} from "@/stores/userStore.ts";

const userStore = useUserStore();

const userName = computed(() => {
  return userStore.currentUserProfileData
})

onMounted(() => {
  userStore.logIn()
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
  margin-top: 100px;
  padding: 0 $spacer-md;
  position: relative;
}
</style>

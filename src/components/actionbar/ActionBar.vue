<script setup lang="ts">
import {useSupabaseStore} from "@/stores/supabaseStore.ts";

const supabaseStore = useSupabaseStore()

const resetDemoData = () => {
  supabaseStore.resetDemoData()
}
</script>


<template>
  <section class="action-bar">
    <img class="logo" type="logo" src="/favicon/favicon.svg" alt="logo"/>
    <span class="title">DevHub</span>
    <button @click="resetDemoData">Reset data</button>
  </section>
</template>

<style scoped lang="scss">
.action-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 50px;
  padding: .25rem;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: .5rem;
  border-bottom: 1px solid $darkgray;

  .logo {
    width: 45px;
    margin-left: .5rem;
  }

  .title {
    font-size: 1.75rem;
  }
}
</style>

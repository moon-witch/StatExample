<script setup lang="ts">
</script>


<template>
  <section class="action-bar">
    <img class="logo" type="logo" src="/favicon/favicon.svg" alt="logo"/>
    <span class="title">DevHub</span>
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
  background: $primary;
  z-index: 999;

  .logo {
    width: 45px;
    margin-left: .5rem;
  }

  .title {
    font-size: 1.75rem;
  }
}
</style>

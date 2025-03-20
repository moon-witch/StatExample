<script setup lang="ts"></script>


<template>
  <section class="action-bar">
    <img class="logo" type="logo" src="/favicon/favicon.svg" alt="logo"/>
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
  border-bottom: 1px solid $darkgray;

  .logo {
    width: 45px;
  }
}
</style>

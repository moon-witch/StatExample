<script setup lang="ts">
import NavItem from './NavItem.vue';
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<template>
  <nav class="nav">
    <ul class="list">
      <NavItem :active="route.fullPath === '/'" link="/" title="Home" icon="home"/>
      <NavItem :active="route.fullPath === '/about'" link="/about" title="About" icon="info"/>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.nav {
 background: $primary;
  position: fixed;
  height: calc(100dvh - 67px);
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: .25rem;
  width: 35px;
  transition: $transition;
  border-top: 1px solid $darkgray;
  border-right: 1px solid $darkgray;

  &:hover {
    width: 100px;

    ::v-deep(a) {
      gap: .5rem;
    }

    ::v-deep(.text) {
      max-width: 200px;
      opacity: 1;
      }

    ::v-deep(.nav-icon) {
      width: 25px;
    }
  }

  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
}
</style>

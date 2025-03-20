<script setup lang="ts">
import NavItem from './NavItem.vue';
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<template>
  <nav class="nav">
    <img class="logo" type="logo" src="/favicon/favicon.svg" alt="logo"/>
    <ul class="list">
      <NavItem :active="route.fullPath === '/'" link="/" title="Home" icon="home"/>
      <NavItem :active="route.fullPath === '/about'" link="/about" title="About" icon="info"/>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.nav {
 background: $lightgray;
  position: fixed;
  height: calc(100dvh - 60px);
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: .25rem;
  width: 30px;
  transition: $transition;

  &:hover {
    width: 100px;

    .logo {
      width: 60px;
    }

    ::v-deep(.text) {
      visibility: visible;
      }

    ::v-deep(.nav-icon) {
      width: 25px;
    }
  }

  .toggle-button {
    padding-top: .2rem;
    margin-bottom: $spacer-sm;
    background: $lightgray;
    border: none;
    border-radius: $radius;
    cursor: pointer;
  }

  .logo {
    width: 25px;
    margin-bottom: $spacer-md;
    transition: $transition;
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

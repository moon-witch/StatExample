<script setup lang="ts">
import NavItem from './NavItem.vue';
</script>

<template>
  <nav class="nav">
    <img class="logo" type="logo" src="/favicon/favicon.svg" alt="logo"/>
    <ul class="list">
      <NavItem link="/" title="Home"/>
      <NavItem link="/about" title="About"/>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.nav {

}
</style>

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
 background: $lightgray;
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: .25rem;
  border-top-right-radius: calc($radius * 2);
  border-bottom-right-radius: calc($radius * 2);

  .logo {
    width: 60px;
    margin-bottom: $spacer-md;
  }

  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>

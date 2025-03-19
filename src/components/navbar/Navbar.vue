<script setup lang="ts">
import NavItem from './NavItem.vue';
import {useNavbar} from "@/composables/useNavbar.ts";
import {provide, ref, watch} from "vue";

const navBarComposable = useNavbar();
provide('navBarComposable', navBarComposable)

const navOpen = ref(true)

const toggleNavbar = () => {
  navBarComposable.toggleNav()
}

watch(navBarComposable.navOpen, (newValue) => {
  navOpen.value = newValue;
})
</script>

<template>
  <nav class="nav" :class="{ 'open': navOpen }">
    <button class="toggle-button" @click="toggleNavbar">
      <img class="arrow" src="@/assets/icons/arrow-left.png" alt="nav toggle button" />
    </button>
    <img class="logo" type="logo" src="/favicon/favicon.svg" alt="logo"/>
    <ul class="list">
      <NavItem link="/" title="Home" icon="home"/>
      <NavItem link="/about" title="About" icon="info"/>
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
  width: 90px;
  transition: $transition;

  &:not(.open) {
    width: 30px;

    .arrow {
      transform: rotate(180deg);
    }

    .logo {
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
    width: 60px;
    margin-bottom: $spacer-md;
    transition: $transition;
  }

  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>

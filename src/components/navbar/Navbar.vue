<script setup lang="ts">
import NavItem from './NavItem.vue';
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/userStore.ts";
import {computed, onMounted} from "vue";
import {getInitials} from "@/helpers/getInitials.ts";

const route = useRoute()

const userStore = useUserStore()

const userInitials = computed(() => {
  return userStore.currentUserProfileData[0] ? getInitials(userStore.currentUserProfileData[0].first_name, userStore.currentUserProfileData[0].last_name) : null
})

onMounted(() => {
  userStore.getCurrentUser()
})
</script>

<template>
  <nav class="nav">
    <ul class="list">
      <NavItem :active="route.fullPath === '/'" link="/" title="Dashboard" icon="home"/>
      <NavItem :active="route.fullPath === '/projects'" link="/projects" title="Projects" icon="iteration"/>
      <NavItem :active="route.fullPath === '/about'" link="/about" title="About" icon="info"/>
    </ul>
    <RouterLink to="/account" class="initials">{{ userInitials }}</RouterLink>
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
  justify-content: space-between;
  align-items: center;
  padding: .25rem;
  width: 41px;
  transition: $transition;
  border-top: 1px solid $darkgray;
  border-right: 1px solid $darkgray;
  z-index: 999;

  &:hover {
    width: 150px;

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

  .initials {
    border: 1px solid $darkgray;
    border-radius: $radius;
    padding: .5rem;
    margin-bottom: $spacer-sm;
    background: $primary;
    color: $text;
    cursor: pointer;
    transition: $transition;

    &:hover {
      border: 1px solid $lightgray;
    }
  }
}
</style>

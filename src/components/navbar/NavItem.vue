<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li class="item">
    <RouterLink :to="link">{{ title }}</RouterLink>
  </li>
</template>

<style scoped lang="scss">
.item {
  margin: 1rem auto;
  a {
    color: $primary;
    padding: .25rem .5rem;
    border-radius: $radius;
    transition: $transition;

    &:hover {
      background: $highlight;
    }
  }
}
</style>

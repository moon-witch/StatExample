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
  <li>
    <RouterLink :to="link">{{ title }}</RouterLink>
  </li>
</template>

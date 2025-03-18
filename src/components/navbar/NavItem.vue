<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li>
    <RouterLink to="/about">{{ title }}</RouterLink>
  </li>
</template>

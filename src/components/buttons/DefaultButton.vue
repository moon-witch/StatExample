<script setup lang="ts">

</script>

<template>
  <button class="default-button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.default-button {
  background: $primary;
  border: 1px solid $darkgray;
  border-radius: $radius;
  padding: .5rem $spacer-sm;
  color: $text;
  cursor: pointer;
  transition: $transition;
  width: fit-content;

  &:hover {
    border: 1px solid $lightgray;
  }
}
</style>

<script setup lang="ts">
// No script needed for now
</script>

<template>
  <div class="loading-overlay">
    <img class="icon" src="/icons/loading.png" alt="loading icon" />
  </div>
</template>

<style scoped lang="scss">
.loading-overlay {
  position: absolute;
  inset: 0; // top: 0; right: 0; bottom: 0; left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4); // semi-transparent
  z-index: 10; // Make sure it's above other children

  .icon {
    width: 50px;
    animation: spin 2s linear infinite;
    filter: invert(94%) sepia(1%) saturate(225%) hue-rotate(167deg) brightness(105%) contrast(97%);
  }

  transition: opacity 0.3s ease;
  opacity: 1;

  &.fade-leave-active,
  &.fade-enter-active {
    transition: opacity 0.3s ease;
  }

  &.fade-enter-from,
  &.fade-leave-to {
    opacity: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>

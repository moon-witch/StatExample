<script setup lang="ts">
defineProps({
  backdrop: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="loading-overlay" :class="{'backdrop': backdrop}">
    <img class="icon" src="/icons/loading.png" alt="loading icon" />
  </div>
</template>

<style scoped lang="scss">
.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &.backdrop {
    background-color: rgba(0, 0, 0, 0.4); // semi-transparent
  }

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

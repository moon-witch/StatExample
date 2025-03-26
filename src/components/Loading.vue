<script setup lang="ts">

</script>

<template>
  <div class="loading">
    <img class="icon" src="/icons/loading.png" alt="loading icon"/>
  </div>
</template>

<style scoped lang="scss">
.loading {
  display: flex;
  justify-content: center;

  .icon {
    filter: invert(94%) sepia(1%) saturate(225%) hue-rotate(167deg) brightness(105%) contrast(97%);
    animation: spin 5s infinite linear;
    width: 50px;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  } to {
  transform: rotate(-360deg);
      }
}
</style>

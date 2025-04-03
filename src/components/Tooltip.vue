<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
    default: ''
  },
  bold: {
    type: Boolean,
    default: false
  },
  wrapWidth: {
    type: String,
    default: 'auto'
  }
})
</script>

<template>
  <div class="tooltip-wrapper" :class="{'bold': bold}">
    <slot />
    <span class="tooltip">{{ text }}</span>
  </div>
</template>

<style scoped lang="scss">
.tooltip-wrapper {
  position: relative;
  width: v-bind(wrapWidth);

  &.bold {
    font-weight: bold;
  }

  &:hover {
    .tooltip {
      max-width: 200px;
      padding: calc($spacer-sm / 2) $spacer-sm;
      border: 1px solid $darkgray;
      opacity: 1;
    }
  }

  .tooltip {
    max-width: 0;
    background-color: $primary;
    color: $text;
    font-size: .9rem;
    font-weight: normal;
    text-align: center;
    border-radius: $radius;
    position: absolute;
    bottom: calc(100% + 10px);
    left: 0;
    transition: $transition;
    overflow: hidden;
    opacity: 0;
    text-wrap: nowrap;
    z-index: 10;
    user-select: none;
    pointer-events: none;
  }
}
</style>

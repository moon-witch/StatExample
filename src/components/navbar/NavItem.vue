<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
})

const iconPath = computed(() => {
  return `/icons/${props.icon}.png`
})
</script>

<template>
  <li class="item">
    <RouterLink :to="link" :class="{'active': active}">
      <img class="nav-icon" :src="iconPath" alt="nav icon" />
      <span class="text">{{ title }}</span>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
.item {
  margin: .25rem auto;
  border-radius: $radius;
  width: 100%;
  transition: $transition;

  &:hover {
    background: $lightgray;
  }

  a {
    color: $text;
    padding: .25rem .5rem;
    background: transparent;
    transition: $transition;
    display: flex;
    align-items: center;
    gap: 0;
    opacity: .5;

    &:hover {
      opacity: 1;

      .text {
        color: $primary;
      }

      .nav-icon {
        filter: invert(11%) sepia(4%) saturate(1996%) hue-rotate(169deg) brightness(91%) contrast(89%);
      }
    }

    .nav-icon {
      width: 25px;
      transition: $transition;
      filter: invert(94%) sepia(1%) saturate(225%) hue-rotate(167deg) brightness(105%) contrast(97%);
      }

    &.active {
      opacity: 1;
      background: $lightgray;
      border-radius: $radius;
      color: $primary;

      .nav-icon {
        filter: invert(11%) sepia(4%) saturate(1996%) hue-rotate(169deg) brightness(91%) contrast(89%);
      }

    }

    .text {
      opacity: 0;
      max-width: 0;
      overflow: hidden;
      transition: $transition;
      margin-top: 2px;
    }
  }
}
</style>

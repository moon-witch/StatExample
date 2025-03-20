<script setup lang="ts">
import {computed, inject, ref, watch} from "vue";

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

const navBarComposable: any = inject('navBarComposable')

const iconPath = computed(() => {
  return "src/assets/icons/" + props.icon + ".png"
})

const navOpen = ref(true)

watch(navBarComposable.navOpen, (newValue) => {
  navOpen.value = newValue;
})
</script>

<template>
  <li class="item">
    <RouterLink :to="link" :class="{'open': navOpen, 'active': active}">
      <img class="nav-icon" :src="iconPath" alt="nav icon" />
      <span class="text">{{ title }}</span>
    </RouterLink>
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
    display: flex;
    align-items: center;
    gap: .5rem;
    opacity: .5;

    &:hover {
      background: $highlight;
      opacity: 1;
    }

    .nav-icon {
      width: 25px;
      transition: $transition;
    }

    &.active {
      opacity: 1;
    }

    &:not(.open) {
      .text {
        display: none;
      }

      .nav-icon {
        width: 15px;
      }
    }
  }
}
</style>

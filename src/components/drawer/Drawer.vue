<script setup lang="ts">
import {onUnmounted, watch} from "vue";

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

watch(
  () => props.isOpen,
  (isOpen) => {
    const className = 'drawer-open'
    if (isOpen) {
      document.body.classList.add(className)
    } else {
      document.body.classList.remove(className)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  document.body.classList.remove('drawer-open')
})
</script>

<template>
  <div>
    <div
      v-if="isOpen"
      class="drawer-backdrop"
      @click.self="close"
    />
    <div
      class="drawer-panel"
      :class="{ 'drawer-open': isOpen }"
      role="dialog"
      aria-modal="true"
    >
      <button class="drawer-close" @click="close">×</button>
      <div class="drawer-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.drawer-panel {
  position: fixed;
  top: 0;
  right: 0;
  margin-top: 60px;
  height: calc(100vh - 60px);
  width: 320px;
  background-color: $primary;
  z-index: 1000;
  transform: translateX(100%);
  transition: $transition;

  &.drawer-open {
    transform: translateX(0);
  }
}

.drawer-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  padding: 1rem;
  cursor: pointer;
  color: #444;
}

.drawer-content {
  padding: 1rem;
  overflow-y: auto;
  height: calc(100% - 3rem);
}
</style>

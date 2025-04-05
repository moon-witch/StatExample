<script setup lang="ts">
import {onUnmounted, watch} from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

watch(
  () => props.isOpen,
  (isOpen) => {
    const className = 'modal-open'
    if (isOpen) {
      document.body.classList.add(className)
    } else {
      document.body.classList.remove(className)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  document.body.classList.remove('modal-open')
})
</script>

<template>
  <div v-if="isOpen" class="modal">
    <div class="backdrop" @click="closeModal"></div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;

  .backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    background: $primary;
    border: 1px solid $darkgray;
    border-radius: $radius;
    padding: $spacer-sm;
  }
}
</style>

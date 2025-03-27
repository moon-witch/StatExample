<script setup lang="ts">
import {computed, ref} from "vue";
import Drawer from "@/components/drawer/Drawer.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
    required: true,
  }
})

const emit = defineEmits(['close'])

const showDrawer = computed(() => {
  return props.isOpen
})

const closeDrawer = () => {
  emit('close');
}
</script>

<template>
  <Drawer :is-open="showDrawer" @close="closeDrawer">
    <h2>Create ticket</h2>
    <p>This is where the form will be</p>
  </Drawer>
</template>

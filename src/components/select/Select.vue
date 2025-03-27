<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['selected'])

const selectedOption = ref<string>(props.selectedOption)

watch(selectedOption, (newVal) => {
  emit("selected", newVal)
})
</script>

<template>
  <select v-model="selectedOption">
    <option v-for="option in options" :value="option">{{ option }}</option>
  </select>
</template>

<style scoped lang="scss">
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  padding: .25rem .5rem;
  background: transparent;
  color: $text;
  border: 1px solid $darkgray;
  border-radius: $radius;
  font-family: 'Nohemi', sans-serif;

  option {
    background: $primary;
  }
}
</style>

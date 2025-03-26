<script setup lang="ts">
import { defineProps } from 'vue'
import { truncateText } from "@/helpers/truncateText.ts";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <section v-if="data" class="ticket-container">
    <span class="assignee">JL</span>
    <span class="title">
      {{ truncateText(data.title, 15) }}
      <span class="tooltip">
        {{ data.title }}
      </span>
    </span>
    <span class="priority">Priority: {{ data.priority }}</span>
    <span class="status">Status: {{ data.status }}</span>
  </section>
</template>

<style scoped lang="scss">
.ticket-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .5rem;
  border: 1px solid $darkgray;
  padding: $spacer-sm;
  border-radius: $radius;
  cursor: pointer;
  transition: $transition;

  &:hover {
    border: 1px solid $lightgray;
  }

  .assignee {
    border: 1px solid $darkgray;
    padding: .5rem;
    border-radius: 100px;
  }

  .title {
    font-weight: bold;
    width: 150px;
    position: relative;

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
      text-align: center;
      border-radius: $radius;
      position: absolute;
      z-index: 1;
      bottom: calc(100% + 5px);
      left: 50%;
      margin-left: -75px;
      transition: $transition;
      overflow: hidden;
      opacity: 0;
      text-wrap: nowrap;
    }
  }

  .priority {
    width: 150px;
  }
}
</style>

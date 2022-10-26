<template>
  <button :style="{ backgroundColor: color }" class="button">
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  color: String,
})
</script>

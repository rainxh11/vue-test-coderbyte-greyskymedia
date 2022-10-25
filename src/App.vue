<template>
  <div class="justify-center align-center w-full h-full">
    <h1 class="text-[100px] font-bold">
      {{ time }}
    </h1>
  </div>
</template>

<script setup>
import { intervalComputed } from './composables'
import { format } from 'date-fns'

const time = intervalComputed(() => format(new Date(), 'H:mm:ss'), 500)
</script>

<style scoped></style>

<template>
  <div class="content-start grid grid-flow-row-dense grid-cols-12 gap-1 py-2">
    <div>
      <img class="rounded-lg" :src="product.image" />
    </div>
    <div
      class="text-center columns-2"
      :style="{
        color: product.status,
      }">
      <fa-icon class="py-4" :icon="faCircle" />
    </div>
    <div class="col-span-7 font-normal text-[14px]">
      {{ product.name }}
    </div>
    <div class="py-2 col-span-2">
      <span v-if="product.date">{{
        format(new Date(product.date), 'M/d/yy')
      }}</span>
    </div>
    <div>
      <fa-icon class="py-4 hover:cursor-pointer" :icon="faAngleDown" />
    </div>
  </div>
</template>

<script setup>
import { faCircle, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'

const props = defineProps({ product: Object })
</script>

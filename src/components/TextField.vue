<template>
  <div>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="grow text-[14px] p-1 px-2 text-black placeholder-gray-400 bg-white block p-4 w-full rounded-sm border focus:ring-red-600" />
  </div>
</template>

<script>
export default {
  inheritAttrs: true,
}
</script>

<script setup>
defineProps({ modelValue: String, placeholder: String })
</script>

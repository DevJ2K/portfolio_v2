<template>
  <div class="text-right">
    <span class="inline-block px-3 py-2 rounded-lg rounded-br-none bg-transparent border border-zinc-300 text-zinc-800 chat-shadow text-sm md:text-base">
      {{ message }}
    </span>
  </div>
</template>

<script setup lang="ts">
const { message } = defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.chat-shadow {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

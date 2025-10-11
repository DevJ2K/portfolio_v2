<template>
  <div class="flex flex-col items-center justify-center w-full text-foreground text-center gap-4 md:gap-6">
    <div class="bg-white px-4 py-1.5 rounded-xl custom-shadow">
      <h2 class="text-body font-medium">{{ title }}</h2>
    </div>
    <p>{{ description }}</p>

  </div>
</template>

<script lang="ts" setup>

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

</script>

<style scoped>
.custom-shadow {
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
}
</style>

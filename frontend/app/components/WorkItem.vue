<template>
  <div class="flex items-center gap-4">
    <h1 class="hidden md:block">{{ workExperience.position }} {{ workExperience.connector }}</h1>
    <div class="flex gap-4 justify-center items-center p-1.5 md:p-2 rounded-lg border" :class="workExperience.clazz">
      <div class="min-h-6 min-w-6 size-6 md:min-h-8 md:min-w-8  md:size-8 rounded-md overflow-hidden shadow-md bg-red-900">
        <NuxtImg src="/images/j2klogo.png" alt="Assistant J2K" width="400" />
      </div>
      <h1 class="text-sm">{{ workExperience.company }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { WorkExperience } from "~/types/WorkExperience";

defineProps({
  workExperience: {
    type: Object as () => WorkExperience,
    required: true
  }
})
</script>

<style scoped></style>

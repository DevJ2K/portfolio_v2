<template>
  <div class="w-full h-full flex items-center justify-center bg-ui-background border rounded-[48px] gap-4 px-4 py-3 shadow-md text-sm" :class="education.borderColor">
    <div class="size-24 h-fit rounded-md overflow-hidden flex items-center justify-center">
      <NuxtImg :src="education.image" alt="Assistant J2K" width="400" />
    </div>
    <div class="h-full flex flex-col text-left justify-between">
      <div>
        <h1 class="font-medium text-base">{{ education.title }}</h1>
        <div class="flex items-center gap-1">
          <p>{{ education.startDate }}</p>
          <div v-if="education.endDate" class="flex gap-1 justify-center items-center">
            <span>-</span>
            <p v-if="education.endDate !== 'Present'">{{ education.endDate }}</p>
            <Icon v-else name="la:infinity" size="22" />
          </div>

        </div>
        <p>{{ education.stat }}</p>
        <p>{{ education.description }}</p>
      </div>
      <a
        class="border rounded-2xl px-4 py-1.5 flex items-center gap-2 w-fit mt-2"
        :class="education.btnActive
        ? 'bg-black text-white border-black cursor-pointer hover:bg-gray-800 hover:border-gray-800'
        : 'bg-gray-100 text-gray-400 border-gray-300 cursor-default'"
        :href="education.link"
        target="_blank">
        <span class="inline-flex items-center gap-2">
          <Icon :name="education.btnIcon" />
          {{ education.btnText }}
        </span>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Education } from "~/types/Education";

defineProps({
  education: {
    type: Object as () => Education,
    required: true
  }
})
</script>

<style scoped></style>

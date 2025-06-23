<template>
  <div class="w-full px-4 flex flex-col items-center justify-center text-foreground text-center">
    <SectionIntroduction
      title="Education"
      description="Where I built the foundations of my software engineering journey." />
    <div class="flex flex-wrap justify-center w-full max-w-4xl gap-6 mt-12">
      <div v-for="(education, index) in educations" :key="index" class="max-w-sm">
         <!-- class="bg-red-500 w-full h-full" -->
        <EducationItem :education="education" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import type { Education } from '~/types/Education';

const myDataStore = useMyDataStore();
const educations: Education[] = myDataStore.educations;
</script>

<style scoped></style>

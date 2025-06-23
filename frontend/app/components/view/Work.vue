<template>
  <div class="w-full px-4 flex flex-col items-center justify-center text-foreground text-center">
    <SectionIntroduction
    title="Work Experience"
    description="A brief look at where I've worked and the roles I've held." />

    <div class="flex flex-col items-center justify-center w-full max-w-4xl gap-5 md:gap-8 mt-12">
      <div v-for="(work, index) in workExperiences" :key="index" class="grid grid-cols-3 items-center justify-center w-full gap-3">
        <p class="col-span-1 text-foreground-secondary/70 text-left">
          {{ work.duration }}
        </p>
        <WorkItem
          class="col-span-2"
          :work-experience="work" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { WorkExperience } from "~/types/WorkExperience";
import WorkItem from "../WorkItem.vue";

const myDataStore = useMyDataStore();
const workExperiences: WorkExperience[] = myDataStore.experiences;


</script>

<style scoped>

</style>

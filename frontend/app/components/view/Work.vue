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

const workExperiences: WorkExperience[] = [
  {
    company: '???',
    duration: 'Feb. 2025 - Present',
    position: 'CTO & Fullstack Developer',
    logo: '/images/experiences/unknown-project.png',
    description: 'Working on a new project that is still under wraps.',
    connector: 'for',
    clazz: 'bg-gradient-to-b from-[#E0EFFF] to-[#F5E0FF] border-[#DC8FFF]'
  },
  {
    company: 'Credit Agricole Corporate & Investment Bank',
    duration: 'Jan. 2025 - Present',
    position: 'Software Engineer Internship',
    logo: '/images/experiences/cacib.png',
    description: "Working on the development of a new web application for the bank.\n\n\
    Its main goal is to provide a better user experience for the bank's clients.\
    The application is built using Nuxt 3, TypeScript, and Tailwind CSS.",
    connector: 'at',
    clazz: 'bg-[#FFFFFF] border-[#DCDCDC]'
  },
  {
    company: 'LudiLab',
    duration: 'Jan. 2025 - Feb. 2025',
    position: 'Web3 Developer',
    logo: '/images/experiences/ludilab.jpeg',
    description: 'Developing a web3 application for the company.',
    connector: 'for',
    clazz: 'bg-[#D4D4FF] border-[#A1A0DE]'
  },
  {
    company: 'Belles Des Pins',
    duration: 'Oct. 2024',
    position: 'Mobile Developer',
    logo: '/images/experiences/bellesdespins.png',
    description: 'Developing a mobile application for the company.',
    connector: 'for',
    clazz: 'bg-[#FFE2D4] border-[#DEB4A0]'
  },
  {
    company: 'WaveInvest',
    duration: 'Dec. 2022 - Feb. 2023',
    position: 'Mobile Developer',
    logo: '/images/experiences/waveinvest.png',
    description: 'Developing a mobile application for the company.',
    connector: 'for',
    clazz: 'bg-[#FED4FF] border-[#DCA0DE]'
  }
]


</script>

<style scoped>

</style>

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

const educations: Education[] = [
  {
    title: 'Self-learning',
    image: '/images/educations/self_learning.png',
    borderColor: 'border-[#F766FF]',
    startDate: 'Sep. 2020',
    endDate: 'Present',
    stat: '+90 projects | +140 repositories',
    description: 'A good programmer never stop to learn itself.',
    btnIcon: 'mingcute:github-line',
    btnText: 'View GitHub',
    btnActive: true,
    link: 'https://github.com/DevJ2K'
  },
  {
    title: '42 Paris',
    image: '/images/educations/42.png',
    borderColor: 'border-[#FFC966]',
    startDate: 'Sep. 2023',
    endDate: '2026',
    stat: '+76 solo & team projects',
    description: 'Enroll for a master degree in AI & Data',
    btnIcon: 'ic:outline-lock',
    btnText: 'View Certificate',
    btnActive: false
  },
  {
    title: 'Harvard University',
    image: '/images/educations/harvard.png',
    borderColor: 'border-[#FF6666]',
    startDate: '2025',
    stat: '+3 courses followed',
    description: 'Online courses about CS and AI.',
    btnIcon: 'ic:outline-lock',
    btnText: 'View Certificate',
    btnActive: false
  }
]
</script>

<style scoped></style>

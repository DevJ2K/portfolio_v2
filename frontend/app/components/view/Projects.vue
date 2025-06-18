<template>
  <div class="w-full flex flex-col items-center justify-center text-foreground text-center px-4">
    <SectionIntroduction
    title="Projects"
    description="Projects that reflect what I love to build." />

    <PickerBar
      class="my-8 bg-red-500"
      :items="['AI', 'Web', 'Mobile']"
      :selected="selectedTag"
      @select="(index) => selectedTag = index" />

    <div class="flex flex-wrap justify-center gap-8">

      <ProjectCard
        v-for="(project, index) in projects.filter(proj => proj.tags.includes(selectedTag))"
        :key="index"
        :title="project.title"
        :description="project.description"
        :online-link="project.onlineLink"
        :github-name="project.githubLink ? project.githubLink.split('/').pop() : ''"
        :image="project.image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/Project';

const tags = ['AI', 'Web', 'Mobile'];
const selectedTag = ref(tags[0]);

const projects: Project[] = [
  {
    title: 'SnakeAI',
    description: 'The goal of this project is to introduce basic of reinforcement learning with a snake game. The snake has to reach a minimum length of 10.',
    image: '/images/projects/snake_ai.png',
    tags: ['AI'],

    onlineLink: 'https://snakeai.devj2k.com',
    githubLink: 'https://github.com/DevJ2K/SnakeAI',
  },
  {
    title: 'Gomoku',
    description: 'The goal of this project is to make an AI capable of beating human players at Gomoku.',
    image: '/images/projects/app_gomoku.png',
    tags: ['AI'],

    githubLink: 'https://github.com/DevJ2K/app_gomoku',
  }
]

</script>

<style scoped>

</style>

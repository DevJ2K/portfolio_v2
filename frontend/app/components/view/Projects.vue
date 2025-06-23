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
        :is-private="project.isPrivate"
        :is-soon-online="project.isSoonOnline"
        :image="project.image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/Project';

const tags = ['AI', 'Web', 'Mobile'];
const selectedTag = ref(tags[0]);

const myDataStore = useMyDataStore();
const projects: Project[] = myDataStore.projects;

</script>

<style scoped>

</style>

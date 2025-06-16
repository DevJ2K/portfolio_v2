<template>
  <div class="w-full mt-12 flex flex-col items-center justify-center text-foreground text-center">
    <SectionIntroduction
    title="Projects"
    description="Projects that reflect what I love to build." />

    <PickerBar
      class="mt-8"
      :items="['AI', 'Web', 'Mobile']"
      :selected="selectedTag"
      @select="(index) => selectedTag = index" />

    <div class="flex flex-wrap justify-center gap-8 mx-4 my-12">
      <ProjectCard
        title="SnakeAI"
        description="The goal of this project is to introduce basic of reinforcement learning with a snake game. The snake has to reach a minimum length of 10."
        online-link="https://snakeai.devj2k.com"
        github-name="SnakeAI"
        image="/images/projects/snake_ai.png"/>
      <ProjectCard
        title="Gomoku"
        description="The goal of this project is to make an AI capable of beating human players at Gomoku."
        github-name="app_gomoku"
        image="/images/projects/app_gomoku.png"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const tags = ['AI', 'Web', 'Mobile'];
const selectedTag = ref(tags[0]);
</script>

<style scoped>

</style>

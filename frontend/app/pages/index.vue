<template>
  <main class="relative flex size-full flex-col items-center text-body">
    <ViewMain/>
    <div class="mt-0 w-full h-px bg-window-border"/> <!-- Separator -->
    <ViewProjects id="projects"/>
    <div class="mt-0 w-full h-px bg-window-border"/> <!-- Separator -->
    <ViewWork id="work"/>
    <div class="mt-0 w-full h-px bg-window-border"/> <!-- Separator -->
    <ViewEducation id="education"/>
    <div class="mt-0 w-full h-px bg-window-border"/> <!-- Separator -->
    <ViewSkills id="skills"/>
    <div class="mt-0 w-full h-px bg-window-border"/> <!-- Separator -->
    <h1 class="text-2xl font-bold text-center mt-8 mb-4">Contact</h1>
    <!-- <ViewContact id="contact"/> -->
  </main>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>

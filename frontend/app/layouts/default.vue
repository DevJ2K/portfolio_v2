<template>
  <div class="text-zinc-900 bg-background min-h-screen flex justify-center">
    <UApp>
      <Navbar />
      <div class="max-w-[1200px] w-full h-full lg:border-l lg:border-r border-window-border">
        <NuxtPage />
      </div>
    </UApp>
    <!-- <ChatBot /> -->
     <!-- <ChatbotChatBot /> -->
      <Chatbot />
    <div class="fixed bottom-4 left-4 z-[2000]">
      <span class="sm:hidden dark:text-white text-black">XS</span>
      <span class="hidden sm:block md:hidden dark:text-white text-black">SM</span>
      <span class="hidden md:block lg:hidden dark:text-white text-black">MD</span>
      <span class="hidden lg:block xl:hidden dark:text-white text-black">LG</span>
      <span class="hidden xl:block dark:text-white text-black">MORE</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

<template>
  <div id="chatbotContainer" class="px-6 h-full min-h-full py-4 overflow-y-auto">
    <div v-for="(chat, index) in messages" :key="index" class="mb-2">
      <ChatbotUserMessage v-if="chat.role === 'user'" :message="chat.content" />
      <ChatbotSystemMessage
        v-else-if="chat.role === 'assistant'"
        :message="chat.content"
      />
    </div>
    <div id="bottomChatbotMarker"/>
  </div>
</template>

<script setup lang="ts">
import type { Chat } from "~/types/Chat";

const { messages } = defineProps<{
  messages: Chat[];
}>();
</script>

<style scoped></style>

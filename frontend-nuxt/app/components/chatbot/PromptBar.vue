<template>
  <div
    class="flex gap-1 bg-zinc-50 border border-zinc-300 items-center justify-center p-2 w-full min-h-min rounded-xl"
  >
    <label class="sr-only" for="prompt">prompt</label>
    <input
      id="prompt"
      v-model="prompt"
      type="text"
      class="w-full p-2 border h-10 border-transparent ring-0 focus:outline-none focus:ring-0 selection:bg-orange-500 selection:text-white"
      placeholder="Type your message..."
      @keydown.enter.exact.prevent="handleEnter"
    />
    <button
      class="p-2 flex items-center justify-center size-10 text-white rounded-lg"
      :class="{
        'bg-black hover:bg-zinc-900 cursor-pointer':
          prompt.trim().length > 0 && !chatbotIsTyping,
        'bg-zinc-400': prompt.trim().length === 0 || chatbotIsTyping,
      }"
      :disabled="chatbotIsTyping"
      @click="sendMessage()"
    >
      <!-- <Icon name="material-symbols:send-rounded" size="28" /> -->
      <Icon name="lucide:send" size="64" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  sendMessage: {
    type: Function,
    required: true,
  },
});

const chatbotStore = useChatbotStore();

const { isTyping: chatbotIsTyping } = storeToRefs(chatbotStore);

const prompt = defineModel("prompt", {
  type: String,
  required: true,
});

const handleEnter = (event: Event) => {
  if (prompt.value.length > 0 && !chatbotIsTyping.value) {
    props.sendMessage();
    if (event != null && event.target != null) {
      // @ts-expect-error Blur exists on event.target
      event.target.blur();
    }
  }
};
</script>

<style scoped></style>

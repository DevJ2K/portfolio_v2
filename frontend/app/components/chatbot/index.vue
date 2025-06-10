<template>
  <div
    class="fixed w-full min-h-22 group flex items-end justify-end transition-all duration-300 ease-in-out"
    :class="{ 'bottom-4 right-4 md:bottom-8 md:right-8': !isOpen,
              'bottom-0 right-0 md:bottom-8 md:right-8': isOpen }"
  >
    <!-- Integral Box -->
    <div
      class="relative flex flex-col z-50 bg-zinc-100 chat-shadow rounded-4xl overflow-hidden transition-all duration-300 ease-in-out"
      :class="{
        'w-full h-screen md:h-[max(65vh,550px)] md:w-[max(30vw,500px)] rounded-none md:rounded-4xl': isOpen,
        'size-18': !isOpen,
        'animate-bounce group-hover:animate-none': isFirstOpen,
        // 'animate-custom-floating-btn group-hover:no-animation': isFirstOpen,
      }"
    >
      <!-- Floating Button -->
      <div
        class="absolute rounded-full flex items-center justify-center border-2 border-zinc-300 transition-all duration-300 ease-in-out"
        :class="{
          'top-0 left-0 hover:scale-105 cursor-pointer size-18 min-w-18':
            !isOpen,
          'top-3 left-6 size-16 min-w-16': isOpen,
        }"
        @click="openChatbot"
      >
        <NuxtImg
          src="/images/j2klogo.png"
          alt="Assistant J2K"
          width="400"
          height="400"
          class="rounded-full"
        />
      </div>

      <!-- Header -->
      <div
        class="flex items-center gap-2 header-shadow px-6 py-3 transition-all duration-500 ease-in-out"
      >
        <!-- Placeholder Icon -->
        <div class="size-16 min-w-16" />
        <!-- Badge -->
        <div class="flex flex-col" :class="{ 'opacity-0': !isOpen }">
          <span class="text-sm font-bold text-zinc-800">Assistant J2K</span>
          <span class="text-xs text-zinc-500"
            >Powered by a
            <span class="text-orange-500 font-semibold">Mistral LLM</span></span
          >
        </div>
        <button
          class="cursor-pointer ml-auto flex items-center justify-center text-zinc-500 hover:text-zinc-800"
          @click="closeChatbot"
        >
          <Icon name="maki:cross" size="24" />
        </button>
      </div>

      <!-- Chat Window -->
      <div
        class="overflow-y-auto transition-all duration-500 ease-in-out h-full"
        :class="{ 'opacity-0': !isOpen }"
      >
        <ChatbotContent v-if="messages.length > 0" :messages="messages" />
        <div
          v-else
          class="flex items-center justify-center h-full text-zinc-500"
        >
          <p class="text-sm md:text-base">Start chatting with me to learn more about SFT-R!</p>
        </div>
      </div>
      <!-- Chat bar -->
      <div
        class="py-6 px-6 prompt-shadow transition-all duration-500 ease-in-out"
        :class="{ 'opacity-0': !isOpen }"
      >
        <ChatbotPromptBar v-model:prompt="prompt" :send-message="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const chatbotStore = useChatbotStore();

const { messages } = storeToRefs(chatbotStore);

const prompt = ref("");

const isOpen = ref(false);
const isFirstOpen = ref(true);

const sendMessage = () => {
  console.log("Sending message:", prompt.value);
  if (prompt.value.trim() === "") return;
  const message = prompt.value.trim();
  prompt.value = "";
  chatbotStore.sendMessage(message);
};

const openChatbot = () => {
  console.log("Opening chatbot...");
  isFirstOpen.value = false;
  isOpen.value = true;
};
const closeChatbot = () => {
  console.log("Closing chatbot...");
  isOpen.value = false;
};
</script>

<style scoped>
.header-shadow {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}

.chat-shadow {
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.15);
}

.prompt-shadow {
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.15);
}

.animate-custom-floating-btn {
  animation: bounce 1s ease-in-out infinite;
}

.group:hover .animate-custom-floating-btn {
  animation: none;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>

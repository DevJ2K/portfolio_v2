<template>
  <div class="flex w-full gap-2 py-2 px-3">
    <div class="min-w-6 max-w-6 md:max-w-7 md:min-w-7">
      <div class="h-fit min-w-fit rounded-full shadow-md -translate-y-0.5">
        <NuxtImg
          src="/j2klogo.png"
          alt="Assistant J2K"
          width="400"
          height="400"
          class="rounded-full"
        />
      </div>
    </div>
    <div class="text-sm md:text-base">
      <div
        class="prose max-w-none break-words text-sm md:text-base [&_code]:break-words [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
        v-html="sanitizedMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked";
import DOMPurify from "dompurify";

const { message } = defineProps({
  message: {
    type: String,
    required: true,
  },
});

const sanitizedMessage = computed(() => {
  if (message != null) {
    return DOMPurify.sanitize(marked(message).toString());
  }
  return "Je m'excuse, je rencontre des <span class='text-red-500'>difficultés</span> pour répondre à votre demande.";
});
</script>

<style scoped></style>

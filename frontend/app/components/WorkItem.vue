<template>
  <div class="flex items-center gap-3">
    <h1 class="hidden md:block">{{ workExperience.position }} {{ workExperience.connector }}</h1>

    <div class="flex gap-1.5 justify-center items-center py-1.5 px-2 rounded-xl border cursor-pointer custom-shadow"
      :class="workExperience.clazz" @click="toggleModal">
      <div class="min-h-6 min-w-6 size-6 md:min-h-8 md:min-w-8  md:size-8 rounded-md overflow-hidden">
        <NuxtImg :src="workExperience.logo" alt="Assistant J2K" width="400" />
      </div>
      <h1 class="text-sm">{{ workExperience.company }}</h1>
    </div>

    <UModal v-model:open="isModalOpen" class="text-foreground" :title="workExperience.company">
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex gap-2 justify-center items-center">
            <div class="min-h-6 min-w-6 size-6 rounded-md overflow-hidden">
              <NuxtImg :src="workExperience.logo" alt="Assistant J2K" width="400" />
            </div>
            <h3 class="text-body font-semibold">{{ workExperience.company }}</h3>

          </div>
          <Icon name="maki:cross" size="16" class="cursor-pointer text-black hover:text-gray-800" @click="toggleModal" />
        </div>
      </template>

      <template #body>
        <p class="text-body whitespace-pre-line">{{ workExperience.description }}</p>
      </template>

      <!-- <template #footer>
        <UButton color="success" variant="outline" class="rounded-full" @click="open = false">
          Fermer
        </UButton>
      </template> -->
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { WorkExperience } from "~/types/WorkExperience";

defineProps({
  workExperience: {
    type: Object as () => WorkExperience,
    required: true
  }
})

const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>

<style scoped>
.custom-shadow {
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.custom-shadow:hover {
  box-shadow: 0.5px 0.5px 0px 0 rgba(0, 0, 0, 0.2);
}
</style>

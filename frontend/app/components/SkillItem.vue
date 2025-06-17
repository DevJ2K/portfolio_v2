<template>
  <div class="flip-card bg-transparent group h-full" @click="toggleFace">
    <div
        class="flip-card-inner size-full p-4 flex flex-col justify-center items-center border border-ui-border rounded-lg custom-shadow relative w-full h-full"
        :class="showingFace === 'front' ? 'rotate-y-0' : 'rotate-y-180'"
        :style="{ minHeight: dynamicHeight + 'px' }">

      <div class="flip-card-front flex flex-col items-center justify-center gap-2">
        <div class="flex items-center justify-center border-2 md:border-4 border-white p-1 size-fit rounded-xl">
           <component :is="skill.icon" clazz="text-black size-6 md:size-10" />
        </div>
        <h1 class="font-medium text-center">{{ skill.name }}</h1>
        <p class="absolute bottom-2 text-xs text-foreground-secondary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Click to reveal</p>
      </div>

      <div class="flip-card-back rotate-y-180 p-3 flex flex-col items-start justify-start gap-2 text-sm">
        <h1 class="font-medium text-left">{{ skill.description }}</h1>
        <ul class="list-inside text-left flex flex-col gap-2">
          <li v-for="achievement in skill.achievements" :key="achievement" class="flex items-center gap-2">
            <div class="flex items-center justify-center size-5 md:size-6 text-[#65DB64] bg-[#A6F9A5] rounded-full border border-[#65DB64]">
              <Icon name="material-symbols:check-rounded" size="64" />
            </div>
            <span class="text-foreground-secondary">{{ achievement }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Skill } from '~/types/Skill';

const { skill } = defineProps({
  skill: {
    type: Object as () => Skill,
    required: true
  }
})

const showingFace = ref("front");
const dynamicHeight = ref(200);

const toggleFace = () => {
  showingFace.value = showingFace.value === "front" ? "back" : "front";
};

onMounted(() => {
  const estimatedFrontHeight = 120;
  const estimatedBackHeight = 50 + (skill.achievements?.length || 0) * 30;

  dynamicHeight.value = Math.max(estimatedFrontHeight, estimatedBackHeight, 0);
});

</script>

<style scoped>
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  transition: transform 0.5s, box-shadow 0.2s ease-in-out;
  transform-style: preserve-3d;
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.custom-shadow:hover {
  cursor: pointer;
  box-shadow: 0 0px 16px 4px rgba(0, 0, 0, 0.1);
}
</style>

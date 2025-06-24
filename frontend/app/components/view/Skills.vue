<template>
    <div class="w-full flex flex-col items-center justify-center text-foreground text-center">
    <SectionIntroduction
    title="Skills"
    description="Explore the cards to learn how I work with each technology." />
    <div class="grid sm:grid-cols-2 md:grid-cols-3 w-full mt-8">
        <div v-for="skill in skills" :key="skill.name">
            <SkillItem :skill="skill" />

        </div>
    </div>
    </div>
</template>

<script lang="ts" setup>
import { SvgC, SvgCplusplus, SvgDocker, SvgFirebase, SvgJava, SvgNuxt, SvgPython, SvgSwift, SvgTypescript } from '#components';
import type { Skill } from '~/types/Skill';

const iconMap = {
    'Python': SvgPython,
    'Java': SvgJava,
    'Typescript': SvgTypescript,
    'Nuxt': SvgNuxt,
    'Docker': SvgDocker,
    'Firebase': SvgFirebase,
    'C': SvgC,
    'C++': SvgCplusplus,
    'Swift': SvgSwift,
} as Record<string, any>;

const myDataStore = useMyDataStore();
const skills: Skill[] = myDataStore.skills.map(skill => ({
    ...skill,
    icon: iconMap[skill.name] || null,
}));
</script>

<style scoped>

</style>

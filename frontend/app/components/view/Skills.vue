<template>
    <div class="w-full flex flex-col items-center justify-center text-foreground text-center">
    <SectionIntroduction
    title="Skills"
    description="Explore the cards to learn how I work with each language." />
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

const skills: Skill[] = [
    {
        name: 'Python',
        icon: SvgPython,
        description: 'My favorite language for data science and machine learning.',
        achievements: [
            'AAA',
            'BBB',
            'CCC'
        ]
    },
    {
        name: 'Nuxt',
        icon: SvgNuxt,
        description: 'My favorite language for building web applications.',
        achievements: [
            'AAA',
            'BBB',
            'CCC'
        ]
    },
    {
        name: 'Java',
        icon: SvgJava,
        description: 'My favorite language for building enterprise applications.',
        achievements: [
            'AAA',
            'BBB',
            'CCC'
        ]
    },
    {
        name: 'Swift',
        icon: SvgSwift,
        description: 'For iOS and macOS application development.',
        achievements: [
            'AAA',
            'BBB',
            'CCC'
        ]
    },
    {
        name: 'C',
        icon: SvgC,
        description: 'For low-level programming and systems development.',
        achievements: [
            'AAA',
            'BBB',
            'CCC'
        ]
    },
    {
        name: 'C++',
        icon: SvgCplusplus,
        description: 'For performance-critical applications and game development.',
        achievements: [
            'AAA',
            'BBB',
            'CCC'
        ]
    },
    {
        name: 'Firebase',
        icon: SvgFirebase,
        description: 'Cloud-based platform for building web and mobile applications.',
        achievements: [
            'AAA',
            'BBB',
            'CCC'
        ]
    },
    {
        name: 'Docker',
        icon: SvgDocker,
        description: 'Powerful tool for containerization and deployment.',
        achievements: [
            'AAA',
            'BBB',
            'CCC'
        ]
    },
    {
        name: 'Typescript',
        icon: SvgTypescript,
        description: 'I use TypeScript to build scalable and maintainable web applications.',
        achievements: [
            'AAA',
            'BBB',
            'CCC'
        ]
    },

]
</script>

<style scoped>

</style>

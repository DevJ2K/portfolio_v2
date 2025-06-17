<template>
  <div class="fixed bg-white z-50 top-12 flex items-center justify-between p-2 md:w-3/4 rounded-full custom-shadow">
    <a href="#" @click="scrollToSection('main', $event)">
      <div class="size-26 h-fit rounded-md flex items-center justify-center -rotate-6 ml-4">
        <NuxtImg src="/images/DevJ2K.png" alt="Assistant J2K" width="400" />
      </div>
    </a>

    <nav class="hidden md:flex gap-12 font-medium">
      <a
        href="#projects"
        class="text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer"
        :class="{ 'text-purple-500': activeSection === 'projects' }"
        @click="scrollToSection('projects', $event)"
      >
        Projects
      </a>
      <a
        href="#work"
        class="text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer"
        :class="{ 'text-purple-500': activeSection === 'work' }"
        @click="scrollToSection('work', $event)"
      >
        Experience
      </a>
      <a
        href="#education"
        class="text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer"
        :class="{ 'text-purple-500': activeSection === 'education' }"
        @click="scrollToSection('education', $event)"
      >
        Education
      </a>
      <a
        href="#skills"
        class="text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer"
        :class="{ 'text-purple-500': activeSection === 'skills' }"
        @click="scrollToSection('skills', $event)"
      >
        Skills
      </a>
    </nav>

    <div class="hidden md:flex">
      <button
        class="cursor-pointer bg-black text-white px-6 py-4 rounded-full hover:bg-gray-800 transition-colors duration-300"
        @click="scrollToSection('contact')"
      >
        Contact me
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('')

const headerOffset = 140

const scrollToSection = (sectionId, event = null) => {
  if (event) {
    event.preventDefault()
  }

  const element = document.getElementById(sectionId)
  if (element) {
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const updateActiveSection = () => {
  const sections = ['main', 'projects', 'work', 'education', 'skills', 'contact']
  const scrollPosition = window.scrollY + headerOffset + 50

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const sectionTop = element.offsetTop
      const sectionBottom = sectionTop + element.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSection.value = sectionId
        break
      }
    }
  }
}

// Gestionnaire de scroll avec throttling pour optimiser les performances
let ticking = false
const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateActiveSection()
      ticking = false
    })
    ticking = true
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  updateActiveSection() // Détecter la section active au chargement
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Animation d'apparition du header */
.header-enter-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.header-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

/* Indicateur de section active */
.active-indicator {
  position: relative;
}

.active-indicator::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #3b82f6;
  transform: scaleX(0);
  transition: transform 0.3s ease-out;
}

.active-indicator.active::after {
  transform: scaleX(1);
}
</style>

<template>
  <div
    class="fixed bg-white z-40 top-12 flex items-center justify-between gap-3 p-2 md:w-[max(70vw,768px)] rounded-full custom-shadow">
    <a href="#" @click="scrollToSection('main', $event)">
      <div class="w-22 md:w-26 h-fit rounded-md flex items-center justify-center md:-rotate-6 md:ml-4">
        <NuxtImg src="/images/DevJ2K.png" alt="Assistant J2K" width="400" />
      </div>
    </a>

    <!-- hidden md:flex -->
    <nav class="menu-item" :class="{
      'menu-item-open': menuIsOpen,
      'menu-item-close': !menuIsOpen,
    }">
      <a href="#projects" class="text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer"
        :class="{ 'text-purple-500': activeSection === 'projects' }" @click="scrollToSection('projects', $event)">
        Projects
      </a>
      <a href="#work" class="text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer"
        :class="{ 'text-purple-500': activeSection === 'work' }" @click="scrollToSection('work', $event)">
        Experience
      </a>
      <a href="#education" class="text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer"
        :class="{ 'text-purple-500': activeSection === 'education' }" @click="scrollToSection('education', $event)">
        Education
      </a>
      <a href="#skills" class="text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer"
        :class="{ 'text-purple-500': activeSection === 'skills' }" @click="scrollToSection('skills', $event)">
        Skills
      </a>
      <a href="#contact" class="block md:hidden text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer"
        :class="{ 'text-purple-500': activeSection === 'contact' }" @click="scrollToSection('contact', $event)">
        Contact
      </a>
    </nav>

    <div>
      <button
        class="hidden md:flex cursor-pointer bg-black text-white px-6 py-4 rounded-full hover:bg-gray-800 transition-colors duration-300"
        @click="modalStore.toggleContactModal">
        Contact me
      </button>
      <button
        class="flex md:hidden cursor-pointer bg-black text-white px-4 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-300"
        @click="toggleMenu">
        <Icon name="material-symbols:menu-rounded" size="24" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('')
const menuIsOpen = ref(false)
const modalStore = useModalStore()

const headerOffset = 140

const scrollToSection = (sectionId, event = null) => {
  if (event) {
    event.preventDefault()
  }

  const element = document.getElementById(sectionId)
  if (element) {
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - headerOffset

    menuIsOpen.value = false;
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

const toggleMenu = () => {
  menuIsOpen.value = !menuIsOpen.value
  console.log('Menu toggled:', menuIsOpen.value)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>

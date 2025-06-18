<template>
  <div class="w-full px-4 flex flex-col items-center justify-center text-foreground text-center">
    <SectionIntroduction
    title="Contact"
    description="You can find my contact information below if you'd like to get in touch." />


    <div class="flex flex-wrap mt-8 gap-8 max-w-3xl justify-center">
      <SocialItem icon="mingcute:github-line" link="https://github.com/DevJ2K" name="@DevJ2K" />
      <SocialItem icon="mdi:linkedin" link="https://www.linkedin.com/in/devj2k" name="@DevJ2K" />
      <SocialItem icon="material-symbols:mail-outline" link="mailto:contact@devj2k.com" name="contact@devj2k.com" />
      <SocialItem icon="mdi:instagram" link="https://www.instagram.com/DevJ2K" name="@DevJ2K" />
    </div>


    <div class="flex mt-12 gap-7 md:gap-14 text-body">
      <div class="flex gap-1.25 md:gap-2 justify-center items-center">
        <div class="size-1.5 md:size-2.5 bg-green-400 rounded-full custom-ping" />
        <p>Available for Internship</p>
      </div>
      <div class="flex gap-1.25 md:gap-2 justify-center items-center">
        <div class="size-1.5 md:size-2.5 bg-green-400 rounded-full custom-ping" />
        <p>Open for work</p>
      </div>
    </div>

    <button
        class="border rounded-full px-6 py-4 flex items-center gap-2 w-fit mt-12 bg-black text-white border-black cursor-pointer hover:bg-gray-800 hover:border-gray-800" @click="modalStore.toggleContactModal">
        Contact me
      </button>
  </div>
</template>

<script lang="ts" setup>
const modalStore = useModalStore()
</script>

<style scoped>
.custom-ping {
  animation: ping 1.0s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }

  75%,
  100% {
    transform: scale(1.5);
    opacity: 1;
  }
}
</style>

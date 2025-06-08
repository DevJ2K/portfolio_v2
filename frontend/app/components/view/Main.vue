<template>
  <div class="h-screen flex flex-col items-center justify-center bg-background text-foreground">
    <h1 class="text-[max(32px,32px)] font-extrabold leading-8">Hey, I’m Theo — aka <span
        class="gradient-text">DevJ2K</span></h1>
    <h2 class="text-[max(28px,28px)] font-extrabold">Software Engineer & Student</h2>

    <p class="text-lg text-zinc-600 mt-4 max-w-2xl text-center">
      Based in Paris and studying at <a href="https://42.fr/en/homepage/" target="_blank" class="gradient-text">42</a>,
      I’m a 19 years old passionate about exploring cutting-edge technologies and mastering new skills. My
      goal is to drive impactful projects that challenge the mind and push boundaries.
    </p>

    <div class="flex mt-7 gap-14 text-sm">
      <div class="flex gap-2 justify-center items-center">
        <div class="size-3 bg-green-400 rounded-full custom-ping" />
        <p>Available for Internship</p>
      </div>
      <div class="flex gap-2 justify-center items-center">
        <div class="size-3 bg-green-400 rounded-full custom-ping" />
        <p>Open for work</p>
      </div>
    </div>
    <div class="flex mt-8 gap-8">
      <SocialItem icon="mingcute:github-line" link="https://github.com/DevJ2K" name="@DevJ2K" />
      <SocialItem icon="mdi:linkedin" link="https://www.linkedin.com/in/devj2k" name="@DevJ2K" />
      <SocialItem icon="material-symbols:mail-outline" link="mailto:contact@devj2k.com" name="contact@devj2k.com" />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.gradient-text {
  /* background: linear-gradient(90deg, #f97316, #f59e0b, #eab308, #84cc16, #22c55e, #06b6d4, #3b82f6, #8b5cf6, #a855f7, #ec4899); */
  background: linear-gradient(90deg, #4F13DD, #A37CFF);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.custom-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 0.1;
  }

  75%,
  100% {
    transform: scale(1.5);
    opacity: 0.8;
  }
}
</style>

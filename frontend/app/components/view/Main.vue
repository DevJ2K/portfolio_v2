<template>
  <div class="w-full h-[90vh] flex flex-col items-center justify-center text-foreground text-center">
    <h1 class="text-title font-extrabold leading-8 max-md:px-4">Hey, I’m Theo — aka <span
        class="gradient-text">DevJ2K</span></h1>
    <h2 class="text-subtitle font-extrabold max-md:px-4"><span class="gradient-text-2">AI</span>-focused Software Engineer & Master's Student</h2>
    <p class="text-body text-foreground-secondary mt-4 max-w-2xl text-center max-md:px-4">
      Based in Paris and currently studying at <a href="https://42.fr/en/homepage/" target="_blank" class="gradient-text-3">42</a>, I’m a 20 years old software engineering student with a strong interest in artificial intelligence and a constant curiosity for emerging technologies. I enjoy diving into complex challenges and building innovative projects that make a real impact.
    </p>

    <div class="flex mt-7 gap-7 md:gap-14 text-body">
      <div class="flex gap-1.25 md:gap-2 justify-center items-center">
        <div class="size-1.5 md:size-2.5 bg-green-400 rounded-full custom-ping" />
        <p>Available for Internship</p>
      </div>
      <div class="flex gap-1.25 md:gap-2 justify-center items-center">
        <div class="size-1.5 md:size-2.5 bg-green-400 rounded-full custom-ping" />
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
  background: linear-gradient(90deg, #4F13DD, #A37CFF);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.gradient-text-2 {
  background: linear-gradient(90deg, #1871ff, #dd52ef);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.gradient-text-3 {
  background: linear-gradient(90deg, #6629ff, #3287ff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

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

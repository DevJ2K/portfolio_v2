<template>
  <div class="flex flex-col max-w-sm gap-4 p-3 rounded-4xl custom-shadow border-4 border-white bg-ui-background">
    <div class="h-fit w-full rounded-3xl overflow-hidden shadow-md">
      <NuxtImg :src="image" alt="Assistant J2K" width="400" />
    </div>
    <h1 class="text-left font-semibold text-xl">{{ title }}</h1>

    <div class="flex gap-2 text-body">
      <a v-if="onlineLink" :href="onlineLink" target="_blank" class="badge badge-shadow badge-hover text-[#38D52A] border border-[#9EFFAB]">
        <Icon name="ant-design:signal-filled" size="16" />
        Online
      </a>

      <a v-if="githubName" :href="`https://github.com/DevJ2K/${githubName}`" target="_blank" class=" badge badge-shadow badge-hover text-[#2A74D5] border border-[#9AC9FF]">
        <Icon name="mingcute:github-line" size="16" />
        GitHub
      </a>

      <span v-if="isSoonOnline" class="cursor-default badge badge-shadow text-[#D5A22A] border border-[#FFDBAB]">
        <Icon name="ant-design:clock-circle-filled" size="16" />
        Soon
      </span>

      <span v-if="isPrivate" class="cursor-default badge badge-shadow text-[#D52A2A] border border-[#FFABAB]">
        <Icon name="ant-design:lock-filled" size="16" />
        Private
      </span>

    </div>



    <p class="text-body text-foreground-secondary text-left mb-2">{{ description }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  onlineLink: {
    type: String,
    required: false
  },
  githubName: {
    type: String,
    required: false
  },
  isPrivate: {
    type: Boolean,
    required: false
  },
  isSoonOnline: {
    type: Boolean,
    required: false
  },
  image: {
    type: String,
    required: true
  },
})
</script>

<style scoped>

.badge {
  display: flex;
  background-color: var(--color-ui-background);
  font-weight: 500;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 1px 12px;
  border-radius: 8px;
}

.custom-shadow {
  box-shadow: 2px 2px 16px 0 rgba(0, 0, 0, 0.07);
}

.badge-shadow {
  box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.1),
              inset 1px 1px 4px 0 rgba(255, 255, 255),
              inset -1px -1px 2px 0 rgba(0, 0, 0, 0.05);
}

.badge-hover:hover {
  background-color: var(--color-ui-background-hover);
  box-shadow: 0.5px 0.5px 0px 0 rgba(0, 0, 0, 0.1);
}
</style>

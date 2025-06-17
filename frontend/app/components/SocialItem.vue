<template>
  <a class="flex items-center gap-2 bg-ui-background hover:bg-ui-background-hover/70 border border-ui-border px-5 py-4 rounded-2xl custom-shadow" :href="link" target="_blank">
    <div class="flex items-center justify-center size-5 md:size-6">
      <Icon :name="icon" size="64" />
    </div>
    <span class="hidden md:block">{{ name }}</span>
  </a>
</template>

<script setup lang="ts">

defineProps({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.custom-shadow {
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.custom-shadow:hover {
  box-shadow: 0.5px 0.5px 0px 0 rgba(0, 0, 0, 0.2);
}

</style>

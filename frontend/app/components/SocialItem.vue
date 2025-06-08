<template>
  <a class="flex items-center space-x-2 bg-ui-background border border-ui-border px-6 py-4 rounded-2xl custom-shadow" :href="link" target="_blank">
    <Icon :name="icon" size="24" />
    <span>{{ name }}</span>
  </a>
</template>

<script setup lang="ts">

const { name, icon } = defineProps({
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

</style>

<template>
  <div class="grid grid-cols-3 items-center justify-center gap-2 bg-ui-background p-2 border border-ui-border rounded-2xl picker-shadow">
    <button
    v-for="(item, index) in items" :key="index"
      :class="['px-4 py-2 rounded-lg font-medium border-b border-r border-transparent text-body', item === selected
      ? 'text-blue-500 selected-shadow border-ui-border'
      : 'text-foreground-secondary cursor-pointer hover:text-blue-800']"
      @click="$emit('select', item)">
      {{ item }}
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  items: {
    type: Array as () => string[],
    required: true
  },
  selected: {
    type: String,
    required: true
  }
})

defineEmits<{
  select: [tag: string]
}>()
</script>

<style scoped>

.selected-shadow {
  box-shadow: inset -3px -3px 3px 0 rgb(255, 255, 255),
              inset 1px 1px 6px 0 rgba(0, 0, 0, 0.10);
}

.picker-shadow {
  box-shadow: -4px -4px 8px 0 rgba(255, 255, 255),
              2px 2px 4px 0 rgba(0, 0, 0, 0.1);
}

</style>

<template>
<svg :class="clazz" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M13.2 18.666h7.4c.236 0 .462-.083.667-.2c.204-.117.415-.264.533-.466c.118-.203.2-.433.2-.667s-.082-.464-.2-.667l-5-8.6a1.2 1.2 0 0 0-.467-.466a1.6 1.6 0 0 0-.733-.2c-.236 0-.462.083-.667.2a1.2 1.2 0 0 0-.466.466l-1.267 2.2L10.667 6c-.118-.203-.262-.417-.467-.534s-.43-.133-.667-.133c-.236 0-.462.016-.666.133s-.416.33-.534.534l-6.2 10.666c-.118.203-.133.433-.133.667s.015.464.133.667c.118.202.33.35.534.466s.43.2.666.2H8c1.85 0 3.195-.83 4.133-2.4l2.267-3.933l1.2-2.067l3.667 6.267H14.4zm-5.267-2.133H4.667l4.866-8.4l2.467 4.2l-1.634 2.848c-.623 1.02-1.333 1.352-2.433 1.352"/></svg>
</template>

<script lang="ts" setup>
defineProps({
	clazz: {
		type: String,
		default: 'text-white w-12 h-12'
	},
});
</script>

<style scoped>

</style>

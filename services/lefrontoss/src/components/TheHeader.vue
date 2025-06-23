<script setup lang="ts">
const { isScrolled } = useScroll({ allowScrollEvent: true });
</script>

<template>
	<header
		class="sticky top-0 left-0 z-50"
		:class="{ 'shadow-md': isScrolled }"
	>
		Header
	</header>
</template>

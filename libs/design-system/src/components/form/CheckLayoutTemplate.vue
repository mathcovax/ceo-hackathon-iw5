<script setup lang="ts">
interface Props {
	errorMessage: string;
	cols?: number;
	hideUselessErrorBlock?: boolean;
}

withDefaults(
	defineProps<Props>(),
	{
		cols: 12,
	},
);
</script>

<template>
	<div
		:style="{
			'grid-column': `span ${cols} / span ${cols}`
		}"
		class="flex flex-col gap-2"
	>
		<slot />

		<small
			v-show="!hideUselessErrorBlock || errorMessage"
			class="text-sm text-destructive h-[1.2rem] overflow-hidden text-ellipsis text-nowrap"
		>
			{{ errorMessage }}
		</small>
	</div>
</template>

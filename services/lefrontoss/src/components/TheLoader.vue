<script setup lang="ts">
const { loaderIsEnabled } = useLoader();
</script>

<template>
	<div
		v-if="loaderIsEnabled"
		class="fixed z-50 inset-0 flex flex-col items-center justify-center bg-background opacity-75"
	>
		<div class="flex flex-col gap-4 items-center justify-center text-center">
			<DSImage
				src="/images/logos/logo.svg"
				alt="Loading logo"
				class="size-[60px] animate-pulse"
			/>

			<div class="space-y-2">
				<h1 class="text-xl font-semibold">
					{{ $t('layout.loader.title') }}
				</h1>

				<p class="text-muted-foreground text-sm">
					{{ $t('layout.loader.description') }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { addPrestationPage } from "./router";

const { $pt } = addPrestationPage.use();
</script>

<template>
	<section class="space-y-6">
		<div class="space-y-2">
			<h1 class="text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<p class="text-muted-foreground">
				{{ $pt("description") }}
			</p>
		</div>

		<div class="" />

		<!-- TODO: remove this exemple -->
		<DSDatePicker />
	</section>
</template>

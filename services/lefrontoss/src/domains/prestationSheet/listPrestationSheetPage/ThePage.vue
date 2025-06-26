<script setup lang="ts">
import { listPrestationSheetPage } from "./router";
import PrestationSheetCard from "./components/PrestationSheetCard.vue";
import { useGetPage } from "./composables/useGetPrestationSheet";

const { $pt } = listPrestationSheetPage.use();
const { listPrestationSheet } = useGetPage();

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

		<div
			v-if="listPrestationSheet && listPrestationSheet.length"
			class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
		>
			<PrestationSheetCard
				v-for="prestation in listPrestationSheet"
				:key="prestation.id"
				v-bind="prestation"
			/>
		</div>

		<div
			v-else
			class="h-96 flex items-center justify-center"
		>
			<p class="text-muted-foreground">
				{{ $pt("noPrestationSheet") }}
			</p>
		</div>
	</section>
</template>

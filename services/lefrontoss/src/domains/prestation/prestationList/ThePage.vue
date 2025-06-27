<script setup lang="ts">
import { listPrestationPage } from "./router";
import PrestationCard from "./components/PrestationCard.vue";
import { usePage } from "./composables/usePage";

const { $pt } = listPrestationPage.use();

const { prestationSheet, listPrestation } = usePage();

</script>

<template>
	<section
		class="space-y-6"
		v-if="prestationSheet"
	>
		<BackButton />

		<div class="space-y-2">
			<h1 class="text-3xl font-bold">
				{{ prestationSheet.name }}
			</h1>

			<p class="text-muted-foreground">
				{{ prestationSheet.description }}
			</p>
		</div>

		<div
			v-if="listPrestation && listPrestation.length"
			class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
		>
			<PrestationCard
				v-for="prestation in listPrestation"
				:key="prestation.id"
				:prestation="prestation"
			/>
		</div>

		<div
			v-else
			class="h-96 flex items-center justify-center"
		>
			<p class="text-muted-foreground">
				{{ $pt("noPrestation") }}
			</p>
		</div>
	</section>
</template>

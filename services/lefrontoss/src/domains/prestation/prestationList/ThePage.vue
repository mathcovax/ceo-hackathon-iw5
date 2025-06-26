<script setup lang="ts">
import { listPrestationPage } from "./router";
import { useGetPrestation } from "./composables/useGetPrestation";
import PrestationSheetCard from "./components/PrestationSheetCard.vue";

const router = useRouter();
const { $pt, params } = listPrestationPage.use();

const { listPrestation } = useGetPrestation(
	params.value.prestationSheetId,
	() => void router.back(),
);

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
			v-if="listPrestation && listPrestation.length"
			class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
		>
			<PrestationSheetCard
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

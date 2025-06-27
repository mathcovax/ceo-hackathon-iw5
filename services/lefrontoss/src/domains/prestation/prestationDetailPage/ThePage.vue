<script setup lang="ts">
import type { AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { usePage } from "./composables/usePage";
import { prestationDetailPage } from "./router";
import PrestationResult from "../components/PrestationResult.vue";

const { $pt } = prestationDetailPage.use();
const { prestation, prestationResult } = usePage();

function getStatusVariant(status: AllPrestation["status"]) {
	switch (status) {
		case "completed":
			return "success";
		case "inProgress":
			return "warning";
		case "created":
			return "outline";
		default:
			return "outline";
	}
}

</script>

<template>
	<section class="space-y-6">
		<BackButton />

		<div class="space-y-2">
			<h1 class="text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<!-- <p class="text-muted-foreground">
				{{ $pt("description") }}
			</p> -->
		</div>

		<DSCard v-if="prestation !== null">
			<DSCardHeader class="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
				<DSCardTitle class="flex items-center gap-3">
					<div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
						<DSIcon
							name="fileDocumentOutline"
							class="text-primary"
						/>
					</div>

					<div class="text-lg font-semibold">
						{{ prestation.id }}
					</div>
				</DSCardTitle>
			</DSCardHeader>

			<DSCardContent class="p-6">
				<div class="flex items-center justify-between">
					<div class="space-y-1">
						<p class="text-sm text-muted-foreground">
							{{ $pt("prestation.status") }}
						</p>

						<DSBadge
							:variant="getStatusVariant(prestation.status)"
							class="text-sm font-medium"
						>
							{{ $t(`prestation.status.${prestation.status}`) }}
						</DSBadge>
					</div>
				</div>
			</DSCardContent>
		</DSCard>

		<DSCard v-if="prestationResult !== null">
			<DSCardHeader class="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
				<DSCardTitle class="flex items-center gap-3">
					<div class="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
						<DSIcon
							name="poll"
							class="text-success"
						/>
					</div>

					<div class="text-lg font-semibold">
						{{ $pt("prestationResult.title") }}
					</div>
				</DSCardTitle>
			</DSCardHeader>

			<DSCardContent class="p-6">
				<PrestationResult
					v-if="prestationResult"
					:prestation-result="prestationResult"
				/>
			</DSCardContent>
		</DSCard>

		<DSCard
			v-else
			class="text-center py-12"
		>
			<div class="mx-auto size-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
				<DSIcon
					name="fileDocumentOutline"
					class="!size-12 text-muted-foreground"
				/>
			</div>

			<h3 class="text-lg font-medium mb-2">
				{{ $pt("noPrestationResult") }}
			</h3>
		</DSCard>
	</section>
</template>

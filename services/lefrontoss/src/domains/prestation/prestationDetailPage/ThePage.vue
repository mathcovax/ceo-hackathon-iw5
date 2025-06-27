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
			return "default";
		case "inProgress":
			return "destructive";
		case "created":
			return "secondary";
		default:
			return "secondary";
	}
}

</script>

<template>
	<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
		<div class="mx-auto max-w-4xl space-y-6">
			<div class="text-center space-y-2">
				<h1 class="text-3xl font-bold text-gray-900">
					{{ $pt("title") }}
				</h1>
			</div>

			<DSCard
				v-if="prestation !== null"
				class="overflow-hidden"
			>
				<DSCardHeader class="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
					<DSCardTitle class="flex items-center gap-3">
						<div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
							<DSIcon
								name="fileDocumentOutline"
								class="text-blue-600"
							/>
						</div>

						<div class="text-lg font-semibold text-gray-900">
							{{ prestation.id }}
						</div>
					</DSCardTitle>
				</DSCardHeader>

				<DSCardContent class="p-6">
					<div class="flex items-center justify-between">
						<div class="space-y-1">
							<p class="text-sm text-gray-500">
								{{ $pt("prestation.status") }}
							</p>

							<DSBadge
								:variant="getStatusVariant(prestation.status)"
								class="text-sm font-medium"
							>
								{{ prestation.status }}
							</DSBadge>
						</div>
					</div>
				</DSCardContent>
			</DSCard>

			<DSCard
				v-if="prestationResult !== null"
				class="overflow-hidden"
			>
				<DSCardHeader class="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
					<DSCardTitle class="flex items-center gap-3">
						<div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
							<DSIcon
								name="poll"
								class="text-green-600"
							/>
						</div>

						<div class="text-lg font-semibold text-gray-900">
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
				<DSCardContent>
					<div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
						<DSIcon
							name="fileDocumentOutline"
							size="large"
							class="!h-12 !w-12 text-gray-400"
						/>
					</div>

					<h3 class="text-lg font-medium text-gray-900 mb-2">
						{{ $pt("noPrestationResult") }}
					</h3>
				</DSCardContent>
			</DSCard>
		</div>
	</div>
</template>

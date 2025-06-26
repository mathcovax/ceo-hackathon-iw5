<script setup lang="ts">
import type { AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { usePage } from "./composables/usePage";
import { prestationDetailPage } from "./router";
import { envs } from "@/envs";

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

function downloadFile(url: string) {
	window.open(`${envs.VITE_IMAGES_PATH}/${url}`, "_blank");
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
					<div
						class="space-y-6"
						v-if="prestationResult !== null"
					>
						<div
							v-for="(data, index) of prestationResult.data"
							:key="data.value"
							class="space-y-3"
						>
							<div
								v-if="data.type === 'text'"
								class="prose prose-gray max-w-none"
							>
								<p class="text-gray-700 leading-relaxed">
									{{ data.value }}
								</p>
							</div>

							<div
								v-else-if="data.type === 'file'"
								class="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
							>
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-3">
										<div class="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
											<svg
												class="h-6 w-6 text-blue-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
												/>
											</svg>
										</div>

										<p class="font-medium text-gray-900">
											{{ data.value.split('/').pop() }}
										</p>
									</div>

									<DSButton
										@click="downloadFile(data.value)"
										variant="outline"
										size="small"
										class="flex items-center gap-2"
										icon="download"
									>
										{{ $t("cta.download") }}
									</DSButton>
								</div>
							</div>

							<DSSeparator
								v-if="index < prestationResult.data.length - 1"
								class="my-4"
							/>
						</div>
					</div>
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

<script setup lang="ts">
import { envs } from "@/envs";
import type { PrestationResult } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

interface Props {
	prestationResult: PrestationResult;
}

defineProps<Props>();

function downloadFile(url: string) {
	window.open(`${envs.VITE_IMAGES_PATH}/${url}`, "_blank");
}

</script>

<template>
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
</template>

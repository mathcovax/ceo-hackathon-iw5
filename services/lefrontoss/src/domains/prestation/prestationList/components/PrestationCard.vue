<script setup lang="ts">
import type { transformCodegenBodyToHttpClientBody } from "@duplojs/http-client";
import type { AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { addPrestationResultPage } from "../../addPrestationResultPage/router";
import { envs } from "@/envs";
import { prestationDetailPage } from "../../prestationDetailPage/router";
import { listPrestationPage } from "../router";

interface Props {
	prestation: transformCodegenBodyToHttpClientBody<AllPrestation>;
}

defineProps<Props>();

const imagePath = envs.VITE_IMAGES_PATH;

function getMode(prestation: Props["prestation"]) {
	return "token" in prestation ? "ai" : "human";
}

const { $pt } = listPrestationPage.use();

function getStatusVariant(status: AllPrestation["status"]) {
	switch (status) {
		case "completed":
			return "success";
		case "inProgress":
			return "warning";
		case "created":
			return "outline";
		default:
			return "secondary";
	}
}
</script>

<template>
	<DSCard>
		<template #header>
			<div class="flex justify-between items-start">
				<div class="flex items-center gap-3">
					<div class="size-10 flex justify-center items-center bg-primary/10 text-primary rounded-full">
						<DSIcon :name="getMode(prestation) === 'ai' ? 'robot' : 'account'" />
					</div>

					<div>
						<div class="flex items-center gap-2 mt-1">
							<DSBadge
								:variant="getMode(prestation) === 'human' ? 'default' : 'secondary'"
								class="text-xs"
							>
								{{ getMode(prestation) === 'ai'
									? $t("prestation.mod.ai")
									: $t("prestation.mod.human") }}
							</DSBadge>

							<DSBadge
								:variant="getStatusVariant(prestation.status)"
							>
								{{ $t(`prestation.status.${prestation.status}`) }}
							</DSBadge>
						</div>
					</div>
				</div>
			</div>
		</template>

		<div>{{ $t("prestation.submissionData") }}:</div>

		<div
			v-for="(field, key) in prestation.submissionData"
			:key="key"
			class="mb-2"
		>
			<te v-if="field?.value && field?.type === 'file' && isImage(field.value)">
				<p>{{ key }}</p>

				<DSImage
					:src="`${imagePath}${field.value}`"
					alt="Prestation file"
					class="block size-40"
				/>
			</te>

			<div v-else-if="field?.type !== 'file'">
				<p class="text-xs font-medium text-muted-foreground tracking-wide">
					<strong>{{ key }}</strong> : {{ field?.value }}
				</p>
			</div>
		</div>

		<template #footer>
			<div class="flex gap-2">
				<RouterLink
					class="ml-auto"
					:to="addPrestationResultPage.createTo({ params: { prestationId: prestation.id } })"
				>
					<DSPrimaryButton size="small">
						{{ $pt("seePrestation") }}
					</DSPrimaryButton>
				</RouterLink>

				<RouterLink
					class="ml-auto"
					:to="prestationDetailPage.createTo({ params: { prestationId: prestation.id } })"
				>
					<DSPrimaryButton size="small">
						{{ $pt("seeClientResult") }}
					</DSPrimaryButton>
				</RouterLink>
			</div>
		</template>
	</DSCard>
</template>

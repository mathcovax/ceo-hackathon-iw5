<script setup lang="ts">
import type { transformCodegenBodyToHttpClientBody } from "@duplojs/http-client";
import type { AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { addPrestationResultPage } from "../../addPrestationResultPage/router";
import { envs } from "@/envs";

interface Props {
	prestation: transformCodegenBodyToHttpClientBody<AllPrestation>;
}

defineProps<Props>();

function getMode(prestation: Props["prestation"]) {
	return "token" in prestation ? "ai" : "human";
}
const imagePath = envs.VITE_IMAGES_PATH;

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
								class="text-xs"
								:variant="'secondary'"
								:class="{
									'bg-muted text-muted-foreground border-border': prestation.status === 'created',
									'bg-warning/10 text-warning border-warning/20': prestation.status === 'inProgress',
									'bg-success/5 text-success border-success/20': prestation.status === 'completed',
								}"
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
			<div v-if="field !== undefined">
				<div v-if="field.type === 'file'">
					<p>{{ key }}</p>

					<DSImage
						:src="`${imagePath}${field.value}`"
						alt="Prestation file"
						class="block size-40"
					/>
				</div>

				<div v-else>
					<strong class="text-xs font-medium text-muted-foreground tracking-wide">
						{{ key }} : {{ field.value }}
					</strong>
				</div>
			</div>
		</div>

		<template #footer>
			<RouterLink
				class="ml-auto"
				:to="addPrestationResultPage.createTo({ params: { prestationId: prestation.id } })"
			>
				<DSPrimaryButton size="small">
					{{ $t("cta.seePrestationSheet") }}
				</DSPrimaryButton>
			</RouterLink>
		</template>
	</DSCard>
</template>

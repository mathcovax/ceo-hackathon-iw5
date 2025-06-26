<script setup lang="ts">
import { envs } from "@/envs";
import { addPrestationResultPage } from "./router";
import { usePage } from "./composables/usePage";
import type { AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { isImage } from "@/utils/isImage";
import DSLabel from "@vendors/design-system/components/ui/label/DSLabel.vue";
import DSImage from "@vendors/design-system/components/DSImage.vue";
import DSLinkButton from "@vendors/design-system/components/ui/button/DSLinkButton.vue";
import { formatDate } from "@vendors/design-system/lib/utils";

const { $pt } = addPrestationResultPage.use();
const { prestation, CreatePrestationResultForm, onSubmitCreatePrestationResultForm } = usePage();

const imagePath = envs.VITE_IMAGES_PATH;

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
	<section class="space-y-6">
		<BackButton />

		<div class="space-y-2">
			<h1 class="text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<p class="text-muted-foreground">
				{{ $pt("description") }}
			</p>
		</div>

		<template v-if="prestation">
			<DSCard>
				<template #header>
					<div class="flex gap-4 justify-between items-start">
						<div class="space-y-1">
							<DSLabel class="text-muted-foreground">
								{{ $pt("prestation.id") }}
							</DSLabel>

							<p class="font-medium">
								{{ prestation.id }}
							</p>
						</div>

						<DSBadge :variant="getStatusVariant(prestation.status)">
							{{ $t(`prestation.status.${prestation.status}`) }}
						</DSBadge>
					</div>
				</template>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div
						v-for="(field, label) in prestation.submissionData"
						:key="label"
						class="flex flex-col gap-2"
					>
						<DSLabel class="text-muted-foreground">
							{{ label }}
						</DSLabel>

						<a
							v-if="field?.type === 'url'"
							:href="field.value"
							target="_blank"
							rel="noopener noreferrer"
						>
							<DSLinkButton icon="web">
								{{ field.value }}
							</DSLinkButton>

						</a>

						<a
							v-else-if="field && field.value && field.type === 'file' && !isImage(field.value)"
							:href="imagePath + field.value"
							target="_blank"
							rel="noopener noreferrer"
						>
							<DSLinkButton icon="download">
								{{ $t("cta.download") }}
							</DSLinkButton>
						</a>

						<DSImage
							v-else-if="field && field.value && field?.type === 'file' && isImage(field.value)"
							:src="imagePath + field.value"
							:alt="field.value"
							class="size-48 rounded-lg"
						/>

						<p v-else-if="field?.type === 'date'">
							{{ formatDate(field.value) }}
						</p>

						<p v-else>
							{{ field?.value }}
						</p>
					</div>
				</div>
			</DSCard>

			<CreatePrestationResultForm @submit="onSubmitCreatePrestationResultForm">
				<DSPrimaryButton
					v-if="prestation.status !=='completed'"
					type="submit"
				>
					{{ prestation.status ==='created' ? $t("cta.start") : $t("cta.submit") }}
				</DSPrimaryButton>
			</CreatePrestationResultForm>
		</template>
	</section>
</template>

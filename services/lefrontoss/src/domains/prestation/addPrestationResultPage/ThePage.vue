<script setup lang="ts">
import type { AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { usePage } from "./composables/usePage";
import { addPrestationResultPage } from "./router";

const { $pt } = addPrestationResultPage.use();
const { prestation, CreatePrestationResultForm, onSubmitCreatePrestationResultForm } = usePage();

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
				<div class="flex gap-4 justify-between items-start">
					<div class="space-y-1">
						<p class="text-sm text-muted-foreground">
							{{ $pt("prestation.id") }}
						</p>

						<p class="font-medium">
							{{ prestation.id }}
						</p>
					</div>

					<DSBadge
						:variant="getStatusVariant(prestation.status)"
						class="text-sm font-medium"
					>
						{{ $t(`prestation.status.${prestation.status}`) }}
					</DSBadge>
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

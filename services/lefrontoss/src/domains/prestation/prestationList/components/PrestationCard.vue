<script setup lang="ts">
import { listPrestationSheetPage } from "@/domains/prestationSheet/listPrestationSheetPage/router";
import type { transformCodegenBodyToHttpClientBody } from "@duplojs/http-client";
import type { AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

interface Props {
	prestation: transformCodegenBodyToHttpClientBody<AllPrestation>;
}

defineProps<Props>();

function getTextField(data: Props["prestation"], key: string) {
	const field = data?.submissionData?.[key];
	return field && field.type === "text" ? field.value : "";
}

function getMode(prestation: Props["prestation"]) {
	return "token" in prestation ? "ai" : "human";
}

</script>

<template>
	<DSCard>
		<div>Hello</div>

		<template #header>
			<div class="flex justify-between items-start">
				<div class="flex items-center gap-3">
					<div class="size-10 flex justify-center items-center bg-primary/10 text-primary rounded-full">
						<DSIcon :name="getMode(prestation) === 'ai' ? 'robot' : 'account'" />
					</div>

					<div>
						<h2 class="text-lg font-semibold">
							{{ getTextField(prestation, 'name') || '—' }}
						</h2>

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

		<p class="text-sm text-muted-foreground mb-4 line-clamp-3">
			{{ getTextField(prestation, 'description') || '—' }}
		</p>

		<div
			v-if="Array.isArray(prestation.submissionData.keywords?.value)"
			class="space-y-2"
		>
			<h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
				Spécialités
			</h4>

			<div class="flex flex-wrap gap-1">
				<DSBadge
					v-for="(kw, idx) in (prestation.submissionData.keywords?.value as string[]).slice(0, 4)"
					:key="idx"
					variant="outline"
					class="text-xs px-2 py-1"
				>
					{{ kw }}
				</DSBadge>

				<DSBadge
					v-if="(prestation.submissionData.keywords?.value as string[]).length > 4"
					variant="outline"
					class="text-xs px-2 py-1 text-muted-foreground"
				>
					+{{ (prestation.submissionData.keywords?.value as string[]).length - 4 }}
				</DSBadge>
			</div>
		</div>

		<template #footer>
			<RouterLink
				class="ml-auto"
				:to="listPrestationSheetPage.createTo()"
			>
				<DSPrimaryButton size="small">
					{{ $t("cta.seeMore") }}
				</DSPrimaryButton>
			</RouterLink>
		</template>
	</DSCard>
</template>

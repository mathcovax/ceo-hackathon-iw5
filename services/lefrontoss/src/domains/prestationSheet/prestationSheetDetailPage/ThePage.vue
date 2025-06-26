<script setup lang="ts">
import { prestationSheetDetailPage } from "./router";
import { usePage } from "./composables/usePage";

const { $pt } = prestationSheetDetailPage.use();
const { prestationSheet, dinamicCreatePrestationForm, onSubmit } = usePage();
</script>

<template>
	<section
		class="space-y-6"
		v-if="prestationSheet"
	>
		<BackButton />

		<div class="space-y-6">
			<div class="flex flex-col lg:flex-row gap-6 lg:justify-between lg:items-start">
				<div class="space-y-4">
					<div class="flex gap-3 items-center">
						<div class="size-12 flex justify-center items-center bg-primary/10 text-primary rounded-full">
							<DSIcon :name="prestationSheet.mode === 'ai' ? 'robot' : 'account'" />
						</div>

						<div>
							<h1 class="text-3xl font-bold">
								{{ prestationSheet.name }}
							</h1>

							<div class="mt-2 flex gap-2 items-center">
								<DSBadge :variant="prestationSheet.mode === 'human' ? 'default' : 'secondary'">
									{{ prestationSheet.mode === "ai" ? $t("prestation.mod.ai") : $t("prestation.mod.human") }}
								</DSBadge>

								<DSBadge
									:variant="prestationSheet.status === 'available' ? 'secondary' : 'outline'"
									:class="{
										'bg-success/5 text-success border-success/20': prestationSheet.status === 'available',
										'bg-muted text-muted-foreground border-border': prestationSheet.status === 'disabled'
									}"
								>
									{{ prestationSheet.status === "available" ? $t("prestation.status.available") : $t("prestation.status.disabled") }}
								</DSBadge>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="space-y-6">
				<DSCard>
					<template #header>
						<h2 class="text-xl font-semibold">
							{{ $pt("label.description") }}
						</h2>
					</template>

					<div class="space-y-4">
						<p class="text-muted-foreground leading-relaxed">
							{{ prestationSheet.description }}
						</p>
					</div>
				</DSCard>

				<aside
					v-if="dinamicCreatePrestationForm"
				>
					<component
						:is="dinamicCreatePrestationForm.Form"
						@submit="onSubmit"
					>
						<DSPrimaryButton type="submit">
							{{ $pt("label.createPrestation") }}
						</DSPrimaryButton>
					</component>
				</aside>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { prestationDetailPage } from "../../prestationDetailPage/router";

interface Props {
	id: string;
	name: string;
	description: string;
	mode: "ai" | "humain";
	status: "disabled" | "available";
	keywords: { value: string }[];
}

defineProps<Props>();
</script>

<template>
	<DSCard>
		<template #header>
			<div class="flex justify-between items-start">
				<div class="flex items-center gap-3">
					<div class="size-10 flex justify-center items-center bg-primary/10 text-primary rounded-full">
						<DSIcon :name="mode === 'ai' ? 'robot' : 'account'" />
					</div>

					<div>
						<h2 class="text-lg font-semibold">
							{{ name }}
						</h2>

						<div class="flex items-center gap-2 mt-1">
							<DSBadge
								:variant="mode === 'humain' ? 'default' : 'secondary'"
								class="text-xs"
							>
								{{ mode === "ai" ? $t("prestation.mod.ai") : $t("prestation.mod.human") }}
							</DSBadge>

							<DSBadge
								:variant="status === 'available' ? 'secondary' : 'outline'"
								class="text-xs"
								:class="{
									'bg-success/5 text-success border-success/20': status === 'available',
									'bg-muted text-muted-foreground border-border': status === 'disabled'
								}"
							>
								{{ status === "available" ? $t("prestation.status.available") : $t("prestation.status.disabled") }}
							</DSBadge>
						</div>
					</div>
				</div>
			</div>
		</template>

		<p class="text-sm text-muted-foreground mb-4 line-clamp-3">
			{{ description }}
		</p>

		<div
			v-if="keywords.length > 0"
			class="space-y-2"
		>
			<h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
				Spécialités
			</h4>

			<div class="flex flex-wrap gap-1">
				<DSBadge
					v-for="keyword in keywords.slice(0, 4)"
					:key="keyword.value"
					variant="outline"
					class="text-xs px-2 py-1"
				>
					{{ keyword.value }}
				</DSBadge>

				<DSBadge
					v-if="keywords.length > 4"
					variant="outline"
					class="text-xs px-2 py-1 text-muted-foreground"
				>
					+{{ keywords.length - 4 }}
				</DSBadge>
			</div>
		</div>

		<template #footer>
			<RouterLink
				class="ml-auto"
				:to="prestationDetailPage.createTo({ params: { prestationId: id } })"
			>
				<DSPrimaryButton size="small">
					{{ $t("cta.seeMore") }}
				</DSPrimaryButton>
			</RouterLink>
		</template>
	</DSCard>
</template>

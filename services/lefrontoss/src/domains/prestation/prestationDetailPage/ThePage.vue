<script setup lang="ts">
import { prestationDetailPage } from "./router";

const { $pt } = prestationDetailPage.use();

// mock
const prestation = {
	id: "1",
	name: "Assistant Rédaction IA",
	description:
		"Spécialisé dans la rédaction de contenu marketing, articles de blog et documentation technique. "
		+ "Capable de produire du contenu de qualité en plusieurs langues avec une expertise particulière "
		+ "dans les domaines du marketing digital, de la technologie et du e-commerce.",
	longDescription:
		"Notre assistant IA de rédaction utilise les dernières technologies de traitement du langage naturel "
		+ "pour créer du contenu engageant et optimisé SEO. Il peut s'adapter à différents tons et styles "
		+ "d'écriture selon vos besoins spécifiques. Que ce soit pour des articles de blog, des fiches produits, "
		+ "des newsletters ou de la documentation technique, cet assistant garantit une qualité constante et une "
		+ "livraison rapide.",
	mode: "ai" as const,
	status: "available" as const,
	keywords: [
		{ value: "Rédaction" },
		{ value: "Marketing" },
		{ value: "SEO" },
		{ value: "Documentation" },
		{ value: "Blog" },
		{ value: "E-commerce" },
		{ value: "Newsletter" },
		{ value: "Copywriting" },
	],
	features: [
		"Rédaction multilingue (FR, EN, ES, DE)",
		"Optimisation SEO automatique",
		"Adaptation du ton selon le contexte",
		"Recherche de mots-clés intégrée",
		"Vérification orthographique avancée",
		"Templates personnalisables",
	],
	pricing: {
		type: "word" as const,
		basePrice: 0.05,
		unit: "mot",
	},
	responseTime: "2-4 heures",
	availability: "24h/7j",
};
</script>

<template>
	<section class="space-y-6">
		<BackButton />

		<div class="space-y-6">
			<div class="flex flex-col lg:flex-row gap-6 lg:justify-between lg:items-start">
				<div class="space-y-4">
					<div class="flex gap-3 items-center">
						<div class="size-12 flex justify-center items-center bg-primary/10 text-primary rounded-full">
							<DSIcon :name="prestation.mode === 'ai' ? 'robot' : 'account'" />
						</div>

						<div>
							<h1 class="text-3xl font-bold">
								{{ prestation.name }}
							</h1>

							<div class="mt-2 flex gap-2 items-center">
								<DSBadge :variant="prestation.mode === 'humain' ? 'default' : 'secondary'">
									{{ prestation.mode === "ai" ? $t("prestation.mod.ai") : $t("prestation.mod.human") }}
								</DSBadge>

								<DSBadge
									:variant="prestation.status === 'available' ? 'secondary' : 'outline'"
									:class="{
										'bg-success/5 text-success border-success/20': prestation.status === 'available',
										'bg-muted text-muted-foreground border-border': prestation.status === 'disabled'
									}"
								>
									{{ prestation.status === "available" ? $t("prestation.status.available") : $t("prestation.status.disabled") }}
								</DSBadge>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			<div class="lg:col-span-2 space-y-8">
				<DSCard>
					<template #header>
						<h2 class="text-xl font-semibold">
							Description
						</h2>
					</template>

					<div class="space-y-4">
						<p class="text-muted-foreground leading-relaxed">
							{{ prestation.description }}
						</p>

						<p class="leading-relaxed">
							{{ prestation.longDescription }}
						</p>
					</div>
				</DSCard>

				<DSCard>
					<template #header>
						<h2 class="text-xl font-semibold">
							Fonctionnalités incluses
						</h2>
					</template>

					<ul class="space-y-3">
						<li
							v-for="feature in prestation.features"
							:key="feature"
							class="flex gap-3 items-start"
						>
							<DSIcon
								name="check"
								class="text-success shrink-0"
							/>

							<span>{{ feature }}</span>
						</li>
					</ul>
				</DSCard>

				<DSCard>
					<template #header>
						<h2 class="text-xl font-semibold">
							Spécialités
						</h2>
					</template>

					<div class="flex flex-wrap gap-2">
						<DSBadge
							v-for="keyword in prestation.keywords"
							:key="keyword.value"
							variant="outline"
						>
							{{ keyword.value }}
						</DSBadge>
					</div>
				</DSCard>
			</div>

			<aside class="space-y-6">
				<DSCard>
					<template #header>
						<h3 class="text-lg font-semibold">
							Informations pratiques
						</h3>
					</template>

					<div class="space-y-4">
						<div class="flex justify-between items-center">
							<span class="text-muted-foreground">Temps de réponse</span>

							<span class="font-medium">{{ prestation.responseTime }}</span>
						</div>

						<DSSeparator />

						<div class="flex justify-between items-center">
							<span class="text-muted-foreground">Disponibilité</span>

							<span class="font-medium">{{ prestation.availability }}</span>
						</div>

						<DSSeparator />

						<div class="flex justify-between items-center">
							<span class="text-muted-foreground">Tarif de base</span>

							<span class="font-medium">{{ prestation.pricing.basePrice }}€/{{ prestation.pricing.unit }}</span>
						</div>
					</div>
				</DSCard>

				<DSPrimaryButton
					size="full"
					:disabled="prestation.status === 'disabled'"
				>
					{{ prestation.status === 'available' ? prestation.mode === "humain" ? $t("cta.contact") : $t("cta.use") : $t("prestation.status.disabled") }}
				</DSPrimaryButton>
			</aside>
		</div>
	</section>
</template>

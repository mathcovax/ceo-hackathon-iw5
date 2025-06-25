<script setup lang="ts">
import { listPrestationSheetPage } from "./router";
import ContratorCard from "./components/PrestationSheetCard.vue";

const { $pt } = listPrestationSheetPage.use();

// mock data for prestations
const prestations = [
	{
		id: "1",
		name: "Assistant Rédaction IA",
		description:
			"Spécialisé dans la rédaction de contenu marketing, articles de blog et documentation technique. "
			+ "Capable de produire du contenu de qualité en plusieurs langues.",
		mode: "ai" as const,
		status: "available" as const,
		keywords: [
			{ value: "Rédaction" },
			{ value: "Marketing" },
			{ value: "SEO" },
			{ value: "Documentation" },
		],
	},
	{
		id: "2",
		name: "Marie Dupont",
		description:
			"Graphiste freelance avec 8 ans d'expérience en identité visuelle et design web. "
			+ "Spécialisée dans les startups et PME.",
		mode: "humain" as const,
		status: "available" as const,
		keywords: [
			{ value: "Design graphique" },
			{ value: "Identité visuelle" },
			{ value: "Web design" },
			{ value: "Branding" },
		],
	},
	{
		id: "3",
		name: "CodeBot Pro",
		description:
			"IA de développement capable de générer du code, effectuer des revues de code et créer de la "
			+ "documentation technique.",
		mode: "ai" as const,
		status: "disabled" as const,
		keywords: [
			{ value: "Développement" },
			{ value: "Code review" },
			{ value: "Documentation" },
			{ value: "Tests" },
		],
	},
	{
		id: "4",
		name: "Thomas Martin",
		description:
			"Développeur full-stack JavaScript avec expertise en React, Node.js et bases de données. "
			+ "Disponible pour projets web et mobile.",
		mode: "humain" as const,
		status: "available" as const,
		keywords: [
			{ value: "JavaScript" },
			{ value: "React" },
			{ value: "Node.js" },
			{ value: "Full-stack" },
		],
	},
];

</script>

<template>
	<section class="space-y-6">
		<div class="space-y-2">
			<h1 class="text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<p class="text-muted-foreground">
				{{ $pt("description") }}
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<ContratorCard
				v-for="prestation in prestations"
				:key="prestation.id"
				v-bind="prestation"
			/>
		</div>
	</section>
</template>

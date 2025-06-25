import { notFoundPage } from "@/domains/edito/notFoundPage/router";
import { addPrestationPage } from "@/domains/prestation/addPrestationPage/router";
import { listPrestationSheetPage } from "@/domains/prestation/listPrestationSheetPage/router";

export const FRfr = {
	page: {
		[notFoundPage.name]: {
			title: "Page non trouvée",
			description: "La page que vous recherchez n'existe pas.",
		},
		[listPrestationSheetPage.name]: {
			title: "Liste des fiches de prestations",
			description: "Découvrez les fiches de prestations disponibles.",
			noPrestationSheet: "Aucune fiche de prestation n'est disponible pour le moment.",
		},
		[addPrestationPage.name]: {
			title: "Ajouter une prestation",
			description: "Ajoutez une nouvelle prestation.",
			form: {
				label: {
					prestationMode: "Mode de prestation",
					name: "Nom",
					description: "Description",
					keywords: "Mots clés",
					addKeyword: "Ajouter un mot clé",
					submissionFields: "Champs de soumission",
					addSubmissionField: "Ajouter un champ",
					selectOption: {
						human: "Humain",
						ai: "IA",
						text: "Texte",
						number: "Numérique",
					},
				},
			},
		},
	},
	layout: {
		loader: {
			title: "Chargement en cours...",
			description: "Veuillez patienter.",
		},
		header: {
			nav: {
				listPrestationSheet: "Liste fiches de prestations",
				addPrestation: "Ajouter une fiche de prestation",
			},
		},
		footer: {
			nav: {
			},
		},
	},
	prestation: {
		mod: {
			ai: "IA",
			human: "Humain",
		},
		status: {
			disabled: "Indisponible",
			available: "Disponible",
		},
	},
	formMessage: {
		required: "Champ obligatoire.",
		positive: "Doit être un nombre positif.",
		max: "Ne doit pas dépasser {value}.",
		min: "Doit faire au moins {value}.",
		maxLength: "Doit faire au plus {value} caractères.",
		minLength: "Doit faire au moins {value} caractères.",
		int: "Le nombre doit être un entier.",
	},
	cta: {
		backHome: "Retour à l'accueil",
		connection: "Inscription / Connexion",
		seeMore: "Voir plus",
		contact: "Contacter",
		use: "Utiliser",
		back: "Retour",
	},
	responses: {
	},
};

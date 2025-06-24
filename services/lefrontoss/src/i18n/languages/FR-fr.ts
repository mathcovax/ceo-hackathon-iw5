import { notFoundPage } from "@/domains/edito/notFoundPage/router";

export const FRfr = {
	page: {
		[notFoundPage.name]: {
			title: "Page non trouvée",
			description: "La page que vous recherchez n'existe pas.",
		},
	},
	layout: {
		loader: {
			title: "Chargement en cours...",
			description: "Veuillez patienter.",
		},
		header: {
			nav: {
				listContractors: "Liste des prestataires",
				addContractor: "Ajouter un prestataire",
			},
		},
		footer: {
			nav: {
			},
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
	},
	responses: {
	},
};

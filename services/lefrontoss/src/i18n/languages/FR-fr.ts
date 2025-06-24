import { notFoundPage } from "@/domains/edito/notFoundPage/router";
import { addPrestationPage } from "@/domains/prestation/addPrestationPage/router";
import { listPrestationsPage } from "@/domains/prestation/listPrestationPage/router";

export const FRfr = {
	page: {
		[notFoundPage.name]: {
			title: "Page non trouvée",
			description: "La page que vous recherchez n'existe pas.",
		},
		[listPrestationsPage.name]: {
			title: "Liste des prestations",
			description: "Découvrez les prestations disponibles.",
		},
		[addPrestationPage.name]: {
			title: "Ajouter une prestation",
			description: "Ajoutez une nouvelle prestation.",
		},
	},
	layout: {
		loader: {
			title: "Chargement en cours...",
			description: "Veuillez patienter.",
		},
		header: {
			nav: {
				listPrestations: "Liste des prestataires",
				addPrestation: "Ajouter un prestataire",
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
		contact: "Contacter",
	},
	responses: {
	},
};

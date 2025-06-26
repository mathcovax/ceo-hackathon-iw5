import { notFoundPage } from "@/domains/edito/notFoundPage/router";
import { addPrestationSheetPage } from "@/domains/prestationSheet/addPrestationSheetPage/router";
import { listPrestationSheetPage } from "@/domains/prestationSheet/listPrestationSheetPage/router";
import { prestationDetailPage } from "@/domains/prestation/prestationDetailPage/router";
import { prestationSheetDetailPage } from "@/domains/prestationSheet/prestationSheetDetailPage/router";

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
		[prestationSheetDetailPage.name]: {
			label: {
				description: "Description",
				createPrestation: "Créer une prestation",
			},
			createPrestation: "Créer une préstation",
		},
		[addPrestationSheetPage.name]: {
			title: "Ajouter une prestation",
			description: "Ajoutez une nouvelle prestation.",
			form: {
				label: {
					prestationMode: "Mode de prestation",
					name: "Nom de la prestation",
					description: "Description de la prestation",
					keywords: "Mots clés de la prestation",
					addKeyword: "Ajouter un mot clé",
					keyword: "Mot clé",
					fields: "Champs de la prestation",
					addField: "Ajouter un champ",
					fieldType: "Type de champ",
					fieldName: "Nom du champ",
					fieldRequired: "Champ requis",
					selectOption: {
						human: "Humain",
						ai: "IA",
						text: "Texte",
						number: "Numérique",
						textarea: "Zone de texte",
						file: "Fichier",
						url: "URL",
						date: "Date",
						selectText: "Selection de text",
					},
				},
			},
		},
		[prestationDetailPage.name]: {
			title: "Detail de prestation",
			prestation: {
				id: "ID",
				status: "Statut",
			},
			prestationResult: {
				title: "Résultat",
			},
			noPrestationResult: "Pas résultat pour le moment",
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
			created: "Created",
			inProgress: "InProgress",
			completed: "Completed",
		},
		submissionData: "Submission Data",
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
		seePrestationSheet: "Voir les prestations sheet",
		seePrestation: "Voir les prestations",
		contact: "Contacter",
		use: "Utiliser",
		back: "Retour",
		submit: "Soumettre",
		download: "Télécharger",
	},
	responses: {
	},
};

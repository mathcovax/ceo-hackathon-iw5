import { notFoundPage } from "@/domains/edito/notFoundPage/router";
import { addPrestationSheetPage } from "@/domains/prestationSheet/addPrestationSheetPage/router";
import { listPrestationSheetPage } from "@/domains/prestationSheet/listPrestationSheetPage/router";
import { prestationDetailPage } from "@/domains/prestation/prestationDetailPage/router";
import { prestationSheetDetailPage } from "@/domains/prestationSheet/prestationSheetDetailPage/router";
import { addPrestationResultPage } from "@/domains/prestation/addPrestationResultPage/router";
import { listPrestationPage } from "@/domains/prestation/prestationList/router";
import { homePage } from "@/domains/edito/homePage/router";

export const FRfr = {
	page: {
		[homePage.name]: {
			hero: {
				subtitle: "La plateforme intelligente de gestion des services professionnels",
			},
			features: {
				human: {
					title: "Expertise humaine",
					description: "Trouvez des experts qualifiés pour vos besoins spécifiques.",
				},
				ai: {
					title: "Intelligence artificielle",
					description: "Utilisez l'IA pour automatiser et optimiser vos processus.",
				},
				tracking: {
					title: "Suivi en temps réel",
					description: "Suivez l'avancement des prestations en temps réel.",
				},
			},
			quickActions: {
				title: "Actions Rapides",
				description: "Accédez rapidement aux fonctionnalités principales",
				browse: {
					title: "Consulter les Services",
					description: "Parcourez tous les services disponibles",
				},
				create: {
					title: "Créer un Service",
					description: "Ajoutez un nouveau service à votre catalogue",
				},
			},
		},
		[notFoundPage.name]: {
			title: "Page non trouvée",
			description: "La page que vous recherchez n'existe pas.",
		},
		[listPrestationSheetPage.name]: {
			title: "Liste des fiches de prestations",
			description: "Découvrez les fiches de prestations disponibles.",
			noPrestationSheet: "Aucune fiche de prestation n'est disponible pour le moment.",
			orderPrestation: "Commander une préstation",
			seeAllPrestation: "Voir les préstations",
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
		[addPrestationResultPage.name]: {
			title: "Rendu de prestation",
			description: "Rendez votre prestation en remplissant le formulaire ci-dessous.",
			prestation: {
				id: "ID de la prestation",

			},
			form: {
				label: {
					comment: "Commentaire",
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
					},
				},
			},
		},
		[listPrestationPage.name]: {
			seeClientResult: "Voir le résultat",
			seePrestation: "Voir la préstaion",
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
			copyright: "Fait avec ❤️ par l'équipe 18 lors du Hackathon ECITV x ESGI 2025",
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
			created: "Créée",
			inProgress: "En cours",
			completed: "Terminée",
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
		start: "Commencer",
		submit: "Soumettre",
		download: "Télécharger",
	},
	responses: {
		prestationSheet: {
			created: "Fiche de prestation créée avec succès.",
			updated: "Fiche de prestation mise à jour avec succès.",
			createdButAIAgentUnavaible: "La fiche de préstation a étais créer mais le ping du service à échoué.",
		},
		prestation: {
			created: "Prestation créée avec succès.",
			start: "La prestation a été démarrée.",
			completed: "La prestation a été complétée.",
			failedCheckAIAgentAvailability: "Le service de cette préstation ne répond pas.",
		},
	},
};

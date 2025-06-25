import { prestationSheetModeEnum } from "@/libs/lebackoss/types";

export function useCreatePrestationSheetForm() {
	const submissionFieldName = useCheckLayout(
		textFormField,
		{
			mandatory: true,
			label: "",
			schema: zod.string(),
			template: checkLayoutTemplateGridCols({ hideUselessErrorBlock: true }),
		},
	);

	const constantFields = {
		name: useCheckLayout(
			textFormField,
			{
				mandatory: true,
				label: "Nom de la préstation :",
				schema: zod.string(),
			},
		),
		description: useCheckLayout(
			textareaFormField,
			{
				mandatory: true,
				label: "Description de la préstation :",
				schema: zod.string(),
			},
		),
		keywords: useBaseLayout(
			useRepeatLayout(
				useCheckLayout(
					textFormField,
					{
						label: "Mot clé",
						mandatory: true,
						schema: zod.string(),
						template: checkLayoutTemplateGridCols({ hideUselessErrorBlock: true }),
					},
				),
				{
					template: repeatLayoutTemplate({
						addLabel: "Ajouter un mot clé",
						colsByItems: 4,
					}),
				},
			),
			{

				mandatory: true,
				label: "Mots clef de la préstation :",
			},
		),
		submissionFields: useCheckLayout(
			useRepeatLayout(
				useUnionLayout(
					[
						[
							"text",
							useMultiFieldLayout({
								fieldName: submissionFieldName,
							}),
						],
						[
							"number",
							useMultiFieldLayout({
								fieldName: submissionFieldName,
							}),
						],
					],
					{
						template: unionLayoutTemplate({
							selectLabel: "Type de champ",
							labelMapper: {
								text: "Texte",
								number: "Numérique",
							},
						}),
					},
				),
				{
					template: repeatLayoutTemplate({
						addLabel: "Ajouter un champ",
						colsByItems: 6,
					}),
				},
			),
			{
				mandatory: true,
				label: "Champ néccésaire pour la préstation :",
				schema: zod.any().array().min(1),
			},
		),
	};

	const { Form, formValue, check } = useFormBuilder(
		useBaseLayout(
			useUnionLayout(
				[
					[
						prestationSheetModeEnum.human,
						useMultiFieldLayout(constantFields),
					],
					[
						prestationSheetModeEnum.ai,
						useMultiFieldLayout({
							...constantFields,
							aIAgent: useMultiFieldLayout({

							}),
						}),
					],
				],
				{
					template: unionLayoutTemplate({
						selectLabel: "Mode de préstation",
						labelMapper: {
							[prestationSheetModeEnum.human]: "Humaine",
							[prestationSheetModeEnum.ai]: "IA",
						},
					}),
				},
			),
			{
				mandatory: true,
				label: "",
			},
		),
	);

	return {
		CreatePrestationSheetForm: Form,
		checkCreatePrestationSheetForm: check,
	};
}

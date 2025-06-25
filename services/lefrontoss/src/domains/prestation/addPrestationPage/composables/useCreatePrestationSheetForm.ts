import { prestationSheetModeEnum } from "@/libs/lebackoss/types";

export function useCreatePrestationSheetForm() {
	const submissionFieldName = useCheckLayout(
		textFormField,
		{
			mandatory: true,
			label: "",
			schema: zod.string(),
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
						mandatory: true,
						schema: zod.string(),
					},
				),
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
				),
				{ maxItem: 3 },
			),
			{
				mandatory: true,
				label: "Champ néccésaire pour la préstation :",
				schema: zod.any().array().min(1),
			},
		),
	};

	const { Form, check } = useFormBuilder(
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
			),
			{
				mandatory: true,
				label: "Création d'une fiche de préstation",
			},
		),
	);

	return {
		CreatePrestationSheetForm: Form,
		checkCreatePrestationSheetForm: check,
	};
}

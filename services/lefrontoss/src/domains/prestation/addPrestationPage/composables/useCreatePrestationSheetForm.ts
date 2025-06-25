import { prestationSheetModeEnum } from "@/libs/lebackoss/types";
import { addPrestationPage } from "../router";

export function useCreatePrestationSheetForm() {
	const { $pt } = addPrestationPage.use();

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
				label: $pt("form.label.name"),
				schema: zod.string(),
			},
		),
		description: useCheckLayout(
			textareaFormField,
			{
				mandatory: true,
				label: $pt("form.label.description"),
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
						template: checkLayoutTemplateGridCols({ hideUselessErrorBlock: true }),
					},
				),
				{
					template: repeatLayoutTemplate({
						addLabel: $pt("form.label.addKeyword"),
						colsByItems: 4,
					}),
				},
			),
			{
				mandatory: true,
				label: $pt("form.label.keywords"),
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
							labelMapper: {
								text: $pt("form.label.selectOption.text"),
								number: $pt("form.label.selectOption.number"),
							},
						}),
					},
				),
				{
					template: repeatLayoutTemplate({
						addLabel: $pt("form.label.addSubmissionField"),
						colsByItems: 6,
					}),
				},
			),
			{
				mandatory: true,
				label: $pt("form.label.submissionFields"),
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
						selectLabel: $pt("form.label.prestationMode"),
						labelMapper: {
							[prestationSheetModeEnum.human]: $pt("form.label.selectOption.human"),
							[prestationSheetModeEnum.ai]: $pt("form.label.selectOption.ai"),
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

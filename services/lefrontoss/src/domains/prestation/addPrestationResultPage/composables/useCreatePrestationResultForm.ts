
import { addPrestationResultPage } from "../router";

export function useCreatePrestationResultForm() {
	const { $pt } = addPrestationResultPage.use();

	const constantFields = {
		comment: useCheckLayout(
			textareaFormField,
			{
				mandatory: true,
				label: $pt("form.label.comment"),
				schema: zod.string(),
			},
		),
	};

	const resultFields = {
		resultFields: useBaseLayout(
			useRepeatLayout(
				useUnionLayout(
					[
						[
							"text",
							useCheckLayout(
								textFormField,
								{
									mandatory: true,
									schema: zod.string(),
									template: checkLayoutTemplateGridCols({ hideUselessErrorBlock: true }),
								},
							),
						],
						[
							"textarea",
							useCheckLayout(
								textareaFormField,
								{
									mandatory: true,
									schema: zod.string(),
									template: checkLayoutTemplateGridCols({ hideUselessErrorBlock: true }),
								},
							),
						],
						[
							"file",
							useCheckLayout(
								fileFormFiels,
								{
									mandatory: true,
									schema: zod.string(),
									template: checkLayoutTemplateGridCols({ hideUselessErrorBlock: true }),
								},
							),
						],
					],
					{
						template: unionLayoutTemplate({
							selectLabel: $pt("form.label.fieldType"),
							labelMapper: {
								text: $pt("form.label.selectOption.text"),
								textarea: $pt("form.label.selectOption.textarea"),
								file: $pt("form.label.selectOption.file"),
							},
						}),
					},
				),
				{
					template: repeatLayoutTemplate({
						addLabel: $pt("form.label.addField"),
						colsByItems: 6,
					}),
				},
			),
		),
	};

	const { Form, check, reset, formValue } = useFormBuilder(
		useUnionLayout(
			[
				[
					"created",
					useEmptyLayout(),
				],
				[
					"result",
					useMultiFieldLayout({
						...constantFields,
						...resultFields,
					}),
				],
				[
					"completed",
					useEmptyLayout(),
				],
			],
			{
				template: unionSelectLessLayoutTemplate({}),
			},
		),
	);

	// function switchToResultForm(prestationId: string) {
	// 	void lebackossClient
	// 		.post(
	// 			"/start-prestation",
	// 			{
	// 				body: {
	// 					prestationId: prestationId,
	// 				},
	// 			},
	// 		)
	// 		.whenInformation(
	// 			"prestation.start",
	// 			() => {
	// 				formValue.value.type = "result";
	// 			},
	// 		);
	// }

	function switchForm(type: typeof formValue.value.type) {
		formValue.value.type = type;
	}

	return {
		CreatePrestationResultForm: Form,
		switchForm,
		check,
		reset,
		formValue,
	};
}

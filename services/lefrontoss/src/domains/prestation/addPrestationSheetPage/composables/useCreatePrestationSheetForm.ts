import { fileTypeEnum, prestationSheetModeEnum } from "@/libs/lebackoss/types";
import type { SubmissionField } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { match, P } from "ts-pattern";
import { addPrestationPage } from "../router";

export function useCreatePrestationSheetForm() {
	const { $pt } = addPrestationPage.use();

	const constantSubmissionFields = {
		fieldName: useCheckLayout(
			textFormField,
			{
				mandatory: true,
				label: $pt("form.label.fieldName"),
				schema: zod.string(),
				template: checkLayoutTemplateGridCols({ hideUselessErrorBlock: true }),
			},
		),

		required: useBaseLayout(
			booleanFormField,
			{
				mandatory: true,
				props: {
					label: $pt("form.label.fieldRequired"),
				},
			},
		),
	};

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
						label: $pt("form.label.keyword"),
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
		submissionFields: useBaseLayout(
			useRepeatLayout(
				useUnionLayout(
					[
						[
							"text",
							useMultiFieldLayout({
								...constantSubmissionFields,
							}),
						],
						[
							"number",
							useMultiFieldLayout({
								...constantSubmissionFields,

							}),
						],
						[
							"textarea",
							useMultiFieldLayout({
								...constantSubmissionFields,
							}),
						],
						[
							"file",
							useMultiFieldLayout({
								...constantSubmissionFields,
								fileTypes: useCheckLayout(
									multiComboBoxFormField,
									{
										mandatory: true,
										props: {
											items: fileTypeEnum.toTuple()
												.map((fileType) => ({
													label: fileType,
													value: fileType,
												})),
											placeholder: "",
											emptyLabel: "",
										},
										schema: zod
											.object({ value: zod.enum(fileTypeEnum.toTuple()) })
											.transform(({ value }) => value)
											.array()
											.min(1),
									},
								),
							}),
						],
						[
							"url",
							useMultiFieldLayout({
								...constantSubmissionFields,
							}),
						],
						[
							"date",
							useMultiFieldLayout({
								...constantSubmissionFields,
							}),
						],
					],
					{
						template: unionLayoutTemplate({
							selectLabel: $pt("form.label.fieldType"),
							labelMapper: {
								text: $pt("form.label.selectOption.text"),
								number: $pt("form.label.selectOption.number"),
								textarea: $pt("form.label.selectOption.textarea"),
								file: $pt("form.label.selectOption.file"),
								url: $pt("form.label.selectOption.url"),
								date: $pt("form.label.selectOption.date"),
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
			{
				mandatory: true,
				label: $pt("form.label.fields"),
			},
		),
	};

	const { Form, formValue, check } = useFormBuilder(
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
							pingUrl: useCheckLayout(
								textFormField,
								{
									mandatory: true,
									schema: zod.string().url(),
									label: "Ping Url",
								},
							),
							entryPointUrl: useCheckLayout(
								textFormField,
								{
									mandatory: true,
									schema: zod.string().url(),
									label: "Entrypoint Url",
								},
							),
							tokenKey: useCheckLayout(
								textFormField,
								{
									mandatory: true,
									schema: zod.string(),
									label: "Clef de token",
								},
							),
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
	);

	function onSubmit() {
		const result = check();

		if (!result) {
			return;
		}

		const { name, description, keywords, submissionFields } = result.value;

		const constantFields = {
			name,
			description,
			keywords: keywords.map((value) => ({ value })),
			submissionFields: submissionFields.map(
				(value) => match(value)
					.returnType<SubmissionField>()
					.with(
						{ type: P.union("date", "number", "text", "textarea", "url") },
						({ type, value }) => ({
							type,
							name: value.fieldName,
							require: value.required,
						}),
					)
					.with(
						{ type: "file" },
						({ type, value }) => ({
							type,
							name: value.fieldName,
							require: value.required,
							fileTypes: value.fileTypes,
						}),
					)
					.exhaustive(),
			),
		};

		void lebackossClient
			.post(
				"/create-prestation-sheet",
				{
					body: result.type === "human"
						? {
							mode: "human",
							...constantFields,
						}
						: {
							mode: "ai",
							...constantFields,
							aIAgent: result.value.aIAgent,
						},
				},
			);
	}

	return {
		CreatePrestationSheetForm: Form,
		onSubmitCreatePrestationSheetForm: onSubmit,
	};
}

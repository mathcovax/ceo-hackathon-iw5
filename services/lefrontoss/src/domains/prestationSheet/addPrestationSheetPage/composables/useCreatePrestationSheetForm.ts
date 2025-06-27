import { fileTypeEnum, prestationSheetModeEnum } from "@/libs/lebackoss/types";
import type { SubmissionField } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { match, P } from "ts-pattern";
import { addPrestationSheetPage } from "../router";
import { aIAgentRules, prestationSheetRules, submissionFieldRules } from "@vendors/entity-rules";
import { randomString } from "@/utils/ramdomString";

export function useCreatePrestationSheetForm() {
	const { $pt } = addPrestationSheetPage.use();
	const { t } = useI18n();

	const constantSubmissionFields = {
		fieldName: useCheckLayout(
			textFormField,
			{
				mandatory: true,
				label: $pt("form.label.fieldName"),
				schema: zod.string()
					.min(
						submissionFieldRules.name.min,
						{ message: t("formMessage.minLength", { value: submissionFieldRules.name.min }) },
					)
					.max(
						submissionFieldRules.name.max,
						{ message: t("formMessage.maxLength", { value: submissionFieldRules.name.max }) },
					),
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

	const minLength = 1;
	const constantFields = {
		name: useCheckLayout(
			textFormField,
			{
				mandatory: true,
				label: $pt("form.label.name"),
				schema: zod.string()
					.min(
						prestationSheetRules.name.min,
						{ message: t("formMessage.minLength", { value: prestationSheetRules.name.min }) },
					)
					.max(
						prestationSheetRules.name.max,
						{ message: t("formMessage.maxLength", { value: prestationSheetRules.name.max }) },
					),
			},
		),
		description: useCheckLayout(
			textareaFormField,
			{
				mandatory: true,
				label: $pt("form.label.description"),
				schema: zod.string()
					.min(
						prestationSheetRules.description.min,
						{ message: t("formMessage.minLength", { value: prestationSheetRules.description.min }) },
					)
					.max(
						prestationSheetRules.description.max,
						{ message: t("formMessage.maxLength", { value: prestationSheetRules.description.max }) },
					),
			},
		),
		keywords: useBaseLayout(
			useRepeatLayout(
				useCheckLayout(
					textFormField,
					{
						label: $pt("form.label.keyword"),
						mandatory: true,
						schema: zod.string()
							.min(
								prestationSheetRules.keyword.min,
								{ message: t("formMessage.minLength", { value: prestationSheetRules.keyword.min }) },
							)
							.max(
								prestationSheetRules.keyword.max,
								{ message: t("formMessage.maxLength", { value: prestationSheetRules.keyword.max }) },
							),
						template: checkLayoutTemplateGridCols({ hideUselessErrorBlock: true }),
					},
				),
				{
					template: repeatLayoutTemplate({
						addLabel: $pt("form.label.addKeyword"),
						colsByItems: 4,
					}),
					maxItems: prestationSheetRules.keyword.maxQuantity,
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
											.min(minLength),
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
						[
							"selectText",
							useMultiFieldLayout({
								...constantSubmissionFields,
								values: useRepeatLayout(
									useCheckLayout(
										textFormField,
										{
											mandatory: true,
											schema: zod.string()
												.min(
													submissionFieldRules.selectTextValue.min,
													{ message: t("formMessage.minLength", { value: submissionFieldRules.selectTextValue.min }) },
												)
												.max(
													submissionFieldRules.selectTextValue.max,
													{ message: t("formMessage.maxLength", { value: submissionFieldRules.selectTextValue.max }) },
												),
										},
									),
									{
										template: repeatLayoutTemplate({
											addLabel: $pt("form.label.addField"),
											colsByItems: 6,
										}),
									},
								),
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
								selectText: $pt("form.label.selectOption.selectText"),
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

	const { Form, check, reset } = useFormBuilder(
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
									schema: zod.string().url()
										.min(
											aIAgentRules.pingUrl.min,
											{ message: t("formMessage.minLength", { value: aIAgentRules.pingUrl.min }) },
										)
										.max(
											aIAgentRules.pingUrl.max,
											{ message: t("formMessage.maxLength", { value: aIAgentRules.pingUrl.max }) },
										),
									label: "Ping Url",
								},
							),
							entryPointUrl: useCheckLayout(
								textFormField,
								{
									mandatory: true,
									schema: zod.string().url()
										.min(
											aIAgentRules.entryPointUrl.min,
											{ message: t("formMessage.minLength", { value: aIAgentRules.entryPointUrl.min }) },
										)
										.max(
											aIAgentRules.entryPointUrl.max,
											{ message: t("formMessage.maxLength", { value: aIAgentRules.entryPointUrl.max }) },
										),
									label: "Entrypoint Url",
								},
							),
							tokenKey: useCheckLayout(
								textFormField,
								{
									mandatory: true,
									schema: zod.string()
										.min(
											aIAgentRules.tokenKey.min,
											{ message: t("formMessage.minLength", { value: aIAgentRules.tokenKey.min }) },
										)
										.max(
											aIAgentRules.tokenKey.max,
											{ message: t("formMessage.maxLength", { value: aIAgentRules.tokenKey.max }) },
										),
									defaultValue: randomString(),
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
						{ type: "selectText" },
						({ type, value }) => ({
							type,
							name: value.fieldName,
							require: value.required,
							values: value.values,
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
			)
			.whenInformation(
				["prestationSheet.created", "prestationSheet.createdButAIAgentUnavaible"],
				() => {
					reset();
				},
			);
	}

	return {
		CreatePrestationSheetForm: Form,
		onSubmitCreatePrestationSheetForm: onSubmit,
	};
}

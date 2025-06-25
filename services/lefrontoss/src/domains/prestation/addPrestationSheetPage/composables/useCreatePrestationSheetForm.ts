import { fileTypeEnum, prestationSheetModeEnum } from "@/libs/lebackoss/types";
import type { SubmissionField } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { match, P } from "ts-pattern";

export function useCreatePrestationSheetForm() {
	const constantSubmissionFields = {
		fieldName: useCheckLayout(
			textFormField,
			{
				mandatory: true,
				label: "Nom du champ :",
				schema: zod.string(),
				template: checkLayoutTemplateGridCols({ hideUselessErrorBlock: true }),
			},
		),

		required: useBaseLayout(
			booleanFormField,
			{
				mandatory: true,
				props: {
					label: "Champ requis",
				},
			},
		),
	};

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
		submissionFields: useRepeatLayout(
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
					selectLabel: "Mode de préstation",
					labelMapper: {
						[prestationSheetModeEnum.human]: "Humaine",
						[prestationSheetModeEnum.ai]: "IA",
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


import { prestationResultDataRules } from "@vendors/entity-rules";
import { addPrestationResultPage } from "../router";

export function useCreatePrestationResultForm() {
	const { $pt } = addPrestationResultPage.use();
	const { t } = useI18n();

	const { Form, check, reset, formValue } = useFormBuilder(
		useUnionLayout(
			[
				[
					"created",
					useEmptyLayout(),
				],
				[
					"result",
					useRepeatLayout(
						useUnionLayout(
							[
								[
									"textarea",
									useCheckLayout(
										textareaFormField,
										{
											mandatory: true,
											schema: zod.string()
												.min(
													prestationResultDataRules.text.min,
													{ message: t("formMessage.minLength", { value: prestationResultDataRules.text.min }) },
												)
												.max(
													prestationResultDataRules.text.max,
													{ message: t("formMessage.maxLength", { value: prestationResultDataRules.text.max }) },
												),
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
											schema: zod.instanceof(File),
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

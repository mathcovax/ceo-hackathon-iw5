import type { PrestationSheet, SubmissionData } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { prestationSheetDetailPage } from "../router";
import { match } from "ts-pattern";
import { numberFormFiels } from "@vendors/design-system/utils/formFields";
import type { ZodType } from "zod";
import { type transformCodegenBodyToHttpClientBody } from "@duplojs/http-client";
import { toBase64 } from "@/utils/toBase64";
import { getExtention } from "@/utils/getExtension";
import { fileTypeEnum, fileTypeMapper } from "@/libs/lebackoss/types";
import { submissionDataRules } from "@vendors/entity-rules";

function optionelRequired<
	GenericZodType extends ZodType,
>(
	require: boolean,
	schema: GenericZodType,
) {
	const refinedNumber = 0;

	return zod.unknown()
		.refine(
			require ? ((value) => !!value || value === refinedNumber) : (() => true),
			{ message: "Champ obligatoire." },
		)
		.pipe(schema);
}

export function usePage() {
	const router = useRouter();
	const { params } = prestationSheetDetailPage.use();
	const { t } = useI18n();

	const prestationSheet = ref<PrestationSheet | null>(null);

	watch(
		() => params.value.prestationSheetId,
		(prestationSheetId) => {
			void lebackossClient
				.post(
					"/find-one-prestation-sheet",
					{
						body: {
							prestationSheetId,
						},
					},
				)
				.whenInformation(
					"prestationSheet.found",
					({ body }) => {
						prestationSheet.value = body;
					},
				)
				.whenRequestError(
					() => void router.back(),
				);
		},
		{ immediate: true },
	);

	const dinamicCreatePrestationForm = computed(
		() => prestationSheet.value
			? useFormBuilder(
				useMultiFieldLayout(
					prestationSheet.value.submissionFields.map(
						(submissionField) => match(submissionField)
							.with(
								{ type: "text" },
								({ name, require }) => [
									name,
									useCheckLayout(
										textFormField,
										{
											mandatory: true,
											schema: optionelRequired(
												require,
												zod.string()
													.min(
														submissionDataRules.text.min,
														{ message: t("formMessage.minLength", { value: submissionDataRules.text.min }) },
													)
													.max(
														submissionDataRules.text.max,
														{ message: t("formMessage.maxLength", { value: submissionDataRules.text.max }) },
													)
													.transform((value) => ({
														type: "text" as const,
														value,
													})),
											),
											label: name,
										},
									),
								] as const,
							)
							.with(
								{ type: "number" },
								({ name, require }) => [
									name,
									useCheckLayout(
										numberFormFiels,
										{
											mandatory: true,
											schema: optionelRequired(
												require,
												zod.number()
													.min(
														submissionDataRules.number.min,
														{ message: t("formMessage.minLength", { value: submissionDataRules.number.min }) },
													)
													.max(
														submissionDataRules.number.max,
														{ message: t("formMessage.maxLength", { value: submissionDataRules.number.max }) },
													)
													.transform((value) => ({
														type: "number" as const,
														value,
													})),
											),
											label: name,
										},
									),
								] as const,
							)
							.with(
								{ type: "date" },
								({ name, require }) => [
									name,
									useCheckLayout(
										dateFormField,
										{
											mandatory: true,
											defaultValue: new Date().toISOString(),
											schema: optionelRequired(
												require,
												zod
													.coerce
													.date()
													.transform((value) => ({
														type: "date" as const,
														value: value.toISOString(),
													})),
											),
											label: name,
										},
									),
								] as const,
							)
							.with(
								{ type: "file" },
								({ name, require, fileTypes }) => [
									name,
									useCheckLayout(
										fileFormFiels,
										{
											mandatory: true,
											schema: optionelRequired(
												require,
												zod.instanceof(File)
													.nullable()
													.refine(
														(file) => !file || fileTypes.includes(
															fileTypeMapper[getExtention(file.name) ?? ""] ?? fileTypeEnum.any,
														),
														{ message: `Type de fichiers attendu : ${fileTypes.join(", ")}` },
													)
													.transform((value) => ({
														type: "file" as const,
														value,
													})),
											),
											label: name,
										},
									),
								] as const,
							)
							.with(
								{ type: "textarea" },
								({ name, require }) => [
									name,
									useCheckLayout(
										textareaFormField,
										{
											mandatory: true,
											schema: optionelRequired(
												require,
												zod.string()
													.min(
														submissionDataRules.textarea.min,
														{ message: t("formMessage.minLength", { value: submissionDataRules.textarea.min }) },
													)
													.max(
														submissionDataRules.textarea.max,
														{ message: t("formMessage.maxLength", { value: submissionDataRules.textarea.max }) },
													)
													.transform((value) => ({
														type: "textarea" as const,
														value,
													})),
											),
											label: name,
										},
									),
								] as const,
							)
							.with(
								{ type: "url" },
								({ name, require }) => [
									name,
									useCheckLayout(
										textFormField,
										{
											mandatory: true,
											schema: optionelRequired(
												require,
												zod.string()
													.url()
													.min(
														submissionDataRules.url.min,
														{ message: t("formMessage.minLength", { value: submissionDataRules.url.min }) },
													)
													.max(
														submissionDataRules.url.max,
														{ message: t("formMessage.maxLength", { value: submissionDataRules.url.max }) },
													)
													.transform((value) => ({
														type: "url" as const,
														value,
													})),
											),
											label: name,
										},
									),
								] as const,
							)
							.with(
								{ type: "selectText" },
								({ name, require, values }) => [
									name,
									useCheckLayout(
										selectStringFormField,
										{
											mandatory: true,
											schema: optionelRequired(
												require,
												zod.string()
													.min(
														submissionDataRules.selectText.min,
														{ message: t("formMessage.minLength", { value: submissionDataRules.selectText.min }) },
													)
													.max(
														submissionDataRules.selectText.max,
														{ message: t("formMessage.maxLength", { value: submissionDataRules.selectText.max }) },
													)
													.transform((value) => ({
														type: "selectText" as const,
														value,
													})),
											),
											props: {
												items: values,
												placeholder: "Selectioné une valeur.",
											},
											defaultValue: values.find(Boolean),
											label: name,
										},
									),
								] as const,
							)
							.exhaustive(),
					),
				),
			)
			: null,
	);

	async function onSubmit() {
		const result = dinamicCreatePrestationForm.value?.check();

		if (!result) {
			return;
		}

		const submissionData = await Object.entries(result)
			.reduce<Promise<transformCodegenBodyToHttpClientBody<SubmissionData>>>(
				async(accPromised, [key, data]) => {
					const acc = await accPromised;

					if (data.type === "file") {
						acc[key] = {
							type: "file",
							value: data.value && await toBase64(data.value),
						};
						return acc;
					} else {
						acc[key] = data;
					}

					return acc;
				},
				Promise.resolve({}),
			);

		void lebackossClient
			.post(
				"/create-prestation/{prestationSheetId}",
				{
					params: {
						prestationSheetId: params.value.prestationSheetId,
					},
					body: submissionData,
				},
			)
			.whenInformation(
				"prestation.created",
				() => dinamicCreatePrestationForm.value?.reset(),
			);
	}

	return {
		prestationSheet,
		dinamicCreatePrestationForm,
		onSubmit,
	};
}

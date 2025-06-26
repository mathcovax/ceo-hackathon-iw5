import { type GetValueObject, zod, type ZodSpace } from "@vendors/clean";
import { type FieldTypeEnum } from "./submissionField";
import { submissionDataRules } from "@vendors/entity-rules";

function createSubmissionData<
	GenericType extends FieldTypeEnum,
	GenericSchema extends ZodSpace.ZodType,
>(
	type: GenericType,
	schema: GenericSchema,
) {
	return zod
		.object({
			type: zod.literal(type),
			value: schema,
		});
}

const textData = createSubmissionData(
	"text",
	zod.string()
		.min(submissionDataRules.text.min)
		.max(submissionDataRules.text.max),
);

const textareaData = createSubmissionData(
	"textarea",
	zod.string()
		.min(submissionDataRules.textarea.min)
		.max(submissionDataRules.textarea.max),
);

const numberData = createSubmissionData(
	"number",
	zod.number()
		.min(submissionDataRules.number.min)
		.max(submissionDataRules.number.max),
);

const dateData = createSubmissionData(
	"date",
	zod.coerce.date(),
);

const urlData = createSubmissionData(
	"url",
	zod.string().url()
		.min(submissionDataRules.url.min)
		.max(submissionDataRules.url.max),
);

const fileData = createSubmissionData(
	"file",
	zod.string(),
);

const selectTextData = createSubmissionData(
	"selectText",
	zod.string()
		.min(submissionDataRules.selectText.min)
		.max(submissionDataRules.selectText.max),
);

export const submissionDataObjecter = zod
	.record(
		zod.string(),
		zod.union([
			textData,
			textareaData,
			numberData,
			dateData,
			urlData,
			fileData,
			selectTextData,
		]).optional(),
	)
	.createValueObjecter("submissionData");

export type SubmissionData = GetValueObject<typeof submissionDataObjecter>;

import { createEnum, type GetEnumValue, type GetValueObject, zod } from "@vendors/clean";
import { submissionFieldRules } from "@vendors/entity-rules";

export const fieldTypeEnum = createEnum([
	"text",
	"textarea",
	"number",
	"date",
	"url",
	"file",
	"selectText",
]);

export type FieldTypeEnum = GetEnumValue<typeof fieldTypeEnum>;

function createSubmissionField<
	GenericType extends FieldTypeEnum,
>(type: GenericType) {
	return zod
		.object({
			type: zod.literal(type),
			name: zod
				.string()
				.min(submissionFieldRules.name.min)
				.max(submissionFieldRules.name.max),
			require: zod.boolean(),
		});
}

const textField = createSubmissionField("text");

const textareaField = createSubmissionField("textarea");

const numberField = createSubmissionField("number");

const dateField = createSubmissionField("date");

const urlField = createSubmissionField("url");

const selectTextField = createSubmissionField("selectText")
	.extend({
		values: zod
			.string()
			.min(submissionFieldRules.selectTextValue.min)
			.max(submissionFieldRules.selectTextValue.max)
			.array()
			.min(submissionFieldRules.selectTextValue.minQuantity)
			.max(submissionFieldRules.selectTextValue.maxQuantity),
	});

export const fileTypeEnum = createEnum([
	"pdf",
	"image",
	"text",
	"csv",
	"any",
]);

export type FileTypeEnum = GetEnumValue<typeof fileTypeEnum>;

export const fileTypeEnumSchema = zod.enum(fileTypeEnum.toTuple());

const fileField = createSubmissionField("file")
	.extend({
		fileTypes: fileTypeEnumSchema.array()
			.min(submissionFieldRules.fileTypes.minQuantity)
			.max(submissionFieldRules.fileTypes.maxQuantity),
	});

export const submissionFieldObjecter = zod
	.union([
		textField,
		textareaField,
		numberField,
		dateField,
		urlField,
		fileField,
		selectTextField,
	])
	.createValueObjecter("submissionField");

export type SubmissionField = GetValueObject<typeof submissionFieldObjecter>;


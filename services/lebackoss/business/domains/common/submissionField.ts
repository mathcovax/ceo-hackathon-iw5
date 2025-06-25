import { createEnum, type GetEnumValue, type GetValueObject, zod } from "@vendors/clean";

export const fieldTypeEnum = createEnum([
	"text",
	"textarea",
	"number",
	"date",
	"url",
	"file",
]);

export type FieldTypeEnum = GetEnumValue<typeof fieldTypeEnum>;

function createSubmissionField<
	GenericType extends FieldTypeEnum,
>(type: GenericType) {
	return zod
		.object({
			type: zod.literal(type),
			name: zod.string(),
			require: zod.boolean(),
		});
}

const textField = createSubmissionField("text");

const textareaField = createSubmissionField("textarea");

const numberField = createSubmissionField("number");

const dateField = createSubmissionField("date");

const urlField = createSubmissionField("url");

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
		fileTypes: fileTypeEnumSchema.array(),
	});

export const submissionFieldObjecter = zod
	.union([
		textField,
		textareaField,
		numberField,
		dateField,
		urlField,
		fileField,
	])
	.createValueObjecter("submissionField");

export type SubmissionField = GetValueObject<typeof submissionFieldObjecter>;


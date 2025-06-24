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

const textField = createSubmissionField("text")
	.extend({
		min: zod.number(),
		max: zod.number(),
	});

const textareaField = createSubmissionField("textarea")
	.extend({
		min: zod.number(),
		max: zod.number(),
	});

const numberField = createSubmissionField("number")
	.extend({
		min: zod.number(),
		max: zod.number(),
	});

const dateField = createSubmissionField("date");

const urlField = createSubmissionField("url");

const fileTypeEnum = createEnum([
	"pdf",
	"image",
	"text",
	"csv",
]);

const fileField = createSubmissionField("file")
	.extend({
		fileType: zod.enum(fileTypeEnum.toTuple()),
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


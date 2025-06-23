import { createEnum, zod } from "@vendors/clean";

function createField<
	GenericType extends string,
>(type: GenericType) {
	return zod
		.object({
			type: zod.literal(type),
			name: zod.string(),
			require: zod.boolean(),
		});
}

const textField = createField("text").extend({
	min: zod.number(),
	max: zod.number(),
});

const textareaField = createField("textarea").extend({
	min: zod.number(),
	max: zod.number(),
});

const numberField = createField("number").extend({
	min: zod.number(),
	max: zod.number(),
});

const dateField = createField("date");

const urlField = createField("url");

const fileTypeEnum = createEnum([
	"pdf",
	"image",
	"text",
	"csv",
]);

const fileField = createField("file").extend({
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

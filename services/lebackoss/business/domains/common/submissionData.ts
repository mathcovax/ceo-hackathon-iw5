import { type GetValueObject, zod, type ZodSpace } from "@vendors/clean";
import { type FieldTypeEnum } from "./submissionField";

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
	zod.string(),
);

const numberData = createSubmissionData(
	"number",
	zod.number(),
);

const dateData = createSubmissionData(
	"date",
	zod.date(),
);

const urlData = createSubmissionData(
	"url",
	zod.string().url(),
);

const fileData = createSubmissionData(
	"file",
	zod.string(),
);

export const submissionDataObjecter = zod
	.record(
		zod.string(),
		zod.union([
			textData,
			numberData,
			dateData,
			urlData,
			fileData,
		]).optional(),
	)
	.createValueObjecter("submissionData");

export type SubmissionData = GetValueObject<typeof submissionDataObjecter>;

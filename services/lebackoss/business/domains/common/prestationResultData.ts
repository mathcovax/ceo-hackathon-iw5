import { createEnum, zod, type ZodSpace, type GetEnumValue, type GetValueObject } from "@vendors/clean";
import { prestationResultDataRules } from "@vendors/entity-rules";

export const presationResultDataTypeEnum = createEnum([
	"text",
	"file",
]);

export type PresationResultDataTypeEnum = GetEnumValue<typeof presationResultDataTypeEnum>;

function createPrestationResultData<
	GenericType extends PresationResultDataTypeEnum,
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

const textData = createPrestationResultData(
	"text",
	zod.string()
		.min(prestationResultDataRules.text.min)
		.max(prestationResultDataRules.text.max),
);

const fileData = createPrestationResultData("file", zod.string());

export const prestationResultDataObjecter = zod
	.union([
		textData,
		fileData,
	])
	.createValueObjecter("prestationResultData");

export type PrestationResultData = GetValueObject<typeof prestationResultDataObjecter>;

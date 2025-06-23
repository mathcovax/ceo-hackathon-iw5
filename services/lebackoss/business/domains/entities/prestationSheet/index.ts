import { submissionFieldObjecter } from "@business/domains/common/submissionField";
import { EntityHandler, type GetEntityProperties, createEnum, zod } from "@vendors/clean";

export const prestationSheetIdObjecter = zod
	.string()
	.createValueObjecter("prestationSheetId");

export const prestationSheetNameObjecter = zod
	.string()
	.createValueObjecter("prestationSheetName");

export const prestationSheetDescriptionObjecter = zod
	.string()
	.createValueObjecter("prestationSheetName");

export const prestationSheetPriceObjecter = zod
	.number()
	.positive()
	.createValueObjecter("prestationSheetPrice");

export const prestationSheetKeywordObjecter = zod
	.object({
		value: zod.string(),
	})
	.createValueObjecter("prestationSheetKeyword");

export const prestationSheetModeEnum = createEnum([
	"ai",
	"humain",
]);

export const prestationSheetModeObjecter = zod
	.enum(prestationSheetModeEnum.toTuple())
	.createValueObjecter("prestationSheetMode");

export class PrestationSheetEntity extends EntityHandler.create({
	id: prestationSheetIdObjecter,
	mode: prestationSheetModeObjecter,
	name: prestationSheetNameObjecter,
	description: prestationSheetDescriptionObjecter,
	keywords: prestationSheetKeywordObjecter.array(),
	submissionFields: submissionFieldObjecter.array(),
}) {
	public static create(params: GetEntityProperties<typeof PrestationSheetEntity>) {
		return new PrestationSheetEntity({
			...params,
		});
	}
}


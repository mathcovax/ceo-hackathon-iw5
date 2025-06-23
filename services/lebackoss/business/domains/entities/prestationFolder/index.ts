
import { EntityHandler, type GetValueObject, zod, type GetEntityProperties } from "@vendors/clean";

export const prestationIdObjecter = zod.string().createValueObjecter("prestationId");

export const prestationNameObjecter = zod
	.string()
	.createValueObjecter("prestationName");

export const prestationPriceObjecter = zod
	.number()
	.positive()
	.createValueObjecter("prestationPrice");

export const prestationKeywordObjecter = zod
	.object({
		value: zod.string(),
	}).createValueObjecter("prestationKeyword");

export const prestationInputsObjecter = zod
	.object({
		value: zod.string(),
	}).createValueObjecter("prestationInputs");

export const prestationOutputsObjecter = zod
	.object({
		value: zod.string(),
	}).createValueObjecter("prestationOutputs");

export class PrestationEntity extends EntityHandler.create({
	id: prestationIdObjecter,
	name: prestationNameObjecter,
	price: prestationPriceObjecter,
	keywords: prestationKeywordObjecter.array(),
	inputs: prestationInputsObjecter.array(),
	outputs: prestationOutputsObjecter.array(),
}) {
	public static create(params: GetEntityProperties<typeof PrestationEntity>) {
		return new PrestationEntity({
			...params,
		});
	}
}


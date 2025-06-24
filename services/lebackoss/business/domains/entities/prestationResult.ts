import { EntityHandler, type GetValueObject, type GetEntityProperties, zod } from "@vendors/clean";
import { Prestation } from "./prestation";
import { prestationResultDataObjecter } from "../common/prestationResultData";

export namespace PrestationResult {
	export const idObjecter = zod
		.string()
		.createValueObjecter("prestationResultId");

	export type Id = GetValueObject<typeof idObjecter>;
}

export class PrestationResultEntity extends EntityHandler.create({
	id: PrestationResult.idObjecter,
	prestationId: Prestation.idObjecter,
	data: prestationResultDataObjecter.array(),
}) {
	public static create(params: GetEntityProperties<typeof PrestationResultEntity>) {
		return new PrestationResultEntity(params);
	}
}

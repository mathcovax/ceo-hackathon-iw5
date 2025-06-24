import { EntityHandler, type GetValueObject, type GetEntityProperties, zod, createEnum } from "@vendors/clean";
import { PrestationSheet } from "./prestationSheet";
import { submissionDataObjecter } from "../common/submissionData";

export namespace Prestation {
	export const idObjecter = zod
		.string()
		.createValueObjecter("prestationId");

	export type Id = GetValueObject<typeof idObjecter>;

	export const statusEnum = createEnum([
		"created",
		"inProgress",
		"completed",
	]);

	export const statusObjecter = zod
		.enum(statusEnum.toTuple())
		.createValueObjecter("prestationStatus");

	export type Status = GetValueObject<typeof statusObjecter>;
}

export class PrestationEntity extends EntityHandler.create({
	id: Prestation.idObjecter,
	prestationSheetId: PrestationSheet.idObjecter,
	submissionData: submissionDataObjecter,
	status: Prestation.statusObjecter,
}) {
	public static create(params: GetEntityProperties<typeof PrestationEntity>) {
		return new PrestationEntity(params);
	}
}

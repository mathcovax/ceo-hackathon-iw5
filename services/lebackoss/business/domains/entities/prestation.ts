import { EntityHandler, type GetValueObject, type GetEntityProperties, zod, createEnum, EntityError } from "@vendors/clean";
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
	public static create(params: Omit<
		GetEntityProperties<typeof PrestationEntity>,
		"status"
	>) {
		return new PrestationEntity({
			...params,
			status: Prestation.statusObjecter.unsafeCreate("created"),
		});
	}

	public start() {
		if (this.status.value !== "created") {
			return new EntityError("prestation-already-started", { currentStatus: this.status });
		}

		return this.update({
			status: Prestation.statusObjecter.unsafeCreate("inProgress"),
		});
	}

	public complete() {
		if (this.status.value !== "inProgress") {
			return new EntityError("prestation-is-not-startend", { currentStatus: this.status });
		}

		return this.update({
			status: Prestation.statusObjecter.unsafeCreate("completed"),
		});
	}
}

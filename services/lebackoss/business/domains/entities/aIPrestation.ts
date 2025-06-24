import { EntityHandler, type GetValueObject, type GetEntityProperties, zod } from "@vendors/clean";
import { PrestationEntity } from "./prestation";

export namespace AIPrestation {
	export const tokenObjecter = zod
		.string()
		.createValueObjecter("prestationToken");

	export type Token = GetValueObject<typeof tokenObjecter>;
}

export class AIPrestationEntity extends EntityHandler.create(
	{
		token: AIPrestation.tokenObjecter,
	},
	PrestationEntity,
) {
	public static create(params: GetEntityProperties<typeof AIPrestationEntity>) {
		return new AIPrestationEntity(params);
	}
}

import { EntityHandler, type GetValueObject, type GetEntityProperties, zod } from "@vendors/clean";
import { PrestationSheet } from "./prestationSheet";

export namespace AIAgent {
	export const IdObjecter = zod
		.string()
		.createValueObjecter("aIAgentId");

	export type Id = GetValueObject<typeof IdObjecter>;

	export const pingUrlObjecter = zod
		.string()
		.url()
		.createValueObjecter("aIAgentPingUrl");

	export type PingUrl = GetValueObject<typeof pingUrlObjecter>;

	export const entryPointUrlObjecter = zod
		.string()
		.url()
		.createValueObjecter("aIAgentEntryPointUrl");

	export type EntryPointUrl = GetValueObject<typeof entryPointUrlObjecter>;

	export const tokenKeyObjecter = zod
		.string()
		.createValueObjecter("aIAgentTokenKey");

	export type TokenKey = GetValueObject<typeof tokenKeyObjecter>;
}

export class AIAgentEntity extends EntityHandler.create({
	id: AIAgent.IdObjecter,
	prestationSheetId: PrestationSheet.idObjecter,
	pingUrl: AIAgent.pingUrlObjecter,
	entryPointUrl: AIAgent.entryPointUrlObjecter,
	tokenKey: AIAgent.tokenKeyObjecter,
}) {
	public static create(params: GetEntityProperties<typeof AIAgentEntity>) {
		return new AIAgentEntity(params);
	}
}

import { EntityHandler, type GetValueObject, type GetEntityProperties, zod } from "@vendors/clean";
import { aIAgentRules } from "@vendors/entity-rules";
import { PrestationSheet } from "./prestationSheet";

export namespace AIAgent {
	export const IdObjecter = zod
		.string()
		.createValueObjecter("aIAgentId");

	export type Id = GetValueObject<typeof IdObjecter>;

	export const pingUrlObjecter = zod
		.string()
		.url()
		.min(aIAgentRules.pingUrl.min)
		.max(aIAgentRules.pingUrl.max)
		.createValueObjecter("aIAgentPingUrl");

	export type PingUrl = GetValueObject<typeof pingUrlObjecter>;

	export const entryPointUrlObjecter = zod
		.string()
		.url()
		.min(aIAgentRules.entryPointUrl.min)
		.max(aIAgentRules.entryPointUrl.max)
		.createValueObjecter("aIAgentEntryPointUrl");

	export type EntryPointUrl = GetValueObject<typeof entryPointUrlObjecter>;

	export const tokenKeyObjecter = zod
		.string()
		.min(aIAgentRules.tokenKey.min)
		.max(aIAgentRules.tokenKey.max)
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

	public partialUpdate(params: Partial<Pick<
		GetEntityProperties<typeof AIAgentEntity>,
		"pingUrl" | "entryPointUrl" | "tokenKey"
	>>) {
		return this.update(params);
	}
}
